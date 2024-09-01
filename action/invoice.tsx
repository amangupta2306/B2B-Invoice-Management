"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

export const CreateInvoice = async (values: any): Promise<boolean> => {
  try {
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNo: values.values.invoiceNo || 1,
        invoiceDate: values.values.invoiceDate,
        monthOf: values.values.monthOf,
        yearOf: values.values.yearOf,
        customerId: values.values.customerId,
        totalInvoiceValue: values.values.totalInvoiceValue.toFixed(2),
        totalTaxGST: values.values.totalTaxGST.toFixed(2),
        totalTaxableValue: values.values.totalTaxableValue.toFixed(2),
        isOutsideDelhiInvoice: values.isOutsideDelhiInvoice,
        pricedProducts: {
          create: values.productPrices.map((product: any) => {
            return {
              productId: product.id,
              qty: Number(product.qty),
              taxableValue: Number(product.taxableValue).toFixed(2),
              cgstAmt: Number(product.cgstAmt).toFixed(2),
              sgstAmt: Number(product.sgstAmt).toFixed(2),
              productTotalValue: Number(product.productTotalValue).toFixed(2),
              rate: Number(product.rate)
            }
          })
        }
      }
    })
    revalidatePath("/")
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}   