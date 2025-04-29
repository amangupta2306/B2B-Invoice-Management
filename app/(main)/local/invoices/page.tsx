import prisma from "@/lib/db";
import { auth } from "@/auth";
import { LocalInvoiceTable } from "@/components/local/invoice/invoice-table/invoice-table";

export default async function InvoicesPage() {
  const session = await auth();
  const dbInvoices = await prisma.localInvoice.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      customer: true,

      pricedProduct: {
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
    product: `${invoice.pricedProduct
      .map(
        (product) =>
          `${product.product.productName}: Qty: ${product.qty}, Rate: ${product.rate}`
      )
      .join(", ")}`,
  }));
  return <LocalInvoiceTable invoices={invoices} />;
}
