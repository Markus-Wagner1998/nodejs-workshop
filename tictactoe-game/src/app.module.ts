import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { OpponentService } from './game/opponent/opponent.service';
import { GameUtilService } from './game/game-util/game-util.service';
import { SqsModule } from '@ssut/nestjs-sqs';
import { AuthModule } from '@5stones/nest-oidc';

@Module({
  imports: [
    AuthModule.forRoot({
      oidcAuthority: 'http://localhost:8999/realms/workshop',
    }),
    GameModule,
    SqsModule.register({
      consumers: [],
      producers: [
        {
          name: 'workshop-test-queue',
          queueUrl: 'http://localhost:4566/000000000000/workshop-test-queue',
          region: 'eu-central-1',
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, OpponentService, GameUtilService],
})
export class AppModule {}
