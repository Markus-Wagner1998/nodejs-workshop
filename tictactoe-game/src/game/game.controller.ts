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
import { CurrentUser, JwtAuthGuard } from '@5stones/nest-oidc';

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
  constructor(private gameService: GameService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getActiveGame(@CurrentUser() user: any): Promise<GameState> {
    return await this.gameService.getActiveGame(
      user['given_name'] || user['email'],
    );
  }

  @Post('move/user')
  @UseGuards(JwtAuthGuard)
  @UseFilters(WrongPlayerFilter)
  async moveUser(
    @CurrentUser() user: any,
    @Body() moveDto: MoveDTO,
  ): Promise<GameState> {
    return await this.gameService.moveUser(
      user['given_name'] || user['email'],
      moveDto.row * 3 + moveDto.column,
    );
  }

  @Post('move/opponent')
  @UseGuards(JwtAuthGuard)
  @UseFilters(WrongPlayerFilter)
  async moveOpponent(@CurrentUser() user: any): Promise<GameState> {
    return await this.gameService.moveOpponent(
      user['given_name'] || user['email'],
    );
  }
}
