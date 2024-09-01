import { InvoiceTemplate } from "@/components/invoice/invoice-template";
import prisma from "@/lib/db";

export default async function InvoicesPage({ params }: { params: { id: string } }) {

    const invoiceInfo = await prisma.invoice.findUnique({
        where: {
            id: params.id
        },
        include: {
            customer: true,
            pricedProducts: {
                include: {
                    product: true
                }
            }
        }
    })

    return (
        <InvoiceTemplate invoiceInfo={invoiceInfo} />
    )
}

