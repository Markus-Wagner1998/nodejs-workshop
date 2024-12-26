import { IsInt, Max, Min } from '@nestjs/class-validator';
import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { GameService } from './game.service';
import { GameState } from './model/game.model';
import { WrongPlayerFilter } from 'src/wrong-player/wrong-player.filter';
import { JwtAuthGuard } from '@5stones/nest-oidc';

class MoveDTO {
  @IsInt()
  @Min(0)
  @Max(3)
  row: number;

  @IsInt()
  @Min(0)
  @Max(3)
  column: number;
}

@Controller('game')
export class GameController {
  playerId = '0';
  constructor(private gameService: GameService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getActiveGame(): Promise<GameState> {
    return await this.gameService.getActiveGame(this.playerId);
  }

  @Post('move/user')
  @UseGuards(JwtAuthGuard)
  @UseFilters(WrongPlayerFilter)
  async moveUser(@Body() moveDto: MoveDTO): Promise<GameState> {
    return await this.gameService.moveUser(
      this.playerId,
      moveDto.row * 3 + moveDto.column,
    );
  }

  @Post('move/opponent')
  @UseGuards(JwtAuthGuard)
  @UseFilters(WrongPlayerFilter)
  async moveOpponent(): Promise<GameState> {
    return await this.gameService.moveOpponent(this.playerId);
  }
}
