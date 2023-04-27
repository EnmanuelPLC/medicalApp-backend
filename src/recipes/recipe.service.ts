import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRecipeDto } from "./dto/create-recipes.dto";
import { UpdateRecipeDto } from "./dto/update-recipe.dto";
import { RecipeEntity } from "./recipe.entity";

@Injectable()
export class RecipeService {
    constructor(
        @InjectRepository(RecipeEntity)
        private recipeRepository: Repository<RecipeEntity>
    ) {
    }

    async create(recipe: CreateRecipeDto) {
        const created = this.recipeRepository.create({
            ...recipe,
            date: new Date(Date.now()).toLocaleString()
        });
        await this.recipeRepository.save(created);
        return { created: true };
    }

    async getAll() {
        return await this.recipeRepository.find();
    }

    async get(id: number) {
        const recipe = await this.recipeRepository.findOne({
            where: { id: id }
        });
        if (!recipe)
            throw new NotFoundException(`Recipe with ID: " ${id} " not found.`);
        return recipe;
    }

    async update(id: number, recipe: UpdateRecipeDto) {
        const recipeOnBd = await this.get(id);
        recipeOnBd.date = new Date(Date.now()).toLocaleString();
        recipeOnBd.medicine = recipe.medicine;
        recipeOnBd.useDescription = recipe.useDescription;
        await this.recipeRepository.save(recipeOnBd);
        return { edited: true };
    }

    async delete(id: number) {
        const result = await this.recipeRepository.delete({ id: id });
        if (result.affected === 0)
            throw new NotFoundException(`Recipe With ID "${id}" not found!`);
        return { deleted: true };
    }
}
