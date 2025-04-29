"use server";

import prisma from "@/lib/db";
import { LocalProduct } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const CreateProduct = async (values: any, userId: string) => {
  try {
    const newProduct = await prisma.product.create({
      data: {
        productName: values.values.productName.toUpperCase(),
        hsnCode: Number(values.values.hsnCode),
        cgstRate: Number(values.values.cgstRate),
        sgstRate: Number(values.values.sgstRate),
        userId: userId || "",
      },
    });
    revalidatePath("/");
    revalidatePath("/products");
    return newProduct;
  } catch (error) {
    console.log(error);
  }
};

export const UpdateProduct = async (id: string, values: any) => {
  try {
    const editProduct = await prisma.product.update({
      where: { id },
      data: {
        productName: values.productName?.toUpperCase(),
        hsnCode: values.hsnCode ? Number(values.hsnCode) : undefined,
        cgstRate: values.cgstRate ? Number(values.cgstRate) : undefined,
        sgstRate: values.sgstRate ? Number(values.sgstRate) : undefined,
      },
    });
    revalidatePath("/products");
    return editProduct;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteProduct = async (id: string) => {
  try {
    const delProduct = await prisma.product.delete({
      where: { id },
    });
    revalidatePath("/");
    revalidatePath("/products");
    return delProduct;
  } catch (error) {
    console.log(error);
  }
};

export const CreateLocalProduct = async (
  values: LocalProduct,
  userId: string
) => {
  try {
    const newLocalProduct = await prisma.localProduct.create({
      data: {
        productName: values.productName,
        userId: userId || "",
      },
    });
    revalidatePath("/");
    revalidatePath("/local/create-invoice");
    revalidatePath("/local/products");
    return newLocalProduct;
  } catch (error) {
    console.log(error);
  }
};
export const UpdateLocalProduct = async (
  values: LocalProduct,
  userId: string,
  id: string
) => {
  try {
    const editLocalProduct = await prisma.localProduct.update({
      where: { id },
      data: {
        productName: values.productName,
        userId: userId || "",
      },
    });
    revalidatePath("/");
    revalidatePath("/local/create-invoice");
    revalidatePath("/local/products");
    return editLocalProduct;
  } catch (error) {
    console.log(error);
  }
};
export const DeleteLocalProduct = async (id: string) => {
  try {
    const delLocalProduct = await prisma.localProduct.delete({
      where: { id },
    });
    revalidatePath("/");
    revalidatePath("/local/create-invoice");
    revalidatePath("/local/products");
    return delLocalProduct;
  } catch (error) {
    console.log(error);
  }
};
