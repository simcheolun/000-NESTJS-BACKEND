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
export class testMasterEntity {
    @PrimaryGeneratedColumn({ type: "bigint", name: "seq" }) seq: number;
    @Column({ type: "varchar", name: "name" }) name: string;

    // bigint to number --------------------------
    toJSON() {
        return {
            ...this,
            seq: Number(this.seq),
        };
    }
}

@Entity({ database: 'car008', schema: 'SLAVE', name: 'account_info' })
export class testSlaveEntity {
    @PrimaryGeneratedColumn({ type: "bigint", name: "seq" }) seq: number;
    @Column({ type: "varchar", name: "name" }) name: string;
    @Column({ type: "varchar", name: "id" }) id: string;

    // bigint to number --------------------------
    toJSON() {
        return {
            ...this,
            seq: Number(this.seq),
        };
    }
}