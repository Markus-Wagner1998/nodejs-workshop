import {
    Controller,
    Get,
} from '@nestjs/common';
import { GameService } from './game.service';
import { GameState } from './model/game.model';

class MoveDTO {
    row: number;
    column: number;
}

@Controller('game')
export class GameController {
    constructor(private gameService: GameService) { }

    @Get()
    async getActiveGame(): Promise<GameState> {
        return await this.gameService.getActiveGame('playerId');
    }

    //TODO: Implement move user endpoint

    //TODO: Implement move opponent endpoint
}
