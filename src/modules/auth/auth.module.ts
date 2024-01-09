import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../user/models/user.entity';
import { UserService } from '../user/user.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, AuthResolver, UserService],
  exports: [],
})
export class AuthModule {}
