import prisma from "@/lib/db";
import { InvoiceForm } from "./invoice-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/auth";

export const Invoice = async () => {
  const session = await auth();

  // const googleUserId = session?.user?.id || "";
  // const objectId = googleUserId.replace(/-/g, "").slice(0, 24);
  // console.log(objectId, "objectId");

  const customers = await prisma.customer.findMany();
  const products = await prisma.product.findMany();
  const invoices = await prisma.invoice.findFirst({
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
          <CardTitle>MUKESH TRADERS</CardTitle>
          <CardDescription>Create Invoice</CardDescription>
        </CardHeader>
        <CardContent className="px-3 lg:px-6">
          <InvoiceForm
            isEdit={false}
            customers={customers || []}
            products={products || []}
            lastInvoiceNo={invoices?.invoiceNo || ""}
            lastInvoiceDate={invoices?.invoiceDate || new Date()}
          />
        </CardContent>
      </Card>
    </div>
  );
};
