import { Routes } from '@angular/router';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { TictactoeBoardComponent } from './tictactoe-board/tictactoe-board.component';

export const routes: Routes = [
  { path: '', component: LeaderboardComponent },
  { path: 'tictactoe', component: TictactoeBoardComponent },
];
