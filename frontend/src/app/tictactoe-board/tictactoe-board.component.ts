import { Component, computed, input, InputSignal, OnInit } from '@angular/core';
import { GameService } from '../../../generated/openapi-client';
import { Router, RouterModule } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../auth/auth.config';

@Component({
  selector: 'app-tictactoe-board',
  imports: [RouterModule],
  templateUrl: './tictactoe-board.component.html',
  styleUrl: './tictactoe-board.component.css',
})
export class TictactoeBoardComponent implements OnInit {
  boardInput: InputSignal<string[]> = input(Array(9).fill(''));
  board = computed(() => this.boardInput());

  constructor(
    private gameService: GameService,
    private router: Router,
    private oauthservice: OAuthService
  ) { }

  ngOnInit(): void {
    console.log(this.oauthservice.getAccessToken())
  }

  clickCell(cellIndex: number): void {
    console.log('before sending');
    const observableGameState = this.gameService.gameControllerMoveUser({
      row: cellIndex / 3,
      column: cellIndex % 3,
    });
    observableGameState.subscribe((res) => console.log(res));
    console.log('after sending');
    console.log('clicked ' + cellIndex);
  }

  login() {
    console.log("here")
    this.oauthservice.configure(authConfig);
    this.oauthservice.loadDiscoveryDocumentAndTryLogin();
    this.oauthservice.initCodeFlow();

    console.log("here")
  }

  logout() {
    this.oauthservice.logOut(true);
  }
}

