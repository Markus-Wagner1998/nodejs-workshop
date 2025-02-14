import {
  Component,
  input,
  InputSignal,
  OnInit,
  output,
  OutputEmitterRef,
  signal,
} from '@angular/core';
import { GameService } from '../../../generated/openapi-client';
import { RouterModule } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../auth/auth.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tictactoe-board',
  imports: [RouterModule, CommonModule],
  templateUrl: './tictactoe-board.component.html',
  styleUrl: './tictactoe-board.component.css',
})
export class TictactoeBoardComponent implements OnInit {
  boardInput: InputSignal<string[]> = input(Array(9).fill(''));
  editableInput: InputSignal<boolean> = input(true);

  onUserWin: OutputEmitterRef<void> = output();
  onOpponentWin: OutputEmitterRef<void> = output();

  board = signal(this.boardInput());
  editable = signal(this.editableInput());

  gameFinished = false;

  constructor(
    private gameService: GameService,
    private oauthservice: OAuthService,
  ) {}

  ngOnInit(): void {
    const jwtToken = this.oauthservice.getAccessToken();
    if (jwtToken) {
      this.getGameStateFromServer(this.getAccessToken());
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
    const accessToken = this.getAccessToken();
    const observableGameState = this.gameService.gameControllerMoveUser(
      {
        row: Math.floor(cellIndex / 3),
        column: cellIndex % 3,
      },
      accessToken,
    );

    observableGameState.subscribe((res) => {
      this.board.update(() => res.board);
      if (res.finished) {
        this.onUserWin.emit();
        this.gameFinished = true;
        return;
      }
      new Promise((r) => setTimeout(r, 1500)).then(() => {
        this.getGameStateFromServer(accessToken);
      });
    });
  }

  restart() {
    this.board.update(() => Array(9).fill(''));
    this.gameFinished = false;
  }

  login() {
    this.oauthservice.configure(authConfig);
    this.oauthservice.loadDiscoveryDocumentAndTryLogin();
    this.oauthservice.initCodeFlow();
  }

  logout() {
    this.oauthservice.logOut(true);
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
          this.onUserWin.emit();
        }
      });
  }

  private isUsersTurn(): boolean {
    return (
      this.board().filter((cell) => cell === 'X').length ===
      this.board().filter((cell) => cell === 'O').length
    );
  }

  private getAccessToken(): string {
    return `Bearer ${this.oauthservice.getAccessToken()}`;
  }
}
