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
  //TODO: Add missing inputs for accessToken and to reset the Game

  userWon: OutputEmitterRef<void> = output();
  //TODO: Add output if the opponent wins

  board: WritableSignal<string[]> = signal(this.boardInput());
  editable = signal(this.editableInput());


  constructor(
    private gameService: GameService,
  ) {
    //TODO: React to a resetGame Input
  }

  ngOnInit(): void {
    //TODO: Fetch Access Token and Try to load game from the server
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

    //TODO: Implement calling the backend to perform a Move
    //User move is performed and after 1,5s the opponent move should be triggered
    //Emit Events if a user has won
  }

  reset() {
    this.board.update(() => Array(9).fill(''));
  }

  isLoggedIn(): boolean {
    // const accessToken = this.accessTokenInput().trim();
    // return accessToken !== '' && accessToken !== 'Bearer';
    return false;
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
          // this.opponentWon.emit();
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
