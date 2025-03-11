import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { InterestsModule } from './interests/interests.module';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typoeorm.config';
import { ProjectModule } from './project/project.module';
import { InvestmentModule } from './investment/investment.module';

@Module({
  imports: [
    // Loads .env file
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Configure TypeORM
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    InterestsModule,
    AuthModule,
    ProjectModule,
    InvestmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
