import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
    synchronize: true, // For development only; disable in production
  }