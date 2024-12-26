import { Test, TestingModule } from '@nestjs/testing';
import { OpponentService } from './opponent.service';

describe('OpponentService', () => {
  let service: OpponentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpponentService],
    }).compile();

    service = module.get<OpponentService>(OpponentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
