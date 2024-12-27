import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GameUtilService } from 'src/game/game-util/game-util.service';
import { OpponentService } from 'src/game/opponent/opponent.service';
import { SQS } from '@aws-sdk/client-sqs';

@Module({
  controllers: [GameController],
  providers: [
    GameService,
    GameUtilService,
    OpponentService,
    {
      provide: SQS,
      useFactory: () => {
        const endpoint = 'http://localhost:4566';
        const region = 'eu-central-1';
        const accessKeyId = 'ACCESS_KEY';
        const secretAccessKey = 'SECRET_ACCESS_KEY';
        const sqsConfig = {
          endpoint,
          region,
          accessKeyId,
          secretAccessKey,
        };
        return new SQS(sqsConfig);
      },
    },
  ],
  exports: [SQS],
})
export class GameModule {}
