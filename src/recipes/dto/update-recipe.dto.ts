import { IsNotEmpty } from "class-validator";

export class UpdateRecipeDto {
    @IsNotEmpty()
    medicine: string;

    @IsNotEmpty()
    useDescription: string;
}
