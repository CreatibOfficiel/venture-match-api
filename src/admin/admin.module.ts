import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UserModule } from 'src/user/user.module';
import { InvestmentModule } from 'src/investment/investment.module';

@Module({
  imports: [
    UserModule,
    InvestmentModule
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
