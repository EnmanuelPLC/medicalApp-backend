import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class AuthEntity extends BaseEntity {
    @PrimaryGeneratedColumn("rowid")
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    dateSignUp: string;
}
