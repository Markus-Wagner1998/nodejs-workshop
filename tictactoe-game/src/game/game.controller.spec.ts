import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GameModule } from './game.module';
import { SqsModule } from '@ssut/nestjs-sqs';
import { GameUtilService } from './game-util/game-util.service';
import { OpponentService } from './opponent/opponent.service';

describe('GameController', () => {
  let controller: GameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        GameModule,
        SqsModule.register({
          consumers: [],
          producers: [],
        }),
      ],
      controllers: [GameController],
      providers: [GameService, GameUtilService, OpponentService],
    }).compile();

    controller = module.get<GameController>(GameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
