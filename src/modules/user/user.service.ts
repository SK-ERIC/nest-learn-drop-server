import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { User } from './models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async create(entity: DeepPartial<User>): Promise<boolean> {
    const res = await this.userRepository.insert(entity);
    if (res && res.raw.affectedRows > 0) {
      return true;
    }
    return false;
  }

  async del(id: string): Promise<boolean> {
    const res = await this.userRepository.delete(id);
    if (res.affected > 0) {
      return true;
    }
    return false;
  }

  async update(id: string, entity: DeepPartial<User>): Promise<boolean> {
    const res = await this.userRepository.update(id, entity);
    if (res.affected > 0) {
      return true;
    }
    return false;
  }

  async find(id: string): Promise<User> {
    const res = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    return res;
  }

  async findByTel(tel: string): Promise<User> {
    const res = await this.userRepository.findOne({
      where: {
        tel,
      },
    });
    return res;
  }

  async updateCode(id: string, code: string): Promise<boolean> {
    const res = await this.userRepository.update(id, {
      code,
      codeCreateTimeAt: new Date(),
    });
    if (res.affected > 0) {
      return true;
    }
    return false;
  }
}
