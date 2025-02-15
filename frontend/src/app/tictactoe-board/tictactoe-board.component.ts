import {
  Component,
  input,
  InputSignal,
  OnInit,
  signal,
} from '@angular/core';
import { GameService } from '../../../generated/openapi-client';
import { RouterModule } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../auth/auth.config';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tictactoe-board',
  imports: [
    RouterModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule
  ],
  templateUrl: './tictactoe-board.component.html',
  styleUrl: './tictactoe-board.component.css',
})
export class TictactoeBoardComponent implements OnInit {
  boardInput: InputSignal<string[]> = input(Array(9).fill(''));
  editableInput: InputSignal<boolean> = input(true);

  board = signal(this.boardInput());
  editable = signal(this.editableInput());

  gameFinished = false;

  constructor(
    private gameService: GameService,
    private oauthservice: OAuthService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.oauthservice.configure(authConfig);
    const url = `${authConfig.issuer}/.well-known/openid-configuration`;
    this.oauthservice.loadDiscoveryDocument(url).then(() => {
      this.oauthservice.tryLogin({});
      const jwtToken = this.oauthservice.getAccessToken();
      if (jwtToken) {
        this.getGameStateFromServer(this.getAccessToken());
      }
    });
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
        this.snackBar.open('You won!');
        this.gameFinished = true;
        return;
      }
      new Promise((r) => setTimeout(r, 1500)).then(() => {
        this.getGameStateFromServer(accessToken);
      });
    });
  }

  reset() {
    this.board.update(() => Array(9).fill(''));
    this.gameFinished = false;
  }

  login() {
    if (!this.isLoggedIn()) {
      this.oauthservice.configure(authConfig);
      this.oauthservice.loadDiscoveryDocumentAndTryLogin();
      this.oauthservice.initCodeFlow();
    }
  }

  logout() {
    if (this.isLoggedIn()) {
      this.oauthservice.logOut(true);
      this.reset();
    }
  }

  isLoggedIn(): boolean {
    return this.oauthservice.hasValidAccessToken();
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
          this.snackBar.open('You lost!');
          this.gameFinished = true;
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
