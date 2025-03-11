import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investment } from './entities/investment.entity';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/user/enums/role.enum';

@Injectable()
export class InvestmentService {
  constructor(
    @InjectRepository(Investment)
    private readonly investmentRepository: Repository<Investment>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async findAll(): Promise<Investment[]> {
    return this.investmentRepository.find();
  }

  /**
   * Allow an investor to invest in a specific project.
   * @param user - The user making the investment (should have Role.INVESTOR).
   * @param projectId - The ID of the project they want to invest in.
   * @param amount - The amount of money they want to invest.
   */
  async invest(user: User, projectId: string, amount: number): Promise<Investment> {
    // Check if user has investor role
    if (user.role !== Role.INVESTOR) {
      throw new ForbiddenException('Only investors can invest.');
    }

    // Find the project
    const project = await this.projectRepository.findOne({ where: { id: projectId } });
    if (!project) {
      throw new NotFoundException('Project not found.');
    }

    // Create an Investment record
    const investment = this.investmentRepository.create({
      investor: user,
      project: project,
      amount,
    });

    return this.investmentRepository.save(investment);
  }
}
