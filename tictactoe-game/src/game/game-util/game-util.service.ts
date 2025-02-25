import { BadRequestException, Injectable } from '@nestjs/common';
import { Game } from '@prisma/client';
import prisma from 'src/db';
import {
    CellValue,
    GameState,
    PlayerSign,
    winningCombos,
} from 'src/game/model/game.model';
import { WrongPlayerException } from 'src/wrong-player/wrong-player.exception';

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

    async loadActiveGameState(playerId: string): Promise<GameState> {
        //TODO: Implmement loading of active game state
        return null;
    }

    async updateGameState(
        gameState: GameState,
        playerId: string,
    ): Promise<GameState> {
        //TODO: Implement Update of GameState for Player
        return null;
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
