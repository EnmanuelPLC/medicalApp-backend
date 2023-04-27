import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
import { AuthController } from "./auth.controller";
import { AuthEntity } from "./auth.entity";
import { AuthService } from "./auth.service";

@Module({
    imports: [TypeOrmModule.forFeature([AuthEntity, UserEntity])],
    controllers: [AuthController],
    providers: [AuthService, UserService]
})
export class AuthModule {
}
