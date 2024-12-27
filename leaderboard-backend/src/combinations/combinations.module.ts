import { Module } from '@nestjs/common';
import { CombinationsController } from './combinations.controller';
import { CombinationsService } from './combinations.service';

@Module({
  imports: [],
  controllers: [CombinationsController],
  providers: [CombinationsService],
})
export class CombinationsModule {}
