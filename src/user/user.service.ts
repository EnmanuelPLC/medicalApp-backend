import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {
    }

    async create(user: CreateUserDto) {
        const created = this.userRepository.create({
            ...user,
            dateJoined: new Date(Date.now()).toLocaleString()
        });
        return await this.userRepository.save(created);
    }

    async getAll() {
        return await this.userRepository.find();
    }

    async get(id: number) {
        const user = await this.userRepository.findOne({ where: { id: id } });
        if (!user) throw new NotFoundException("Usuario no encontrado");
        return user;
    }

    async getByName(name: string) {
        console.log(name);
        const user = await this.userRepository.findOne({
            where: { name: name }
        });
        console.log(user);
        return user;
    }

    async update(id: number, user: UpdateUserDto) {
        const userOnBd = await this.get(id);
        userOnBd.name = user.name;
        userOnBd.lastname = user.lastname;
        userOnBd.type = user.type;
        return await this.userRepository.save(userOnBd);
    }

    async delete(id: number) {
        const result = await this.userRepository.delete({ id: id });
        if (result.affected === 0)
            throw new NotFoundException("Usuario no encontrado");
        return "DELETED";
    }
}
