import { Component, OnInit } from '@angular/core';
import { TictactoeBoardComponent } from '../tictactoe-board/tictactoe-board.component';
import { CombinationsService } from '../../../generated/openapi-client/leaderboard';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-leaderboard',
  imports: [
    MatCardModule,
    MatButtonModule,
    TictactoeBoardComponent
  ],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css',
})
export class LeaderboardComponent implements OnInit {
  currentBoard: string[] = Array(9).fill('X');
  winningBoards: Map<string[], number> = new Map();

  constructor(private combinationsService: CombinationsService) { }

  ngOnInit(): void {
    this.combinationsService.combinationsControllerGetTopCombinations()
      .subscribe(res => {
        res.forEach(resEl => {
          this.winningBoards.set(resEl.board, resEl.score);
        })
      });
  }

}
