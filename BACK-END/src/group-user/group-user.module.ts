import { Module } from '@nestjs/common';
import { GroupUserService } from './group-user.service';
import { GroupUserController } from './group-user.controller';
import { AuthModule } from 'src/Auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupUserEntity, GroupUserEntitySlave } from './entities/group-user.entity';
import { GroupUserRepository } from './group-user.repository';
import { ZRedisService } from 'z-redis/z-redis.service';

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
  ]
})
export class GroupUserModule { }
