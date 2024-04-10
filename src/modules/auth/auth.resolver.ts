import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

import { LOGIN_ERROR, SUCCESS } from '@/common/constants/code';
import { Result } from '@/common/dto/result.type';

import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  @Mutation(() => Result, { description: '登录' })
  async login(
    @Args('account') account: string,
    @Args('password') password: string
  ): Promise<Result> {
    const user = await this.userService.findByAccount(account);
    if (!user) {
      return {
        code: LOGIN_ERROR,
        message: '登录失败，用户不存在',
      };
    }
    if (account === 'admin' && password === 'admin123') {
      const token = this.jwtService.sign({
        id: user.id,
      });
      return {
        code: SUCCESS,
        message: '登录成功',
        data: token,
      };
    }

    return {
      code: LOGIN_ERROR,
      message: '登录失败，用户名或密码错误',
    };
  }
}
