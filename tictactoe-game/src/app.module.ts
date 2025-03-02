import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';
import { SqsModule } from '@ssut/nestjs-sqs';

@Module({
  imports: [
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
  controllers: [],
  providers: [],
})
export class AppModule {}
