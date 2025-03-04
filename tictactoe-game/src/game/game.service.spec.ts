import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { GameUtilService } from './game-util/game-util.service';
import { OpponentService } from './opponent/opponent.service';
import { GameState } from './model/game.model';
import { SqsModule } from '@ssut/nestjs-sqs';
import { GameModule } from './game.module';
import { NotFoundException } from '@nestjs/common';

describe('GameService', () => {
  let service: GameService;
  let gameUtilService: GameUtilService;
  let opponentService: OpponentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        GameModule,
        SqsModule.register({
          consumers: [],
          producers: [],
        }),
      ],
      providers: [GameService, GameUtilService, OpponentService],
    }).compile();

    service = module.get<GameService>(GameService);
    gameUtilService = module.get<GameUtilService>(GameUtilService);
    opponentService = module.get<OpponentService>(OpponentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get active game', async () => {
    const gameState: GameState = {
      id: '1',
      turn: 3,
      board: ['X', 'O', 'X', '', '', '', '', '', ''],
      winner: null,
      finished: false,
      playerId: 'playerId',
    };
    jest
      .spyOn(gameUtilService, 'loadActiveGameState')
      .mockResolvedValue(gameState);

    expect(await service.getActiveGame('playerId')).toEqual(gameState);
  });

  it('should throw exception if no active game exists', async () => {
    jest
      .spyOn(gameUtilService, 'loadActiveGameState')
      .mockResolvedValue(undefined);

    expect(service.getActiveGame('playerId')).rejects.toThrow(
      NotFoundException,
    );
  });

    // TODO: Add Unit Tests here
});
