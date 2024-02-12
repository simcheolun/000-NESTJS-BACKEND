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

@Entity({ database:'car008', schema: 'MASTER', name: 'storage_info' })
export class storageInfoEntityMaster {
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

@Entity('storage_info',{ database: 'car008', schema: 'SLAVE', name: 'storage_info' })
export class storageInfoEntitySlave {
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