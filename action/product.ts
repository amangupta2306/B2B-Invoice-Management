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
    return newLocalProduct;
  } catch (error) {
    console.log(error);
  }
};
