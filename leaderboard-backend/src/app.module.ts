import { Module } from '@nestjs/common';
import { CombinationsModule } from './combinations/combinations.module';
import { HistoryConsumerModule } from './history-consumer/history-consumer.module';

@Module({
  imports: [CombinationsModule, HistoryConsumerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
