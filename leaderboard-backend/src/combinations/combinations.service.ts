import { Injectable } from '@nestjs/common';
import prisma from 'src/db';
import { CombinationsScore } from './model/combinations.model';

@Injectable()
export class CombinationsService {
  public async getTopCombinations(): Promise<CombinationsScore[]> {
        //TODO: Find the combinations with the most wins in the DB.
        //This should be an atomic operation, so either use a JOIN operation or perform multiple operations in a transaction.
        return null;
  }
}
