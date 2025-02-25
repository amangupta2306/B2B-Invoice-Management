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
