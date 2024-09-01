"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

export const CreateInvoice = async (values: any) => {
  try {
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNo: values.values.invoiceNo || 1,
        invoiceDate: values.values.invoiceDate,
        monthOf: values.values.monthOf,
        customerId: values.values.customerId,
        totalInvoiceValue: values.values.totalInvoiceValue,
        totalTaxGST: values.values.totalTaxGST,
        totalTaxableValue: values.values.totalTaxableValue,
        isOutsideDelhiInvoice: values.isOutsideDelhiInvoice,
        pricedProducts: {
          create: values.productPrices.map((product: any) => {
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
    revalidatePath("/")

    return invoice
    
  } catch (error) {
    console.log(error)
  }
}   