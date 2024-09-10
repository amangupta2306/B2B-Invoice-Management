import prisma from "@/lib/db";
import { InvoiceForm } from "./invoice-form";

import {
  Card,
  CardContent,
  CardDescription,
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
    <div className="lg:p-4">
      <Card>
        <CardHeader className="px-5 lg:px-6">
          <CardTitle>Create Invoice</CardTitle>
          <CardDescription>Invoice </CardDescription>
        </CardHeader>
        <CardContent className="px-3 lg:px-6">
          <InvoiceForm
            customers={customers || []}
            products={products || []}
            lastInvoiceNo={invoices?.invoiceNo || null}
            lastInvoiceDate={invoices?.invoiceDate || null}
          />
        </CardContent>
      </Card>
    </div>
  );
};
