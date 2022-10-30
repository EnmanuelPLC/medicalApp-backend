import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { AuthEntity } from './auth.entity';
import * as bcrypt from 'bcrypt';

@Injectable({})
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,
    private userService: UserService,
  ) {}
  async signin(user: { user: string; pass: string }) {
    let auth = false;
    let retMsg = 'Autenticado correctamente';
    console.log(user);
    const dbUser = await this.userService.getByName(user.user);
    if (dbUser) {
      const authData = await this.authRepository.findOne({
        where: { username: user.user },
      });
      const isMatch = await bcrypt.compare(user.pass, authData.password);
      if (isMatch) {
        auth = true;
      } else {
        retMsg = 'Contraseña incorrecta';
      }
    } else {
      retMsg = 'Usuario no encontrado';
    }

    return {
      login: auth,
      user: { uuid: dbUser.id, name: dbUser.name, type: dbUser.type },
      msg: retMsg,
    };
  }

  async signup(user: CreateUserDto) {
    const dbUser = await this.userService.getByName(user.name);
    if (dbUser) throw new Error('El usuario ya existe en el sistema');
    const hash = await bcrypt.hash(user.password, 10);
    const created = this.authRepository.create({
      username: user.name,
      password: hash,
      dateSignUp: new Date(Date.now()).toLocaleString(),
    });
    await this.authRepository.save(created);
    return await this.userService.create(user);
  }
}
