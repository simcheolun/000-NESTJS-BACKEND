import { Module } from '@nestjs/common';
import { GroupUserService } from './group-user.service';
import { GroupUserController } from './group-user.controller';
import { AuthModule } from 'src/Auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupUserEntity, GroupUserEntitySlave } from './entities/group-user.entity';
import { GroupUserRepository, GroupUserRepositorySlave } from './group-user.repository';
import { ZRedisService } from 'z-redis/z-redis.service';
import { GroupCompanyRepositorySlave } from 'src/group-company/group-company.repository';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([GroupUserEntity]),
    TypeOrmModule.forFeature([GroupUserEntitySlave], 'SLAVE'),
  ],
  controllers: [GroupUserController],
  providers: [
    ZRedisService,
    GroupUserService,
    GroupUserRepository,
    GroupUserRepositorySlave,
    GroupCompanyRepositorySlave,
  ]
})
export class GroupUserModule { }
