import { BadRequestException, Injectable } from '@nestjs/common';
import { Game } from '@prisma/client';
import prisma from '../../db';
import {
  CellValue,
  GameState,
  PlayerSign,
  winningCombos,
} from '../model/game.model';
import { WrongPlayerException } from '../../wrong-player/wrong-player.exception';

@Injectable()
export class GameUtilService {
  isGameOver(board: CellValue[]): boolean {
    return !!this.getWinningSign(board) || this.isDraw(board);
  }

  getWinningSign(board: CellValue[]): CellValue {
    for (const [a, b, c] of winningCombos) {
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return board[a];
      }
    }
    return '';
  }

  placeTurn(gameState: GameState, index: number, playerSign: PlayerSign): void {
    if (index < 0 || index > 8) {
      throw new BadRequestException('Index out of range');
    }
    if (gameState.finished) {
      throw new BadRequestException('Game is finished');
    }
    if (gameState.board[index] !== '') {
      throw new BadRequestException('Cell is already occupied');
    }
    if (!this.isPlayerAllowedToMove(playerSign, gameState.turn)) {
      throw new WrongPlayerException(`It's not ${playerSign}'s turn`);
    }
    gameState.board[index] = playerSign;
    gameState.turn++;

    if (this.isGameOver(gameState.board)) {
      const winningSign: CellValue = this.getWinningSign(gameState.board);

      gameState.finished = true;
      gameState.winner = winningSign || null;
    }
  }

  async deleteActiveGameState(playerId: string): Promise<void> {
    await prisma.game.deleteMany({
      where: {
        AND: {
          playerId: playerId,
          finished: false,
        },
      },
    });
  }

  async loadActiveGameState(playerId: string): Promise<GameState> {
    const dbGameState: Game = await prisma.game.findFirst({
      where: {
        AND: {
          playerId: playerId,
          finished: false,
        },
      },
    });

    return this.toGameState(dbGameState);
  }

  async updateGameState(
    gameState: GameState,
    playerId: string,
  ): Promise<GameState> {
    const dbGameState = await prisma.game.update({
      where: {
        id: gameState.id,
      },
      data: {
        playerId: playerId,
        board: gameState.board,
        turn: gameState.turn,
        finished: gameState.finished,
        winner: gameState.winner,
      },
    });

    return this.toGameState(dbGameState);
  }

  async storeNewGameState(playerId: string): Promise<GameState> {
    const dbGameState = await prisma.game.create({
      data: {
        playerId: playerId,
        board: Array(9).fill(''),
        turn: 0,
        finished: false,
        winner: undefined,
      },
    });

    return this.toGameState(dbGameState);
  }

  private toGameState(game: Game): GameState | null {
    return !!game
      ? new GameState(
          game.id,
          game.playerId,
          game.board as CellValue[],
          game.turn,
          game.finished,
          game.winner,
        )
      : null;
  }

  private isDraw(board: CellValue[]): boolean {
    return board.every((cell) => cell);
  }

  private isPlayerAllowedToMove(playerSign: PlayerSign, turn: number) {
    return (
      (playerSign === 'X' && turn % 2 === 0) ||
      (playerSign === 'O' && turn % 2 === 1)
    );
  }
}
