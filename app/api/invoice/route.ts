import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {

    try {
        const body: any = await request.json();
        const invoice = await prisma.invoice.create({
            data: {
                invoiceNo: body.values.invoiceNo || 1,
                invoiceDate: body.values.invoiceDate,
                monthOf: body.values.monthOf,
                customerId: body.values.customerId,
                totalInvoiceValue: body.values.totalInvoiceValue,
                totalTaxGST: body.values.totalTaxGST,
                totalTaxableValue: body.values.totalTaxableValue,
                pricedProducts: {
                    create: body.productPrices.map((product: any) => {
                        return {
                            productId: product.id,
                            qty: Number(product.qty),
                            taxableValue: Number(product.taxableValue),
                            cgstAmt: Number(product.cgstAmt),
                            sgstAmt: Number(product.sgstAmt),
                            productTotalValue: Number(product.productTotalValue),
                            rate: Number(product.rate)
                        }
                    })
                }
            }
        })

        return Response.json(invoice);
    } catch (error: any) {
        console.log(error, 'error');
        return Response.json({ error: error.message });
    }
}