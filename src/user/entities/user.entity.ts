import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
  } from 'typeorm';
  import { Role } from '../enums/role.enum';
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ unique: true })
    email: string;
  
    @Column()
    password: string;
  
    @Column({ nullable: true })
    firstname: string;
  
    @Column({ nullable: true })
    lastname: string;
  
    @Column({
      type: 'enum',
      enum: Role,
      default: Role.ENTREPRENEUR,
    })
    role: Role;
  
    @CreateDateColumn()
    createdAt: Date;
  }
  