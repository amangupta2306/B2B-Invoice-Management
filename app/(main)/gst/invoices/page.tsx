import prisma from "@/lib/db";
import { auth } from "@/auth";
import { InvoiceTable } from "@/components/gst/invoice/invoice-table/invoice-table";

export default async function InvoicesPage() {
  const session = await auth();
  
  const dbInvoices = await prisma.invoice.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      customer: true,
      pricedProducts: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const invoices = dbInvoices.map((invoice) => ({
    ...invoice,
    customerName: invoice.customer.customerName,
    address: invoice.customer.address,
    product: `${invoice.pricedProducts
      .map(
        (product) =>
          `${product.product.productName}: Qty: ${product.qty}, Rate: ${product.rate}`
      )
      .join(", ")}`,
  }));
  return <InvoiceTable invoices={invoices} />;
}
