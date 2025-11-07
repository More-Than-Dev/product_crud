import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { AddProductDto, UpdateProductDto } from './product.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }
    @Post("add-product")
    addProduct(@Body() body: AddProductDto) {
        const input = {
            product_name: body.product_name,
            price: body.price,
            category_id: body.category_id
        }
        return this.productService.AddProduct(input)
    }
    @Post("update-product")
    updateProduct(@Body() body: UpdateProductDto) {
        const input = {
            product_id: body.product_id,
            product_name: body.product_name,
            price: body.price,
            category_id: body.category_id
        }
        return this.productService.UpdateProduct(input)
    }

    @Get("get-product-by-id/:productId")
    getProductById(@Param('productId') product_id: string) {
        console.log("prduct",product_id)
        return this.productService.FetchProductById(product_id)
    }

    @Post("get-all-products")
    getAllProduct() {
        return this.productService.FetchAllProduct();
    }
}
