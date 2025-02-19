import { Routes } from '@angular/router';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { PlayComponent } from './play/play.component';

export const routes: Routes = [
  { path: '', component: LeaderboardComponent },
  { path: 'tictactoe', component: PlayComponent },
];
