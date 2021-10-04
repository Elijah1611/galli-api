import { IsDate, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class EntityBase {

    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @CreateDateColumn()
    @IsDate()
    created_at: Date;

    @UpdateDateColumn()
    @IsDate()
    updated_at: Date;

    @DeleteDateColumn()
    @IsOptional()
    @IsDate()
    deleted_at: Date;
}