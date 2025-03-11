import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/user/enums/role.enum';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async createProject(user: User, data: Partial<Project>): Promise<Project> {
    const project = this.projectRepository.create({
      ...data,
      owner: user,
    });
    return this.projectRepository.save(project);
  }

  async updateProject(user: User, projectId: string, data: Partial<Project>): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['owner'],
    });
    if (!project) {
      throw new ForbiddenException('Project not found.');
    }
    // Ensure the user is owner or admin
    if (project.owner.id !== user.id && user.role !== Role.ADMIN) {
      throw new ForbiddenException('You are not allowed to update this project.');
    }
  
    Object.assign(project, data);
    return this.projectRepository.save(project);
  }
  
  async deleteProject(user: User, projectId: string): Promise<void> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['owner'],
    });
    if (!project) return;
  
    if (project.owner.id !== user.id && user.role !== Role.ADMIN) {
      throw new ForbiddenException('You are not allowed to delete this project.');
    }
  
    await this.projectRepository.remove(project);
  }
}
