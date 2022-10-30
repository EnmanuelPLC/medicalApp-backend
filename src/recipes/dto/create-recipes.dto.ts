import { IsNotEmpty } from 'class-validator';

export class CreateRecipeDto {
  @IsNotEmpty()
  doctorId: string;

  @IsNotEmpty()
  pacientId: string;

  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  medicine: string;

  useDescription: string;
}
