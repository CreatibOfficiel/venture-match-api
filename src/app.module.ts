import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { InterestsModule } from './interests/interests.module';

@Module({
  imports: [
    // Loads .env file
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Configure TypeORM
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // For development only; disable in production
    }),
    UserModule,
    InterestsModule,
    // Import other modules here
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
