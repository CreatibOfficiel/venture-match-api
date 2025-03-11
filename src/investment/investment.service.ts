import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
  async invest(
    user: User,
    projectId: string,
    amount: number,
  ): Promise<Investment> {
    // Check if user has investor role
    if (user.role !== Role.INVESTOR) {
      throw new ForbiddenException('Only investors can invest.');
    }

    // Find the project
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
    });
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

  /**
   * Allows an investor to cancel (delete) their own investment.
   * @param user - The user requesting the cancellation.
   * @param investmentId - The ID of the investment to be canceled.
   */
  async cancelInvestment(user: User, investmentId: string): Promise<void> {
    // Find the investment record
    const investment = await this.investmentRepository.findOne({
      where: { id: investmentId },
      relations: ['investor'],
    });
    if (!investment) {
      // No investment found, or it's already gone.
      return;
    }

    // Check if the investment belongs to this user
    if (investment.investor.id !== user.id) {
      throw new ForbiddenException(
        'You cannot cancel an investment that is not yours.',
      );
    }

    // Remove the investment record
    await this.investmentRepository.remove(investment);
  }
}
