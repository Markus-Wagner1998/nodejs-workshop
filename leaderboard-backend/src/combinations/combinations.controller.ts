import { Controller, Get } from '@nestjs/common';
import { CombinationsService } from './combinations.service';
import { CombinationsScore } from './model/combinations.model';

@Controller('combinations')
export class CombinationsController {
  constructor(private combinationsService: CombinationsService) {}

  @Get('')
  public async getTopCombinations(): Promise<CombinationsScore[]> {
    return await this.combinationsService.getTopCombinations();
  }
}
