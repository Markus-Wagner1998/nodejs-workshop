import { Test, TestingModule } from '@nestjs/testing';
import { HistoryConsumerService } from './history-consumer.service';

describe('HistoryConsumerService', () => {
  let service: HistoryConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoryConsumerService],
    }).compile();

    service = module.get<HistoryConsumerService>(HistoryConsumerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
