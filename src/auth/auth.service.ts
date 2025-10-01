import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private jwtService: JwtService) { }
  
  async login(auth: AuthDto) {
    const user = await this.usersService.getUser(auth.email);
    if (user?.email !== auth.email && user?.password === auth.password) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Some error description',
      });
    }

    const payload = { sub: user.id, username: user.email };
    const access_token = await this.jwtService.signAsync(payload);
    console.log(access_token);
    
    // to do genarate jwt 

    return user
  }
}
