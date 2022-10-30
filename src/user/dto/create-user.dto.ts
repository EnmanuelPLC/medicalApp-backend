import { IsNotEmpty } from 'class-validator';
import { UserType } from '../user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  type: UserType;
}
