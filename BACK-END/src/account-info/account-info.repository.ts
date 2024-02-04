import { Injectable } from '@nestjs/common';
import { Brackets, DataSource, Repository } from 'typeorm';
import { returnJSONList, returnJSONSingle } from 'src/Auth/custom.function';
import { AccountInfoEntityMaster, AccountInfoEntitySlave } from './entities/account-info.entity';
import bcrypt from 'bcrypt'
import { AuthService } from 'src/Auth/auth.service';

@Injectable()
export class AccountInfoRepositoryMaster extends Repository<AccountInfoEntityMaster>{
    constructor(private dataSource: DataSource) {
        super(AccountInfoEntityMaster, dataSource.createEntityManager());
    }
}

@Injectable()
export class AccountInfoRepositorySlave extends Repository<AccountInfoEntitySlave>{
    constructor(
        private dataSource: DataSource,
        private authService: AuthService,
        ) {
        super(AccountInfoEntitySlave, dataSource.createEntityManager());
    }

    async getAccountInfo(params: any, loginUserInfo: any) {
        const { objSearchMapper, page, size } = params
        let { searchKeyword, state } = objSearchMapper
        const take = size || 10;
        const skip = (page - 1) * take;
        const TABLENAME = 'accountInfo'
        let queryBuilder = this.createQueryBuilder(TABLENAME)
            .select(TABLENAME)
            // .where(`${TABLENAME}.companyId = :companyId`, { companyId: loginUserInfo.companyId })
            .orderBy(`${TABLENAME}.seq`, 'DESC')
        if (searchKeyword) {
            queryBuilder = queryBuilder.where(new Brackets(qb => {
                qb.where(`
                ${TABLENAME}.name LIKE :searchKeyword
            `, { companyId: loginUserInfo.seq, searchKeyword: `%${searchKeyword}%` })
            }));
        }
        if (state != null || state != undefined) {
            queryBuilder = queryBuilder.andWhere(`${TABLENAME}.state = :state`, { state: state });
        }
        const [result, total] = await queryBuilder.skip(skip).take(take).getManyAndCount();
        return returnJSONList(result, total, page, size, 200)
    }

    async LoginbyInventory(params: any, ip: any) {
        const { id, pw } = params
        let queryBuilder = this.createQueryBuilder('accountInfo')
            .select('accountInfo')
            .where('accountInfo.id = :id', { id: id })
        const result = await queryBuilder.getOne();
        let tmp_result = JSON.parse(JSON.stringify(result));
        // 계정체크
        if (!tmp_result) {
            return returnJSONSingle(params,'사용자가 존재하지않습니다.','CANCEL',200)
        }
        // 비밀번호 비교
        const isValidPassword = await bcrypt.compare(pw, tmp_result.pw);
        if (!isValidPassword) {
            return returnJSONSingle(params,'잘못된 비번입니다.','CANCEL',200)

        }
        delete tmp_result.pw // 리스에서 항목삭제
        // JWT 생성
        const jwtPayload: any = { loginInfo: tmp_result };
        const jwtToken = await this.authService.createToken(jwtPayload);
        // result
        const currentLoginIp = ip
        tmp_result.jwtToken = jwtToken
        tmp_result.currentLoginIp = currentLoginIp
        return returnJSONSingle(tmp_result,'요청이 반영되었습니다.','OK',200)
    }

}
