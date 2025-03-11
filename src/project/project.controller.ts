import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
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
  create(@Req() req, @Body() data: Partial<Project>): Promise<Project> {
      const user = req.user;
      return this.projectService.createProject(user, data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  updateProject(@Req() req, @Param('id') id: string, @Body() data: Partial<Project>): Promise<Project> {
    const user = req.user; // user data from JWT
    return this.projectService.updateProject(user, id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  deleteProject(@Req() req, @Param('id') id: string): Promise<void> {
    const user = req.user;
    return this.projectService.deleteProject(user, id);
  }
}