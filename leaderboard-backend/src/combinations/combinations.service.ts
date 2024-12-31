import { Injectable } from '@nestjs/common';
import prisma from 'src/db';
import { CombinationsScore } from './model/combinations.model';

@Injectable()
export class CombinationsService {
  public async getTopCombinations(): Promise<CombinationsScore[]> {
    return await prisma.$transaction(async () => {
      const boardsWithMostGames = await prisma.game.groupBy({
        by: ['boardId'],
        _count: {
          boardId: true,
        },
        orderBy: {
          _count: {
            boardId: 'desc',
          },
        },
      });
      return (
        await Promise.all(
          boardsWithMostGames.map(async (group) => {
            const board = await prisma.board.findUnique({
              where: { id: group.boardId },
            });
            return {
              ...board,
              gameCount: group._count.boardId,
            };
          }),
        )
      ).map((x) => new CombinationsScore(x.state, x.gameCount));
    });
  }
}
