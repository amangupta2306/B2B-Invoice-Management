"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

/*
{
  values: {
    invoiceNo: '1',
    invoiceDate: 2024-08-30T14:39:22.400Z,
    monthOf: 'August',
    customerId: '66d1cffd4b231c29046c37a8',
    totalInvoiceValue: 61.9,
    totalTaxGST: 6.9,
    totalTaxableValue: 55
  },
  productPrices: [
    {
      label: 'TATA COPPER WATER BOX (250ML)',
      value: '66d1ad45b35ee8942281c51a',
      id: '66d1ad45b35ee8942281c51a',
      productName: 'TATA COPPER WATER BOX (250ML)',
      hsnCode: 22011010,
      cgstRate: 9,
      sgstRate: 9,
      createdAt: '2024-08-30T11:30:13.493Z',
      updatedAt: '2024-08-30T11:30:13.493Z',
      qty: '1',
      taxableValue: 5,
      cgstAmt: 0.45,
      sgstAmt: 0.45,
      productTotalValue: 5.9,
      rate: '5'
    },
    {
      label: 'AQUAFINA WATER JAR (20 LTR)',
      value: '66d1acafb35ee8942281c519',
      id: '66d1acafb35ee8942281c519',
      productName: 'AQUAFINA WATER JAR (20 LTR)',
      hsnCode: 22011010,
      cgstRate: 6,
      sgstRate: 6,
      createdAt: '2024-08-30T11:27:43.890Z',
      updatedAt: '2024-08-30T11:27:43.890Z',
      qty: '10',
      taxableValue: 50,
      cgstAmt: 3,
      sgstAmt: 3,
      productTotalValue: 56,
      rate: '5'
    }
  ]
} */
export const CreateInvoice = async (values: any) => {
    try {
        const invoice = await prisma.invoice.create({
            data: {
                invoiceNo: values.invoiceNo || 1,
                invoiceDate: values.invoiceDate,
                monthOf: values.monthOf,
                customerId: values.customerId,
                totalInvoiceValue: values.totalInvoiceValue,
                totalTaxGST: values.totalTaxGST,
                totalTaxableValue: values.totalTaxableValue,
                pricedProducts: {
                    create: values.productPrices.map((product: any) => {
                        return {
                            productId: product.id,
                            qty: product.qty,
                            taxableValue: product.taxableValue,
                            cgstAmt: product.cgstAmt,
                            sgstAmt: product.sgstAmt,
                            productTotalValue: product.productTotalValue,
                            rate: product.rate
                        }
                    })
                }
            }
        })
        console.log(invoice)
        revalidatePath("/")

    } catch (error) {
        console.log(error)    
    }   
}   