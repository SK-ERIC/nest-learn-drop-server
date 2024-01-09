import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { LOGIN_ERROR, SUCCESS } from '@/common/constants/code';
import { Result } from '@/common/dto/result.type';

import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Mutation(() => Result, { description: '登录' })
  async login(
    @Args('username') username: string,
    @Args('password') password: string
  ): Promise<Result> {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 模拟登录延迟
    if (username === 'admin' && password === 'admin123') {
      return {
        code: SUCCESS,
        message: '登录成功',
      };
    }

    return {
      code: LOGIN_ERROR,
      message: '用户名或密码错误',
    };
  }
}
