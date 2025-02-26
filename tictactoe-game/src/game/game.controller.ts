import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
} from '@nestjs/common';
import { GameService } from './game.service';
import { GameState } from './model/game.model';
import { WrongPlayerFilter } from 'src/wrong-player/wrong-player.filter';

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
  @UseFilters(WrongPlayerFilter)
  async moveUser(
    @Body() moveDto: MoveDTO,
  ): Promise<GameState> {
    return await this.gameService.moveUser(
            'playerId',
      moveDto.row * 3 + moveDto.column,
    );
  }

  @Post('move/opponent')
  @UseFilters(WrongPlayerFilter)
  async moveOpponent(): Promise<GameState> {
    return await this.gameService.moveOpponent(
            'playerId',
    );
  }
}
