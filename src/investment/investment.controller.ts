import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { Investment } from './entities/investment.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/user/enums/role.enum';
import { User } from 'src/user/entities/user.entity';

@Controller('investments')
export class InvestmentController {
  constructor(private readonly investmentService: InvestmentService) {}

  @Get()
  findAll(): Promise<Investment[]> {
    return this.investmentService.findAll();
  }

  /**
   * Endpoint for investors to invest in a project.
   * Expects: { "projectId": "...", "amount": 1000 }
   */
  @Post()
  @Roles(Role.INVESTOR)
  invest(@Req() req, @Body() { projectId, amount }: { projectId: string; amount: number }) {
    const user = req.user as User; // attach user from JWT
    return this.investmentService.invest(user, projectId, amount);
  }
}