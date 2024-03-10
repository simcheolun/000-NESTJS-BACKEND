import { Injectable } from '@nestjs/common';
import { CreateDevDto } from './dto/create-dev.dto';
import { UpdateDevDto } from './dto/update-dev.dto';
import { ZRedisService } from 'z-redis/z-redis.service';
import { fieldToSimple, firstToUpper, stringToSimple, stringToSimple_ } from 'src/Auth/custom.function';

@Injectable()
export class DevService {
  constructor(
    private ZRedisService: ZRedisService,
  ) { }
  async getTest() {
    const keys = await this.ZRedisService.getCaching('orange')
    console.log(keys)
  }

  async createNESTJSproject(params: any) {
    const entityArray = params.entity.split(' ')
    const properties = entityArray.map((item: string) => {
      const entites = item.split('\t')
      switch (entites[1]) {
        case 'bigint':
          if (entites[0] == 'id' || entites[0] == 'seq') {
            return `@PrimaryGeneratedColumn({ type: 'bigint', name: '${entites[0]}' }) ${entites[0]}: string`
          } else {
            return `@Column({ type: 'bigint', name: '${entites[0]}' }) ${entites[0]}: string;`
          }
        case 'timestamp':
          return `@Column({ type: 'bigint', name: '${entites[0]}' }) ${entites[0]}: Date;`
        case 'varchar':
          return `@Column({ type: 'varchar', name: '${entites[0]}' }) ${entites[0]}: string;`
        case 'int':
          return `@Column({ type: 'int', name: '${entites[0]}' }) ${entites[0]}: number;`
        default: {
          return item
          // return `@XXXXXXX({ type: 'int', name: '${entites[0]}' }) ${entites[0]}: number;`
        }
      }
    }).map((str: string) => str.replace(/\\/g, ''))
    properties.push(`import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';`)
    return properties
  }

  async convertToTypeScript(params: any) {
    // create Entity
    const entityArray = params.entity.split(' ')
    const properties: any = entityArray.map((item: any) => {
      const [name, type] = item.split('	')
      switch (type) {
        case 'bigint':
          if (name === 'seq' || name === 'id') {
            return `@PrimaryGeneratedColumn({ type: 'bigint', name: '${name}' }) ${stringToSimple(name)}: number;`
          } else {
            return `@Column({ type: 'bigint', name: '${name}' }) ${stringToSimple(name)}: number;`
          }
        case 'int':
          if (name === 'seq' || name === 'id') {
            return `@PrimaryGeneratedColumn({ type: 'int', name: '${name}' }) ${stringToSimple(name)}: number;`
          } else {
            return `@Column({ type: 'int', name: '${name}' }) ${stringToSimple(name)}: number;`
          }
        case 'timestamp': return `@Column({ type: 'timestamp', name: '${name}' }) ${stringToSimple(name)}: Date;`
        case 'varchar': return `@Column({ type: 'varchar', name: '${name}' }) ${stringToSimple(name)}: string;`
        default: return `@Column({ type: 'int', name: '${name}' }) ${stringToSimple(name)}: number;`
      }
    })
    let Entities: string = `
    // ENTITIES
    import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'
    @Entity({ database: '${params.database}', schema: '${params.schema}', name: '${params.table}' })
    export class ${firstToUpper(stringToSimple(params.table))}Entity {
    `
    for (var item of properties) {
      Entities += '    ' + item + `\n`
    }

    Entities += '}\n\n'

    // create Repository
    let Repository = `// REPOSITORY
    import { Injectable } from '@nestjs/common';
    import { Brackets, DataSource, Repository } from 'typeorm';
    import {  
      getpaginatedData,
      getData, 
      returnMessage, 
      } from 'src/Auth/custom.function';
    import { ${firstToUpper(stringToSimple(params.table))}Entity } from './entities/${params.projectName}.entity';
    @Injectable()
    export class ${firstToUpper(stringToSimple_(params.projectName))}Repository extends Repository<${firstToUpper(stringToSimple(params.table))}Entity>{
        constructor(
            private dataSource: DataSource,
        ) {
            super(${firstToUpper(stringToSimple(params.table))}Entity, dataSource.createEntityManager());
        }
        async get${firstToUpper(stringToSimple_(params.projectName))}Repository(params: any, loginUserInfo: any) {
            const { size, page, searchKeyword } = params
            const TABLENAME = '${params.table}'
            let queryBuilder = this.createQueryBuilder(TABLENAME)
                .select(TABLENAME)
                .orderBy(TABLENAME, 'ASC')
            const data = await queryBuilder.getMany()
            const result = await getpaginatedData(data, page, size, ['deleteAt'])
            return result
        }
      }
      
      // create Modules
      import { Module } from '@nestjs/common';
      import { ${firstToUpper(stringToSimple_(params.projectName))}Service } from './${params.projectName}.service';
      import { ${firstToUpper(stringToSimple_(params.projectName))}Controller } from './${params.projectName}.controller';
      import { AuthModule } from 'src/Auth/auth.module';
      import { TypeOrmModule } from '@nestjs/typeorm';
      import { ${firstToUpper(stringToSimple(params.table))}Entity } from './entities/${params.projectName}.entity';
      import { ${firstToUpper(stringToSimple_(params.projectName))}Repository } from './${params.projectName}.repository';
      import { ZRedisService } from 'z-redis/z-redis.service';

      @Module({
        imports: [
          AuthModule,
          TypeOrmModule.forFeature([${firstToUpper(stringToSimple(params.table))}Entity]),
        ],
        controllers: [${firstToUpper(stringToSimple_(params.projectName))}Controller],
        providers: [
          // ZRedisService,
          ${firstToUpper(stringToSimple_(params.projectName))}Service,
          ${firstToUpper(stringToSimple_(params.projectName))}Repository,
        ]
      })
      export class ${firstToUpper(stringToSimple_(params.projectName))}Module { }
      
      
      `

    return Entities + Repository
  }

}
