import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AddCategoryDto, UpdateCategoryDto } from './category.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categryService: CategoryService) { }
    @Post("add-category")
    addCategory(@Body() body:AddCategoryDto) {
        return this.categryService.AddCategory(body.category_name)
    }
    @Post("update-category")
    updateCategory(@Body() body:UpdateCategoryDto) {
        return this.categryService.UpdateCategory(body.category_id,body.category_name)
    }
    @Get("get-category-by-id/:categoryId")
    getCategoryById(@Param('categoryId') category_id:string) {
        return this.categryService.FetchCategoryById(category_id)
    }
    @Get("category-dropdown")
    getCategoryDropdown() {
        return this.categryService.FetchCategoryDropdown()
    }
}
