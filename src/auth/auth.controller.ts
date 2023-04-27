import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post("signup")
    signup(@Body() user: CreateUserDto) {
        return this.authService.signup(user);
    }

    @Post("signin")
    login(@Body() user: { user: string; pass: string }) {
        return this.authService.signin(user);
    }
}
