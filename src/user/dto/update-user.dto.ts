import { IsNotEmpty } from "class-validator";
import { UserType } from "../user.entity";

export class UpdateUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    lastname: string;

    @IsNotEmpty()
    type: UserType;
}
