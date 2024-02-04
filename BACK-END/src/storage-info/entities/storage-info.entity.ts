import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ValueTransformer
} from 'typeorm';

class BigIntTransformer implements ValueTransformer {
    to(value: number): BigInt {
        return BigInt(value);
    }
    from(value: BigInt): number {
        return Number(value);
    }
}

@Entity({database:'car008', schema: 'master', name: 'storage_info' })
export class StorageInfoEntityMaster {
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'seq' }) seq: number;
    @Column({ type: 'bigint', name: 'sn' }) sn: bigint;
    @Column({ type: 'bigint', name: 'company_seq' }) companyId: bigint;
    @Column({ type: 'varchar', name: 'name', length: 50 }) name: string;
    @Column({ type: 'varchar', name: 'addr', length: 50 }) addr: string;
    @Column({ type: 'varchar', name: 'memo', length: 50 }) memo: string;
    @Column({ type: 'int', name: 'state' }) state: number;
    @Column({ type: 'int', name: 'opt_type' }) optType: number;
    @Column({ type: 'bigint', name: 'ecount_seq' }) ecountId: bigint;
    @Column({ type: 'bigint', name: 'user_id' }) userId: bigint;
    @CreateDateColumn({ type: 'timestamp', name: 'created' }) created: Date;
    @UpdateDateColumn({ type: 'timestamp', name: 'updated' }) updated: Date;
    @Column({ type: 'bigint', name: 'creator' }) creator: bigint;
    @Column({ type: 'bigint', name: 'updater' }) updater: bigint;
    @Column({ type: 'int', name: 'biz_usage' }) bizUsage: number;
    // bigint to number --------------------------
    toJSON() {
        return {
            ...this,
            seq: Number(this.seq),
            sn: Number(this.sn),
            ecountId: Number(this.ecountId),
            userId: Number(this.userId),
            creator: Number(this.creator),
            updater: Number(this.updater),
            companyId: Number(this.companyId),
        };
    }
}

@Entity({database:'car008', schema: 'slave', name: 'storage_info' })
export class StorageInfoEntitySlave {
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'seq' }) seq: number;
    @Column({ type: 'bigint', name: 'sn' }) sn: bigint;
    @Column({ type: 'bigint', name: 'company_seq' }) companyId: bigint;
    @Column({ type: 'varchar', name: 'name', length: 50 }) name: string;
    @Column({ type: 'varchar', name: 'addr', length: 50 }) addr: string;
    @Column({ type: 'varchar', name: 'memo', length: 50 }) memo: string;
    @Column({ type: 'int', name: 'state' }) state: number;
    @Column({ type: 'int', name: 'opt_type' }) optType: number;
    @Column({ type: 'bigint', name: 'ecount_seq' }) ecountId: bigint;
    @Column({ type: 'bigint', name: 'user_id' }) userId: bigint;
    @CreateDateColumn({ type: 'timestamp', name: 'created' }) created: Date;
    @UpdateDateColumn({ type: 'timestamp', name: 'updated' }) updated: Date;
    @Column({ type: 'bigint', name: 'creator' }) creator: bigint;
    @Column({ type: 'bigint', name: 'updater' }) updater: bigint;
    @Column({ type: 'int', name: 'biz_usage' }) bizUsage: number;
    // bigint to number --------------------------
    toJSON() {
        return {
            ...this,
            seq: Number(this.seq),
            sn: Number(this.sn),
            ecountId: Number(this.ecountId),
            userId: Number(this.userId),
            creator: Number(this.creator),
            updater: Number(this.updater),
            companyId: Number(this.companyId),
        };
    }
}