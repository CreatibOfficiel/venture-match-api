import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Project } from '../../project/entities/project.entity';

@Entity()
export class Investment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  investor: User;

  @ManyToOne(() => Project)
  project: Project;

  @Column('decimal')
  amount: number;

  @CreateDateColumn()
  date: Date;
}