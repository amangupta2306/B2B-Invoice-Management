"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const CreateInvoice = async (values: any): Promise<boolean> => {
  try {
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNo: values.values.invoiceNo || 1,
        invoiceDate: values.values.invoiceDate,
        monthOf: values.values.monthOf,
        yearOf: values.values.yearOf,
        customerId: values.values.customerId,
        totalInvoiceValue: values.values.totalInvoiceValue.toString(),
        totalTaxGST: values.values.totalTaxGST.toString(),
        totalTaxableValue: values.values.totalTaxableValue.toString(),
        isOutsideDelhiInvoice: values.isOutsideDelhiInvoice,
        pricedProducts: {
          create: values.productPrices.map((product: any) => {
            return {
              productId: product.id,
              qty: Number(product.qty),
              taxableValue: product.taxableValue.toString(),
              cgstAmt: product.cgstAmt.toString(),
              sgstAmt: product.sgstAmt.toString(),
              productTotalValue: product.productTotalValue.toString(),
              rate: Number(product.rate)
            }
          })
        }
      }
    })
    revalidatePath("/")
    revalidatePath("/invoices")
    return true
  } catch (error) {
    console.log(error);
    return false;
  }
};
