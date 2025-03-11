import { Controller, Get } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { Investment } from './entities/investment.entity';

@Controller('investments')
export class InvestmentController {
  constructor(private readonly investmentService: InvestmentService) {}

  @Get()
  findAll(): Promise<Investment[]> {
    return this.investmentService.findAll();
  }
}