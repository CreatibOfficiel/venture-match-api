import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
  } from 'typeorm';
  import { Role } from '../enums/role.enum';
import { Interest } from 'src/interests/entities/interest.entity';
  
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

    @ManyToMany(() => Interest)
    @JoinTable()
    interests: Interest[];
  
    @CreateDateColumn()
    createdAt: Date;
  }
  