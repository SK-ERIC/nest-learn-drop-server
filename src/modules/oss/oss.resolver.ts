import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { GqlAuthGuard } from '@/common/guards/auth.guard';

import { OSSType } from './dto/oss.type';
import { OSSService } from './oss.service';

@Resolver()
@UseGuards(GqlAuthGuard)
export class OSSResolver {
  constructor(private readonly ossService: OSSService) {}

  @Query(() => OSSType, { description: '获取 oss 相关信息' })
  async getOSSInfo(): Promise<OSSType> {
    return await this.ossService.getSignature();
  }
}
