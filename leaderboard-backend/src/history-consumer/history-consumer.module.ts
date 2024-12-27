import { Module } from '@nestjs/common';
import { HistoryConsumerService } from './history-consumer.service';
import { SqsModule } from '@ssut/nestjs-sqs';

@Module({
  imports: [
    SqsModule.register({
      consumers: [
        {
          name: 'workshop-test-queue',
          queueUrl: 'http://localhost:4566/000000000000/workshop-test-queue',
          region: 'eu-central-1',
        },
      ],
      producers: [],
    }),
  ],
  controllers: [],
  providers: [HistoryConsumerService],
})
export class HistoryConsumerModule {}
