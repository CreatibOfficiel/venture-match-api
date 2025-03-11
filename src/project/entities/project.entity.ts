import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column('decimal', { default: 0 })
  budget: number;
}