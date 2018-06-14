import * as jwt from 'jsonwebtoken';
import { HttpException, Injectable } from '@nestjs/common';
import { User } from '../../entities';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  private tokenExp = process.env.TOKEN_EXPIRATION;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly usersService: UsersService,
  ) { }

  public async validateUser(userId: string): Promise<any> {
    return await this.usersService.validateUser(userId);
  }

  public async login(email, password) {
    if (!email) throw new HttpException('Email is required', 422);
    if (!password) throw new HttpException('Password is required', 422);

    const foundUser = await this.userRepository.findOne({email});
    if (!foundUser) throw new HttpException('User not found', 401);
    if (!(await this.usersService.isValidPassword(foundUser, password))) throw new HttpException('User not found', 401);
    return this.createToken(foundUser);
  }

  private async createToken(user: User) {
    const data = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
    };
    const token = jwt.sign(data, process.env.SECRET, { expiresIn: this.tokenExp });

    return {
        access_token: token,
    };
  }
}