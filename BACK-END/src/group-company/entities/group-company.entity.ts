/*
id
user_number
user_name
user_sex
user_borth
login_id
login_pw

toJSON() {
        return {
            ...this,
            id: Number(this.id),
        };
    }
*/

import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ database: 'temp', schema: 'MASTER', name: 'group_company' })
export class GroupCompanyEntity {
    @PrimaryGeneratedColumn({ type: "int", name: "id" }) id: number;
    @Column({ type: "varchar", name: "company_number" }) company_number: string;
    @Column({ type: "varchar", name: "company_license" }) company_license: string;
    @Column({ type: "varchar", name: "company_name" }) company_name: string;
    @Column({ type: "varchar", name: "company_post_number" }) company_post_number: string;
    @Column({ type: "varchar", name: "company_address" }) company_address: string;
    @Column({ type: "int", name: "company_admin_id" }) company_admin_id: number;
    @CreateDateColumn({ type: "timestamp", name: "created" }) created: Date;
    @UpdateDateColumn({ type: "timestamp", name: "updated" }) updated: Date;
    @Column({ type: "int", name: "creator" }) creator: number;
    @Column({ type: "int", name: "updater" }) updater: number;
}


@Entity({ database: 'temp', schema: 'SALAVE', name: 'group_company' })
export class GroupCompanyEntitySlave {
    @PrimaryGeneratedColumn({ type: "int", name: "id" }) id: number;
    @Column({ type: "varchar", name: "company_number" }) company_number: string;
    @Column({ type: "varchar", name: "company_license" }) company_license: string;
    @Column({ type: "varchar", name: "company_name" }) company_name: string;
    @Column({ type: "varchar", name: "company_post_number" }) company_post_number: string;
    @Column({ type: "varchar", name: "company_address" }) company_address: string;
    @Column({ type: "int", name: "company_admin_id" }) company_admin_id: number;
    @CreateDateColumn({ type: "timestamp", name: "created" }) created: Date;
    @UpdateDateColumn({ type: "timestamp", name: "updated" }) updated: Date;
    @Column({ type: "int", name: "creator" }) creator: number;
    @Column({ type: "int", name: "updater" }) updater: number;
}