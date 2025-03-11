import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async createProject(data: Partial<Project>): Promise<Project> {
    // Just for demonstration, no role checks in the service yet
    const project = this.projectRepository.create(data);
    return this.projectRepository.save(project);
  }
}
