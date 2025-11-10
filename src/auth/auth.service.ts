import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private jwtService: JwtService) { }
  
  async creatTokens(payload) {
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '1d'
    });

    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d'
    });
    
    return {
      "access_token" : access_token,
      "refresh_token": refresh_token
    }
  }
  
  async login(auth: AuthDto) {
    const user = await this.usersService.getUserByEmail(auth.email);
    
    if (user?.email !== auth.email && user?.password === auth.password) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Some error description',
      });
    }

    const payload = { sub: user.id, username: user.email };
    return this.creatTokens(payload);
  }

  async logout() {
    return 'Login success.'
    // const expDate = new Date(user.exp * 1000);
    // const now = new Date();
    
    // if (now > expDate) {
    //   console.log('Token đã hết hạn');
    // } else {
    //   console.log('Token vẫn còn hiệu lực');
    // }

  }
}
