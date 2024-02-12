import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { storageInfoEntityMaster, storageInfoEntitySlave } from './entities/strage-info.entity';
import { storageInfoRepositoryMaster, storageInfoRepositorySlave } from './strage-info.repository';
import { storageInfoService } from './strage-info.service';
import { storageInfoController } from './strage-info.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/Auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([storageInfoEntityMaster]),
    TypeOrmModule.forFeature([storageInfoEntitySlave])],
  controllers:[storageInfoController],
  providers: [
    JwtService,
    storageInfoRepositorySlave,
    storageInfoRepositoryMaster,
    storageInfoService],
  exports: [
    storageInfoRepositorySlave,
    storageInfoRepositorySlave], 
})
export class storageInfoModule {}
