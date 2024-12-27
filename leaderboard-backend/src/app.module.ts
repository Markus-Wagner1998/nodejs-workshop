import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SqsModule } from '@ssut/nestjs-sqs';
import { HistoryConsumerService } from './history-consumer/history-consumer.service';

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
  controllers: [AppController],
  providers: [AppService, HistoryConsumerService],
})
export class AppModule {}
