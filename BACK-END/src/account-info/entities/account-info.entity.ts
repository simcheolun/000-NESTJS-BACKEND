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

@Entity({ database:'car008', schema: 'MASTER', name: 'account_info' })
export class AccountInfoEntityMaster {
    @PrimaryGeneratedColumn({ type: "bigint", name: "seq" }) seq: number;
    @Column({ type: "bigint", name: "creator" }) creator: number;
    @Column({ type: "timestamp", name: "created" }) created: Date;
    @Column({ type: "bigint", name: "updater" }) updater: number;
    @Column({ type: "timestamp", name: "updated" }) updated: Date;
    @Column({ type: "bigint", name: "sn" }) sn: number;
    @Column({ type: "bigint", name: "company_seq" }) companyId: number;
    @Column({ type: "varchar", name: "id" }) id: string;
    @Column({ type: "varchar", name: "pw" }) pw: string;
    @Column({ type: "json", name: "ips" }) ips: string;
    @Column({ type: "varchar", name: "name" }) name: string;
    @Column({ type: "varchar", name: "mail" }) mail: string;
    @Column({ type: "varchar", name: "tel" }) tel: string;
    @Column({ type: "varchar", name: "memo" }) memo: string;
    @Column({ type: "int", name: "state" }) state: number;
    @Column({ type: "int", name: "level" }) level: number;
    @Column({ type: "varchar", name: "phone" }) phone: string;
    @Column({ type: "timestamp", name: "last_date" }) lastDate: Date;
    @Column({ type: "varchar", name: "last_ip" }) lastIp: string;
    @Column({ type: "json", name: "authority" }) authority: string;
    @Column({ type: "varchar", name: "authoritys" }) authoritys: string;
    @Column({ type: "int", name: "language" }) language: number;

    // bigint to number --------------------------
    toJSON() {
        return {
            ...this,
            seq: Number(this.seq),
        };
    }
}

@Entity({ database: 'car008', schema: 'SLAVE', name: 'account_info' })
export class AccountInfoEntitySlave {
    @PrimaryGeneratedColumn({ type: "bigint", name: "seq" }) seq: number;
    @Column({ type: "bigint", name: "creator" }) creator: number;
    @Column({ type: "timestamp", name: "created" }) created: Date;
    @Column({ type: "bigint", name: "updater" }) updater: number;
    @Column({ type: "timestamp", name: "updated" }) updated: Date;
    @Column({ type: "bigint", name: "sn" }) sn: number;
    @Column({ type: "bigint", name: "company_seq" }) companyId: number;
    @Column({ type: "varchar", name: "id" }) id: string;
    @Column({ type: "varchar", name: "pw" }) pw: string;
    @Column({ type: "json", name: "ips" }) ips: string;
    @Column({ type: "varchar", name: "name" }) name: string;
    @Column({ type: "varchar", name: "mail" }) mail: string;
    @Column({ type: "varchar", name: "tel" }) tel: string;
    @Column({ type: "varchar", name: "memo" }) memo: string;
    @Column({ type: "int", name: "state" }) state: number;
    @Column({ type: "int", name: "level" }) level: number;
    @Column({ type: "varchar", name: "phone" }) phone: string;
    @Column({ type: "timestamp", name: "last_date" }) lastDate: Date;
    @Column({ type: "varchar", name: "last_ip" }) lastIp: string;
    @Column({ type: "json", name: "authority" }) authority: string;
    @Column({ type: "varchar", name: "authoritys" }) authoritys: string;
    @Column({ type: "int", name: "language" }) language: number;

    // bigint to number --------------------------
    toJSON() {
        return {
            ...this,
            seq: Number(this.seq),
        };
    }
}