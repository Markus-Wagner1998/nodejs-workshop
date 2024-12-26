import { Test, TestingModule } from '@nestjs/testing';
import { GameUtilService } from './game-util.service';

describe('GameUtilService', () => {
  let service: GameUtilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameUtilService],
    }).compile();

    service = module.get<GameUtilService>(GameUtilService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
