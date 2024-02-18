import { Module } from '@nestjs/common';
import { AuthModule } from 'src/Auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZRedisService } from 'z-redis/z-redis.service';
import { GroupCompanyEntity, GroupCompanyEntitySlave } from './entities/group-company.entity';
import { GroupCompanyController } from './group-company.controller';
import { GroupCompanyService } from './group-company.service';
import { GroupCompanyRepository, GroupCompanyRepositorySlave } from './group-company.repository';
import { GroupUserRepository } from 'src/group-user/group-user.repository';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([GroupCompanyEntity]),
    TypeOrmModule.forFeature([GroupCompanyEntitySlave], 'SLAVE'),
  ],
  controllers: [GroupCompanyController],
  providers: [
    ZRedisService,
    GroupCompanyService,
    GroupCompanyRepository,
    GroupCompanyRepositorySlave,
    GroupUserRepository,
  ]
})
export class GroupCompanyModule { }
