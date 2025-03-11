import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { InvestmentService } from '../investment/investment.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly userService: UserService,
    private readonly investmentService: InvestmentService,
  ) {}

  findAllUsers() {
    return this.userService.findAll();
  }

  findAllInvestments() {
    return this.investmentService.findAll();
  }
}