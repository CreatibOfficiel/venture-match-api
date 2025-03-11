import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  // By default, passport-local expects a `username` field in the request body.
  // We override it to use `email`.
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  // Passport will call this method automatically after reading the request body.
  // The `validate` method is responsible for checking the user credentials.
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user; 
  }
}