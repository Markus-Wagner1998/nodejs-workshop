import { Injectable, NotFoundException } from '@nestjs/common';
import { GameUtilService } from 'src/game/game-util/game-util.service';
import { GameState } from './model/game.model';

@Injectable()
export class GameService {
    constructor(
        private gameUtilService: GameUtilService
    ) { }

    async getActiveGame(playerId: string): Promise<GameState> {
        const gameState = await this.gameUtilService.loadActiveGameState(playerId);
        if (!gameState) {
            throw new NotFoundException('No active game found');
        }
        return gameState;
    }

    async moveUser(playerId: string, index: number): Promise<GameState> {
        //TODO: Implement move user functionality
        //Load active game state
        //If no game state exists store an initial one
        //Perform the move
        //Update the game state in the database
        return null;
    }

    async moveOpponent(playerId: string): Promise<GameState> {
        //TODO: Implement move opponent functionality
        //Load active game state
        //If no game state exists store an initial one
        //Calculate the best move for the opponent
        //Perform the move
        //Update the game state in the database
        return null;
    }
}
