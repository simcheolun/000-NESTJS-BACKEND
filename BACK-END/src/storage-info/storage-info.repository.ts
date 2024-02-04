import { Injectable } from "@nestjs/common";
import { Brackets, DataSource, Repository } from "typeorm";
import { searchParams } from "./search.params";
import { StorageInfoEntityMaster, StorageInfoEntitySlave } from "./entities/storage-info.entity";
import { returnJSONList } from "src/Auth/custom.function";


@Injectable()
export class StorageInfoRepository extends Repository<StorageInfoEntitySlave>{

  constructor(private dataSource: DataSource) {
    // 데이터소스 생성
    super(StorageInfoEntitySlave, dataSource.createEntityManager());
  }

  async getStorageInfo(params: searchParams, loginUserInfo: any) {
    const { objSearchMapper, page, size } = params
    let { searchKeyword, state } = objSearchMapper
    const take = size || 10;
    const skip = (page - 1) * take;
    let queryBuilder = this.createQueryBuilder('storageInfo')
      .select("storageInfo") // 테이블이름
      .where('storageInfo.companyId = :companyId', { companyId: loginUserInfo.companyId })
      // .leftJoinAndSelect("storageInfo.companyInfo", "companyInfo", "companyInfo.seq = storageInfo.companyId")
      .orderBy("storageInfo.seq", "DESC") // 내림차순정열
    if (searchKeyword) {
      queryBuilder = queryBuilder.where(new Brackets(qb => {
        qb.where(`
          storageInfo.companyId = :companyId AND (
            storageInfo.name LIKE :searchKeyword OR
            companyInfo.name LIKE :searchKeyword
            )`, {
          companyId: loginUserInfo.seq,
          searchKeyword: `%${searchKeyword}%`
        })
      }));
    }

    if (state != null || state != undefined) {
      queryBuilder = queryBuilder.andWhere("storageInfo.state = :state", { state: state });
    }
    const [result, total] = await queryBuilder.skip(skip).take(take).getManyAndCount();
    return returnJSONList(result, total, page, size, 200)
  }

}
