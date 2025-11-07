import { IsNotEmpty } from "class-validator";

export class AddProductDto  {
@IsNotEmpty({message:"Product Name is required"})
product_name:string;
@IsNotEmpty({message:"Price is required"})
price:number;
@IsNotEmpty({message:"Category Id is required"})
category_id:string;
}

export class UpdateProductDto  {
    @IsNotEmpty({message:"Product Id is required"})
    product_id:string;
@IsNotEmpty({message:"Product Name is required"})
product_name:string;
@IsNotEmpty({message:"Price is required"})
price:number;
@IsNotEmpty({message:"Category Id is required"})
category_id:string;
}