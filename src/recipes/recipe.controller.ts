import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post
} from "@nestjs/common";
import { CreateRecipeDto } from "./dto/create-recipes.dto";
import { UpdateRecipeDto } from "./dto/update-recipe.dto";
import { RecipeService } from "./recipe.service";

@Controller("recipes")
export class RecipeController {
    constructor(private recipeService: RecipeService) {
    }

    @Get()
    getRecipes() {
        return this.recipeService.getAll();
    }

    @Get("/:id")
    getRecipe(@Param("id") id: number) {
        return this.recipeService.get(id);
    }

    @Post("create")
    createRecipe(@Body() recipe: CreateRecipeDto) {
        return this.recipeService.create(recipe);
    }

    @Patch("/:id/update")
    updateRecipe(@Param("id") id: number, @Body() recipe: UpdateRecipeDto) {
        return this.recipeService.update(id, recipe);
    }

    @Delete("/:id")
    delRecipe(@Param("id") id: number) {
        return this.recipeService.delete(id);
    }
}
