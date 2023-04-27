import { UserEntity } from "src/user/user.entity";
import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne
} from "typeorm";

@Entity()
export class RecipeEntity extends BaseEntity {
    @PrimaryGeneratedColumn("rowid")
    id: number;

    @ManyToOne(() => UserEntity, (user) => user.recipes, {
        cascade: true,
        eager: true
    })
    @JoinColumn({ name: "doctorId" })
    doctor: UserEntity;

    @ManyToOne(() => UserEntity, (user) => user.recipes, {
        cascade: true,
        eager: true
    })
    @JoinColumn({ name: "pacientId" })
    pacient: UserEntity;

    @Column()
    date: string;

    @Column()
    medicine: string;

    @Column()
    useDescription?: string;
}
