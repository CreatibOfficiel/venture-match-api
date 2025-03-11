import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/user/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ENTREPRENEUR)
  create(@Body() data: Partial<Project>): Promise<Project> {
    return this.projectService.createProject(data);
  }
}