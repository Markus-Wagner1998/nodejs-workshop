import { Controller, Get } from '@nestjs/common';
import { CombinationsService } from './combinations.service';
import { CombinationsScore } from './model/combinations.model';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('combinations')
export class CombinationsController {
  constructor(private combinationsService: CombinationsService) {}

  @Get('')
  @ApiOkResponse({
    description: "Combinations used to win the game and their score",
    type: CombinationsScore,
    isArray: true
  })
  public async getTopCombinations(): Promise<CombinationsScore[]> {
    return await this.combinationsService.getTopCombinations();
  }
}
