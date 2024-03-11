import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ database: 'temp', schema: 'MASTER', name: 'group_user' })
export class GroupUserEntity {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' }) id: number;
    @Column({ type: 'varchar', name: 'user_number' }) user_number: string;
    @Column({ type: 'varchar', name: 'user_name' }) user_name: string;
    @Column({ type: 'varchar', name: 'user_sex' }) user_sex: string;
    @Column({ type: 'varchar', name: 'user_borth' }) user_borth: string;
    @Column({ type: 'varchar', name: 'login_id' }) login_id: string;
    @Column({ type: 'varchar', name: 'login_pw', select: true }) login_pw: string;
    @Column({ type: 'varchar', name: 'user_email' }) user_email: string;
    @Column({ type: 'varchar', name: 'user_mobile' }) user_mobile: string;
    @Column({ type: 'varchar', name: 'user_post_number' }) user_post_number: string;
    @Column({ type: 'varchar', name: 'user_address' }) user_address: string;
    @Column({ type: 'int', name: 'company_id' }) company_id: number;
    @DeleteDateColumn({ type: 'timestamp', name: 'deleteAt', nullable: true, select: true }) deleteAt: string;
    @Column({ type: 'int', name: 'point' }) point: number;
}


@Entity({ database: 'temp', schema: 'SALAVE', name: 'group_user' })
export class GroupUserEntitySlave {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' }) id: number;
    @Column({ type: 'varchar', name: 'user_number' }) user_number: string;
    @Column({ type: 'varchar', name: 'user_name' }) user_name: string;
    @Column({ type: 'varchar', name: 'user_sex' }) user_sex: string;
    @Column({ type: 'varchar', name: 'user_borth' }) user_borth: string;
    @Column({ type: 'varchar', name: 'login_id' }) login_id: string;
    @Column({ type: 'varchar', name: 'login_pw', select: true }) login_pw: string;
    @Column({ type: 'varchar', name: 'user_email' }) user_email: string;
    @Column({ type: 'varchar', name: 'user_mobile' }) user_mobile: string;
    @Column({ type: 'varchar', name: 'user_post_number' }) user_post_number: string;
    @Column({ type: 'varchar', name: 'user_address' }) user_address: string;
    @Column({ type: 'int', name: 'company_id' }) company_id: number;
    @DeleteDateColumn({ type: 'timestamp', name: 'deleteAt', nullable: true, select: false }) deleteAt: string;
    @Column({ type: 'int', name: 'point' }) point: number;
}

