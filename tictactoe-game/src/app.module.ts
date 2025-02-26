import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    GameModule,
        //TODO: Load the SQS module and connect to the queue
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
