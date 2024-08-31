import prisma from "@/lib/db";
import { InvoiceTable } from "@/components/invoice/invoice-table/invoice-table";

export default async function InvoicesPage() {
  const dbInvoices = await prisma.invoice.findMany({
    include: {
      customer: true,
      pricedProducts: {
        include: {
          product: true,
        },
      }
    },
  });

  const invoices = dbInvoices.map((invoice) => ({
    ...invoice,
    customerName: invoice.customer.customerName,
    address: invoice.customer.address,
    product: `${invoice.pricedProducts.map((product) => `${product.product.productName}: Qty: ${product.qty}, Rate: ${product.rate}`).join(", ")}`,
  }));
  return <InvoiceTable invoices={invoices} />;
}
