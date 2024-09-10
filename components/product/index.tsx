import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/db";
import { ProductForm } from "./product-form";
import { ProductTable } from "./product-table/product-table";

export const Product = async () => {
  const dbproducts = await prisma.product.findMany();
  return (
    <div className="lg:flex gap-3 lg:p-2">
      <Card className="lg:w-1/3">
        <CardHeader>
          <CardTitle>Create Product</CardTitle>
          <CardDescription>Product</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductForm />
        </CardContent>
      </Card>
      <Card className="lg:w-2/3">
        <CardHeader>
          <CardTitle>Product List</CardTitle>
          <CardDescription>Product Table</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductTable products={dbproducts} />
        </CardContent>
      </Card>
    </div>
  );
};
