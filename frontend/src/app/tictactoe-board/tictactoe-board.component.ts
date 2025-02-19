import {
  Component,
  effect,
  input,
  InputSignal,
  OnInit,
  output,
  OutputEmitterRef,
  signal,
  WritableSignal,
} from '@angular/core';
import { GameService } from '../../../generated/openapi-client/tictactoe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tictactoe-board',
  imports: [
    CommonModule,
  ],
  templateUrl: './tictactoe-board.component.html',
  styleUrl: './tictactoe-board.component.css',
})
export class TictactoeBoardComponent implements OnInit {
  boardInput: InputSignal<string[]> = input(Array(9).fill(''));
  editableInput: InputSignal<boolean> = input(true);
  accessTokenInput: InputSignal<string> = input('');
  resetGameInput: InputSignal<number> = input(0);

  userWon: OutputEmitterRef<void> = output();
  opponentWon: OutputEmitterRef<void> = output();

  board: WritableSignal<string[]> = signal(this.boardInput());
  editable = signal(this.editableInput());


  constructor(
    private gameService: GameService,
  ) {
    effect(() => {
      if (this.resetGameInput()) {
        this.reset()
      }
    })
  }

  ngOnInit(): void {
    this.board = signal(this.boardInput());
    this.editable = signal(this.editableInput());

    const accessToken = this.accessTokenInput();
    if (accessToken) {
      this.getGameStateFromServer(accessToken);
    }
  }

  getClickableClass(): string[] {
    if (this.editable()) {
      return ['clickable-cell'];
    }
    return [];
  }

  clickCell(cellIndex: number): void {
    if (!this.editable() || !this.isUsersTurn()) {
      return;
    }
    const observableGameState = this.gameService.gameControllerMoveUser(
      {
        row: Math.floor(cellIndex / 3),
        column: cellIndex % 3,
      },
      this.accessTokenInput(),
    );

    observableGameState.subscribe((res) => {
      this.board.update(() => res.board);
      if (res.finished) {
        this.userWon.emit();
        return;
      }
      new Promise((r) => setTimeout(r, 1500)).then(() => {
        this.getGameStateFromServer(this.accessTokenInput());
      });
    });
  }

  reset() {
    this.board.update(() => Array(9).fill(''));
  }

  isLoggedIn(): boolean {
    const accessToken = this.accessTokenInput().trim();
    return accessToken !== '' && accessToken !== 'Bearer';
  }

  private getGameStateFromServer(accessToken: string): void {
    const observableGameState =
      this.gameService.gameControllerGetActiveGame(accessToken);

    observableGameState.subscribe((state) => {
      this.board.update(() => state.board);
      if (!this.isUsersTurn()) {
        this.moveOpponent(accessToken);
      }
    });
  }

  private moveOpponent(accessToken: string): void {
    this.gameService
      .gameControllerMoveOpponent(accessToken)
      .subscribe((res) => {
        this.board.update(() => res.board);
        if (res.finished) {
          this.opponentWon.emit();
        }
      });
  }

  private isUsersTurn(): boolean {
    return (
      this.board().filter((cell) => cell === 'X').length ===
      this.board().filter((cell) => cell === 'O').length
    );
  }
}
