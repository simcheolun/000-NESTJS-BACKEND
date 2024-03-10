import { Injectable } from '@nestjs/common';
import { Brackets, DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { consolE, getpaginatedData, returnJSONList } from 'src/Auth/custom.function';
import { GroupUserEntity, GroupUserEntitySlave } from './entities/group-user.entity';


@Injectable()
export class GroupUserRepository extends Repository<GroupUserEntity>{
    constructor(
        private dataSource: DataSource,
    ) {
        super(GroupUserEntity, dataSource.createEntityManager());
    }
    async getUserInfo(params: any, loginUserInfo: any) {
        const { size, page, searchKeyword } = params
        const TABLENAME = 'group_user'
        let queryBuilder = this.createQueryBuilder(TABLENAME)
            .select(TABLENAME)
            .orderBy(`${TABLENAME}.id`, 'ASC')
        const data = await queryBuilder.getMany()
        const result = await getpaginatedData(data, page, size, ['deleteAt'])
        return result
    }




    async test(id: any) {
        const subtable = {
            company: [
                { id: 1, name: 'aa' },
                { id: 2, name: 'bb' },
                { id: 3, name: 'cc' },
                { id: 4, name: 'dd' },
            ],
            storage: [
                { id: 1, name: 's1' },
                { id: 2, name: 's2' },
                { id: 3, name: 's3' },
                { id: 4, name: 's4' },
            ],
            home: [
                { id: 1, name: 'home1' },
                { id: 2, name: 'home1' },
                { id: 3, name: 'home1' },
                { id: 4, name: 'home1' },
            ],
        }
        const user = [
            { id: 1, company_id: 1, name: 'a', home_id: 2, },
            { id: 2, company_id: 2, name: 'b', home_id: 1, },
            { id: 3, company_id: 3, name: 'c', home_id: 3, },
        ];

        let result: any = {}; // 빈 객체로 초기화

        function joinInfo(tableName: any, field: any, objField: any, returnKeyName: any) {
            const userInfo = user.find(item => item.id === id);
            if (!userInfo) {
                return null;
            }

            const returnSubInfo = subtable[tableName].find((item: any) => item[objField] === parseInt(userInfo[field]));
            if (!returnSubInfo) {
                return null;
            }

            // 새로운 객체를 생성하고 이전에 반환된 객체의 정보를 유지한 후에 새로운 정보를 추가
            result[returnKeyName] = returnSubInfo; // 새로운 정보를 추가
            return result; // 업데이트된 결과 반환
        }

        result = {
            id: id,
            joinInfo: joinInfo // joinInfo 함수를 결과 객체에 포함
        };

        return result;
    }































    async testX(id: any) {
        const subtable = {
            company: [
                { id: 1, name: 'aa' },
                { id: 2, name: 'bb' },
                { id: 3, name: 'cc' },
                { id: 4, name: 'dd' },
            ],
            storage: [
                { id: 1, name: 's1' },
                { id: 2, name: 's2' },
                { id: 3, name: 's3' },
                { id: 4, name: 's4' },
            ]
        }
        const user = [
            { id: 1, company_id: '1', name: 'a' },
            { id: 2, company_id: '2', name: 'b' },
            { id: 3, company_id: '3', name: 'c' },
        ];

        let result: any = null;

        function joinInfo(tableName: any, field: any, objField: any, returnKeyName: any) {
            const userInfo = user.find(item => item.id === id);
            if (!userInfo) {
                return null;
            }

            const returnSubInfo = subtable[tableName].find((item: any) => item[objField] === parseInt(userInfo[field]));
            if (!returnSubInfo) {
                return null;
            }

            // 새로운 객체를 생성하고 이전에 반환된 객체의 정보를 유지한 후에 새로운 정보를 추가
            const newResult: any = { ...result }; // 이전에 반환된 객체의 정보를 유지
            newResult[returnKeyName] = returnSubInfo; // 새로운 정보를 추가
            return newResult;
        }

        result = {
            id: id,
        };

        return {
            joinInfo: joinInfo,
        };
    }



}
