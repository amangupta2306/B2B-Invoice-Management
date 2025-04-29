import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/db";
import { auth } from "@/auth";
import { LocalProductFormModal } from "./local-product-form-modal";
import { LocalProductTable } from "./local-product-table/local-product-table";

export const LocalProduct = async () => {
  const session = await auth();
  
  const dbproducts = await prisma.localProduct.findMany({
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
        <CardDescription>Local Product List</CardDescription>
        <div>
          <LocalProductFormModal />
        </div>
      </CardHeader>
      <CardContent>
        <LocalProductTable products={dbproducts} />
      </CardContent>
    </Card>
  );
};
