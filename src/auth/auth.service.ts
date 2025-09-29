import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) { }
  
  async login(authDto: AuthDto) {
    const user = await this.usersService.getUser(authDto.email);

    return user
  }
}
