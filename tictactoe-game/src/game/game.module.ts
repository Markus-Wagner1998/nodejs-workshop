import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GameUtilService } from 'src/game/game-util/game-util.service';
import { OpponentService } from 'src/game/opponent/opponent.service';

@Module({
  controllers: [GameController],
  providers: [
    GameService,
    GameUtilService,
    OpponentService
  ],
  exports: [],
})
export class GameModule {}
