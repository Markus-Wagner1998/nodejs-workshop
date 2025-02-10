import { Routes } from '@angular/router';
import { TictactoeBoardComponent } from './tictactoe-board/tictactoe-board.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

export const routes: Routes = [
  { path: '', component: LeaderboardComponent },
  { path: 'tictactoe', component: TictactoeBoardComponent, canActivate: [] }
];
