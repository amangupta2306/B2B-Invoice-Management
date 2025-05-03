"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const CreateInvoice = async (
  values: any,
  userId: string
): Promise<boolean> => {
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
              rate: Number(product.rate),
            };
          }),
        },
        userId: userId,
      },
    });
    revalidatePath("/dashboard");
    revalidatePath("/gst/create-invoice");
    revalidatePath("/gst/invoices");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const UpdateInvoice = async (values: any): Promise<boolean> => {
  try {
    const invoice = await prisma.invoice.update({
      where: {
        id: values.id,
      },
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
          deleteMany: {},
          create: values.productPrices.map((product: any) => {
            return {
              productId: product.id,
              qty: Number(product.qty),
              taxableValue: product.taxableValue.toString(),
              cgstAmt: product.cgstAmt.toString(),
              sgstAmt: product.sgstAmt.toString(),
              productTotalValue: product.productTotalValue.toString(),
              rate: Number(product.rate),
            };
          }),
        },
      },
    });
    revalidatePath("/dashboard");
    revalidatePath("/gst/create-invoice");
    revalidatePath("/gst/invoices");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const CreateLocalInvoice = async (values: any, userId: string) => {
  try {
    const newLocalInvoice = await prisma.localInvoice.create({
      data: {
        localInvoiceNo: values.values.localInvoiceNo || 1,
        localInvoiceDate: values.values.localInvoiceDate,
        customerId: values.values.customerId,
        localTotalInvoiceValue: values.values.totalInvoiceValue.toString(),
        pricedProduct: {
          create: values.productPrices.map((product: any) => {
            return {
              productId: product.id,
              qty: Number(product.qty),
              rate: Number(product.rate),
              productTotalValue: product.productTotalValue.toString(),
            };
          }),
        },
        userId: userId,
      },
    });
    revalidatePath("/dashboard");
    revalidatePath("/local/create-invoice");
    revalidatePath("/local/invoices");
    return true;
  } catch (error) {
    console.log(error);
  }
};

export const updateLocalInvoice = async (id: string, values: any) => {
  try {
    const editLocalInvoice = await prisma.localInvoice.update({
      where: {
        id,
      },
      data: {
        localInvoiceNo: values.localInvoiceNo,
      },
    });
    revalidatePath("/dashboard");
    revalidatePath("/local/create-invoice");
    revalidatePath("/local/invoices");
    return editLocalInvoice;
  } catch (error) {
    console.log(error);
  }
};
