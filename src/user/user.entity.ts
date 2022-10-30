import { RecipeEntity } from 'src/recipes/recipe.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

export enum UserType {
  DOCTOR = 'Doctor',
  PACIENT = 'Paciente',
}

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column({ type: 'enum', enum: UserType })
  type: string;

  @OneToMany(() => RecipeEntity, (recipe) => recipe.id)
  recipes: RecipeEntity[];

  @Column()
  dateJoined: string;
}
