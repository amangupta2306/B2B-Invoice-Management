import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/db";
import { ProductTable } from "./product-table/product-table";
import { auth } from "@/auth";
import { ProductFormModal } from "./product-form-modal";

export const Product = async () => {
  const session = await auth();

  const dbproducts = await prisma.product.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{session?.user.companyName}</CardTitle>
        <CardDescription>Product List</CardDescription>
        <div>
          <ProductFormModal />
        </div>
      </CardHeader>
      <CardContent>
        <ProductTable products={dbproducts} />
      </CardContent>
    </Card>
  );
};
