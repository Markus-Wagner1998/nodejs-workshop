import { Injectable, NotFoundException } from '@nestjs/common';
import { GameUtilService } from 'src/game/game-util/game-util.service';
import { OpponentService } from 'src/game/opponent/opponent.service';
import { GameState } from './model/game.model';
import { SqsService } from '@ssut/nestjs-sqs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GameService {
  constructor(
    private gameUtilService: GameUtilService,
    private opponentService: OpponentService,
    private readonly sqsService: SqsService,
  ) {}

  async getActiveGame(playerId: string): Promise<GameState> {
    const gameState = await this.gameUtilService.loadActiveGameState(playerId);
    if (!gameState) {
      throw new NotFoundException('No active game found');
    }
    return gameState;
  }

  async moveUser(playerId: string, index: number): Promise<GameState> {
    let gameState = await this.gameUtilService.loadActiveGameState(playerId);
    if (!gameState) {
      gameState = await this.gameUtilService.storeNewGameState(playerId);
    }
    this.gameUtilService.placeTurn(gameState, index, 'X');

    if (gameState.finished) {
      this.notifyAboutEndingGame(playerId, gameState.winner, gameState.board);
    }

    return await this.gameUtilService.updateGameState(gameState, playerId);
  }

  async moveOpponent(playerId: string): Promise<GameState> {
    let gameState = await this.gameUtilService.loadActiveGameState(playerId);
    if (!gameState) {
      gameState = await this.gameUtilService.storeNewGameState(playerId);
    }

    const bestIndex: number = this.opponentService.getBestMoveIndex(
      gameState.board,
    );

    this.gameUtilService.placeTurn(gameState, bestIndex, 'O');

    if (gameState.finished) {
      this.notifyAboutEndingGame(playerId, gameState.winner, gameState.board);
    }

    return await this.gameUtilService.updateGameState(gameState, playerId);
  }

  async notifyAboutEndingGame(
    playerId: string,
    winningSign: string | null,
    board: string[],
  ): Promise<void> {
        //TODO: Implement sending a message to the SQS queue
  }
}
