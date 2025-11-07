import {  IsNotEmpty } from 'class-validator';

export class AddCategoryDto {
    @IsNotEmpty({ message: 'Category Name is required' })
    category_name: string;
}

export class UpdateCategoryDto {
    @IsNotEmpty({message:"Category Id is required"})
    category_id: string;
    
    @IsNotEmpty({ message: 'Category Name is required' })
    category_name: string;
}