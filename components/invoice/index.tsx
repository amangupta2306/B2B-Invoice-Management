import prisma from "@/lib/db";
import { InvoiceForm } from "./invoice-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Invoice = async () => {
  const customers = await prisma.customer.findMany();
  const products = await prisma.product.findMany();
  const invoices = await prisma.invoice.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Create Invoice</CardTitle>
          <CardDescription>Invoice </CardDescription>
        </CardHeader>
        <CardContent>
          <InvoiceForm
            customers={customers || []}
            products={products || []}
            lastInvoiceNo={invoices?.invoiceNo || null}
          />
        </CardContent>
        {/* <CardFooter>
                    <p>Card Footer</p>
                </CardFooter> */}
      </Card>
    </div>
  );
};
