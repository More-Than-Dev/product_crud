import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { category, product } from 'src/db/schema';

@Injectable()
export class ProductService {
  constructor(@Inject('DB') private db: NodePgDatabase) {}

  async AddProduct({ product_name, price, category_id }) {
    try {
      await this.db
        .insert(product)
        .values({ product_name, price, category_id });
      return { message: 'Product added successfully' };
    } catch (error) {
      console.error('Error in Add Product', error);
    }
  }
  async UpdateProduct({ product_name, price, category_id, product_id }) {
    try {
      await this.db
        .update(product)
        .set({ product_name, price, category_id })
        .where(eq(product.product_id, Number(product_id)));
      return { message: 'Product updated Successfully' };
    } catch (error) {
      console.error('Error in update product', error);
    }
  }
  async FetchProductById(product_id: string) {
    try {
      const result = await this.db
        .select({
            productId:product.product_id,
            productName:product.product_name,
            price:product.price,
            categoryId:product.category_id,
            categoryName:category.category_name
        })
        .from(product)
         .leftJoin(category, eq(category.category_id, product.category_id))
        .where(eq(product.product_id, Number(product_id)));
      return result[0];
    } catch (error) {
      console.error('Error in product fetch by id', error);
    }
  }

  async FetchAllProduct() {
    try {
      const result = await this.db
        .select({
          productName: product.product_name,
          productId: product.product_id,
          price: product.price,
          categoryName: category.category_name,
        })
        .from(product)
        .leftJoin(category, eq(category.category_id, product.category_id));
      return result;
    } catch (error) {
      console.error('Error in fetching all product', error);
    }
  }
}
