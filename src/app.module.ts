import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { InterestsModule } from './interests/interests.module';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typoeorm.config';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
