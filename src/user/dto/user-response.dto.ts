import { Role } from '../enums/role.enum';

export class UserResponseDto {
  id: string;
  email: string;
  firstname: string | null;
  lastname: string | null;
  role: Role;
  createdAt: Date;
}