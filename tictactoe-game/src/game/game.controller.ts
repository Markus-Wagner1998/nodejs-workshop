import { IsInt, Max, Min } from '@nestjs/class-validator';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { GameService } from './game.service';
import { GameState } from './model/game.model';
import { WrongPlayerFilter } from '../wrong-player/wrong-player.filter';
import { CurrentUser, JwtAuthGuard } from '@5stones/nest-oidc';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiHeader,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiProperty,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

class MoveDTO {
  @IsInt()
  @Min(0)
  @Max(2)
  @ApiProperty({
    description: 'Row to put the Move',
    type: 'number',
    required: true,
    minimum: 0,
    maximum: 2,
  })
  row: number;

  @IsInt()
  @Min(0)
  @Max(2)
  @ApiProperty({
    description: 'Column to put the Move',
    type: 'number',
    required: true,
    minimum: 0,
    maximum: 2,
  })
  column: number;
}

@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token for Authorization',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'The board state of the current Game',
    type: GameState,
  })
  @ApiUnauthorizedResponse({ description: 'No valid JWT Token provided' })
  async getActiveGame(@CurrentUser() user: any): Promise<GameState> {
    return await this.gameService.getActiveGame(
      user['given_name'] || user['email'],
    );
  }

  @Delete()
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token for Authorization',
  })
  @ApiBearerAuth()
  @ApiNoContentResponse()
  @ApiUnauthorizedResponse({ description: 'No valid JWT Token provided' })
  async deleteActiveGame(@CurrentUser() user: any): Promise<void> {
    await this.gameService.deleteActiveGame(
      user['given_name'] || user['email'],
    );
  }

  @Post('move/user')
  @UseGuards(JwtAuthGuard)
  @UseFilters(WrongPlayerFilter)
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token for Authorization',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'The board state after the move',
    type: GameState,
  })
  @ApiBadRequestResponse({ description: 'Invalid Field was selected' })
  @ApiUnauthorizedResponse({ description: 'No valid JWT Token provided' })
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
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token for Authorization',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'The board state after the move',
    type: GameState,
  })
  @ApiBadRequestResponse({ description: 'Invalid Field was selected' })
  @ApiUnauthorizedResponse({ description: 'No valid JWT Token provided' })
  async moveOpponent(@CurrentUser() user: any): Promise<GameState> {
    return await this.gameService.moveOpponent(
      user['given_name'] || user['email'],
    );
  }
}
