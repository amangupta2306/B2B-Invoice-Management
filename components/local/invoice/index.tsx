import prisma from "@/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LocalInvoiceForm } from "./local-invoice-form";
import { auth } from "@/auth";

export const LocalInvoice = async () => {
  const session = await auth();
  const customers = await prisma.localCustomer.findMany({
    where: {
      userId: session?.user?.id,
    },
  });
  const products = await prisma.localProduct.findMany({
    where: {
      userId: session?.user?.id,
    },
  });
  const invoices = await prisma.localInvoice.findFirst({
    where: {
      userId: session?.user?.id || "",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="lg:p-4">
      <Card className="border-2 shadow-lg">
        <CardHeader className="px-5 lg:px-6">
          <CardTitle>{session?.user.companyName}</CardTitle>
          <CardDescription>Create Local Invoice</CardDescription>
        </CardHeader>
        <CardContent className="px-3 lg:px-6">
          <LocalInvoiceForm
            customers={customers}
            products={products}
            lastInvoiceNo={invoices?.invoiceNo || ""}
            
          />
        </CardContent>
      </Card>
    </div>
  );
};
