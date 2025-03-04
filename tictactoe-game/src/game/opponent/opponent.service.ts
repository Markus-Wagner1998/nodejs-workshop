import { Injectable } from '@nestjs/common';
import { GameUtilService } from '../game-util/game-util.service';
import { CellValue } from '..//model/game.model';

@Injectable()
export class OpponentService {
  constructor(private gameUtilService: GameUtilService) {}

  getBestMoveIndex(board: CellValue[]): number {
    let bestMove = -1,
      bestScore = -Infinity;
    board.forEach((cell, i) => {
      if (cell) return;
      board[i] = 'O';
      const score = this.minimax(board, false);
      board[i] = ''; // Undo move
      if (score > bestScore) [bestMove, bestScore] = [i, score];
    });
    return bestMove;
  }

  private minimax(board: CellValue[], isMax: boolean): number {
    const winner = this.gameUtilService.getWinningSign(board);
    if (winner) return winner === 'O' ? 10 : winner === 'X' ? -10 : 0;

    return board.reduce(
      (best, cell, i) => {
        if (cell) return best;
        board[i] = isMax ? 'X' : 'O';
        const score = this.minimax(board, !isMax);
        board[i] = ''; // Undo move
        return isMax ? Math.max(best, score) : Math.min(best, score);
      },
      isMax ? -Infinity : Infinity,
    );
  }

}
