import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { GameService } from './game.service';
import { GameState } from './model/game.model';

class MoveDTO {
  row: number;
  column: number;
}

@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Get()
  async getActiveGame(): Promise<GameState> {
    return await this.gameService.getActiveGame(
            'playerId'
    );
  }

  @Post('move/user')
  async moveUser(
    @Body() moveDto: MoveDTO,
  ): Promise<GameState> {
    return await this.gameService.moveUser(
      'playerId',
      moveDto.row * 3 + moveDto.column,
    );
  }

  @Post('move/opponent')
  async moveOpponent(): Promise<GameState> {
    return await this.gameService.moveOpponent(
      'playerId',
    );
  }
}
