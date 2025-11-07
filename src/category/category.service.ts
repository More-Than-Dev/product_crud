import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { category } from 'src/db/schema';

@Injectable()
export class CategoryService {
    constructor(@Inject('DB') private db: NodePgDatabase) { }

    async AddCategory(category_name: string) {
        try {
            await this.db.insert(category).values({ category_name });
            return { message: "Category created Successfully" };
        } catch (error) {
            console.error("error in add category", error)
        }
    }

    async UpdateCategory(category_id: string, category_name: string) {
        try {
            await this.db.update(category).set({ category_name }).where(eq(category.category_id, Number(category_id)))
            return { message: "Category updated Successfully" }
        } catch (error) {
            console.error("Error in category update", error)
        }
    }
    async FetchCategoryById(category_id: string) {
        try {
            const result = await this.db.select().from(category).where(eq(category.category_id, Number(category_id)))
            return result[0];
        } catch (error) { console.error("Error in category fetch by id", error) }
    }
    async FetchCategoryDropdown() {
        try {
            const result = await this.db.select({ categoryId: category.category_id, categoryName: category.category_name }).from(category)
            return result;
        } catch (error) {
            console.error("Error in category dropdown")
        }
    }
}
