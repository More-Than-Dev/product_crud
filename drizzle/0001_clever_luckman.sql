CREATE TABLE "category" (
	"category_id" serial PRIMARY KEY NOT NULL,
	"category_name" varchar(30) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "product" (
	"product_id" serial PRIMARY KEY NOT NULL,
	"product_name" varchar(30) NOT NULL,
	"price" integer NOT NULL,
	"category_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_category_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("category_id") ON DELETE cascade ON UPDATE no action;