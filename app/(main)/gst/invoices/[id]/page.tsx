import { auth } from "@/auth";
import { InvoiceTemplate } from "@/components/gst/invoice/invoice-template";
import prisma from "@/lib/db";

export default async function InvoicesPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  const invoiceInfo = await prisma.invoice.findUnique({
    where: {
      id: params.id,
    },
    include: {
      customer: true,
      pricedProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  const companyInfo = await prisma.users.findUnique({
    where: {
      id: session?.user?.id,
    },
  });

  return (
    <InvoiceTemplate invoiceInfo={invoiceInfo} companyInfo={companyInfo} />
  );
}
