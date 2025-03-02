import {
  Component,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../auth/auth.config';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TictactoeBoardComponent } from '../tictactoe-board/tictactoe-board.component';


@Component({
  selector: 'app-play',
  imports: [
    RouterModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    TictactoeBoardComponent
  ],
  templateUrl: './play.component.html',
  styleUrl: './play.component.css'
})
export class PlayComponent implements OnInit {
  resetGame = 0;

  gameFinished = false;

  constructor(
    private oauthservice: OAuthService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    //TODO: Initialize Auth Token if already exists
  }

  userWon(): void {
    this.gameFinished = true;
    this.snackBar.open('You won!');
  }

  opponentWon(): void {
    this.gameFinished = true;
    this.snackBar.open('You lost!');
  }

  login() {
    //TODO: Perform Login Flow if not already logged in
  }

  logout() {
    //TODO: Logout user if logged in
  }

  isLoggedIn(): boolean {
    return this.oauthservice.hasValidAccessToken();
  }

  getAccessToken(): string {
    return `Bearer ${this.oauthservice.getAccessToken()}`;
  }

  reset(): void {
    this.resetGame = this.resetGame + 1;
  }
}
