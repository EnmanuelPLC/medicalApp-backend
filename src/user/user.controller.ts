import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getRecipes() {
    return this.userService.getAll();
  }

  @Get('/:id')
  getRecipe(@Param('id') id: number) {
    return this.userService.get(id);
  }

  @Post('create')
  createRecipe(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Patch('/:id/update')
  updateRecipe(@Param('id') id: number, @Body() user: UpdateUserDto) {
    return this.userService.update(id, user);
  }

  @Delete('/:id')
  delRecipe(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
