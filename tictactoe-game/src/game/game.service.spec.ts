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

  it('should delete active game', async () => {
    const deleteSpy = jest
      .spyOn(gameUtilService, 'deleteActiveGameState')
      .mockImplementation(jest.fn());

    await service.deleteActiveGame('playerId');

    expect(deleteSpy).toHaveBeenCalledWith('playerId');
  });

  it('should move user - new game', async () => {
    jest
      .spyOn(gameUtilService, 'loadActiveGameState')
      .mockResolvedValue(undefined);
    const updateSpy = jest
      .spyOn(gameUtilService, 'updateGameState')
      .mockImplementation(jest.fn());
    jest.spyOn(gameUtilService, 'storeNewGameState').mockResolvedValue({
      id: '1',
      turn: 0,
      board: ['', '', '', '', '', '', '', '', ''],
      winner: null,
      finished: false,
      playerId: 'playerId',
    });

    await service.moveUser('playerId', 3);

    const gameStateAfterMove: GameState = {
      id: '1',
      turn: 1,
      board: ['', '', '', 'X', '', '', '', '', ''],
      winner: null,
      finished: false,
      playerId: 'playerId',
    };

    expect(updateSpy).toHaveBeenCalledWith(gameStateAfterMove, 'playerId');
  });

  it('should move user - existing game', async () => {
    const gameState: GameState = {
      id: '1',
      turn: 2,
      board: ['X', 'O', '', '', '', '', '', '', ''],
      winner: null,
      finished: false,
      playerId: 'playerId',
    };
    jest
      .spyOn(gameUtilService, 'loadActiveGameState')
      .mockResolvedValue(gameState);
    const updateSpy = jest
      .spyOn(gameUtilService, 'updateGameState')
      .mockImplementation(jest.fn());

    await service.moveUser('playerId', 3);

    const gameStateAfterMove: GameState = {
      id: '1',
      turn: 3,
      board: ['X', 'O', '', 'X', '', '', '', '', ''],
      winner: null,
      finished: false,
      playerId: 'playerId',
    };

    expect(updateSpy).toHaveBeenCalledWith(gameStateAfterMove, 'playerId');
  });

  it('should move opponent', async () => {
    const gameState: GameState = {
      id: '1',
      turn: 3,
      board: ['X', 'O', '', 'X', '', '', '', '', ''],
      winner: null,
      finished: false,
      playerId: 'playerId',
    };
    jest
      .spyOn(gameUtilService, 'loadActiveGameState')
      .mockResolvedValue(gameState);
    const updateSpy = jest
      .spyOn(gameUtilService, 'updateGameState')
      .mockImplementation(jest.fn());

    await service.moveOpponent('playerId');

    const gameStateAfterMove: GameState = {
      id: '1',
      turn: 4,
      board: ['X', 'O', '', 'X', 'O', '', '', '', ''],
      winner: null,
      finished: false,
      playerId: 'playerId',
    };

    expect(updateSpy).toHaveBeenCalledWith(gameStateAfterMove, 'playerId');
  });
});
