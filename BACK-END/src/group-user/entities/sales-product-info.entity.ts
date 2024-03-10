
// ENTITIES
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'
@Entity({ database: 'car008', schema: 'MASTER', name: 'sales_product_info' })
export class salesProductInfoEntity {
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'seq' }) seq: number;
    @Column({ type: 'bigint', name: 'creator' }) creator: number;
    @Column({ type: 'timestamp', name: 'created' }) created: Date;
    @Column({ type: 'bigint', name: 'updater' }) updater: number;
    @Column({ type: 'timestamp', name: 'updated' }) updated: Date;
    @Column({ type: 'bigint', name: 'sn' }) sn: number;
    @Column({ type: 'varchar', name: 'pid' }) pid: string;
    @Column({ type: 'varchar', name: 'pid_list' }) pidList: string;
    @Column({ type: 'varchar', name: 'factory_num' }) factoryNum: string;
    @Column({ type: 'varchar', name: 'name' }) name: string;
    @Column({ type: 'int', name: 'saleStatus' }) saleStatus: number;
    @Column({ type: 'int', name: 'in_price' }) inPrice: number;
    @Column({ type: 'int', name: 'price_a' }) priceA: number;
    @Column({ type: 'int', name: 'price_b' }) priceB: number;
    @Column({ type: 'int', name: 'price_c' }) priceC: number;
    @Column({ type: 'int', name: 'price_d' }) priceD: number;
    @Column({ type: 'int', name: 'has_amount' }) hasAmount: number;
    @Column({ type: 'int', name: 'min_amount' }) minAmount: number;
    @Column({ type: 'varchar', name: 'memo' }) memo: string;
    @Column({ type: 'varchar', name: 'detail_info' }) detailInfo: string;
    @Column({ type: 'int', name: 'state' }) state: number;
    @Column({ type: 'bigint', name: 'company_seq' }) companySeq: number;
    @Column({ type: 'int', name: 'img_files' }) imgFiles: number;
    @Column({ type: 'int', name: 'type' }) type: number;
    @Column({ type: 'bigint', name: 'storage_seq' }) storageSeq: number;
    @Column({ type: 'bigint', name: 'base_seq' }) baseSeq: number;
    @Column({ type: 'bigint', name: 'ecount_seq' }) ecountSeq: number;
    @Column({ type: 'int', name: 'opt_type' }) optType: number;
    @Column({ type: 'bigint', name: 'product_id' }) productId: number;
    @Column({ type: 'int', name: 'biz_main_seq' }) bizMainSeq: number;
}

@Entity({ database: 'car008', schema: 'MASTER', name: 'company_info' })
export class CompanyInfoEntity {
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'company_seq' }) companySeq: number;
    @Column({ type: 'bigint', name: 'creator' }) creator: number;
    @Column({ type: 'timestamp', name: 'created' }) created: Date;
    @Column({ type: 'bigint', name: 'updater' }) updater: number;
    @Column({ type: 'timestamp', name: 'updated' }) updated: Date;
    @Column({ type: 'bigint', name: 'sn' }) sn: number;
    @Column({ type: 'varchar', name: 'name' }) name: string;
    @Column({ type: 'varchar', name: 'ceo' }) ceo: string;
    @Column({ type: 'varchar', name: 'tel' }) tel: string;
    @Column({ type: 'varchar', name: 'mail' }) mail: string;
    @Column({ type: 'varchar', name: 'fax' }) fax: string;
    @Column({ type: 'varchar', name: 'post_num' }) postNum: string;
    @Column({ type: 'varchar', name: 'addr' }) addr: string;
    @Column({ type: 'varchar', name: 'addr_sub' }) addrSub: string;
    @Column({ type: 'varchar', name: 'memo' }) memo: string;
    @Column({ type: 'int', name: 'auditi' }) auditi: number;
    @Column({ type: 'int', name: 'state' }) state: number;
    @Column({ type: 'varchar', name: 'license' }) license: string;
    @Column({ type: 'bigint', name: 'admin_id' }) adminId: number;
    @Column({ type: 'varchar', name: 'phone' }) phone: string;
    @Column({ type: 'varchar', name: 'admin_name' }) adminName: string;
    @Column({ type: 'int', name: 'level' }) level: number;
}


@Entity({ database: 'car008', schema: 'MASTER', name: 'storage_info' })
export class StorageInfoEntity {
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'seq' }) seq: number;
    @Column({ type: 'bigint', name: 'creator' }) creator: number;
    @Column({ type: 'timestamp', name: 'created' }) created: Date;
    @Column({ type: 'bigint', name: 'updater' }) updater: number;
    @Column({ type: 'timestamp', name: 'updated' }) updated: Date;
    @Column({ type: 'bigint', name: 'sn' }) sn: number;
    @Column({ type: 'bigint', name: 'company_seq' }) companySeq: number;
    @Column({ type: 'bigint', name: 'user_id' }) userId: number;
    @Column({ type: 'varchar', name: 'name' }) name: string;
    @Column({ type: 'varchar', name: 'addr' }) addr: string;
    @Column({ type: 'varchar', name: 'memo' }) memo: string;
    @Column({ type: 'int', name: 'state' }) state: number;
    @Column({ type: 'bigint', name: 'ecount_seq' }) ecountSeq: number;
    @Column({ type: 'int', name: 'opt_type' }) optType: number;
    @Column({ type: 'int', name: 'biz_usage' }) bizUsage: number;
}