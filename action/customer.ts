"use server";

import prisma from "@/lib/db";
import { LocalCustomer } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const CreateCustomer = async (values: any, userId: string) => {
  try {
    const newCustomer = await prisma.customer.create({
      data: {
        customerName: values.values.customerName.toUpperCase(),
        address: values.values.address.toUpperCase(),
        gstIn: values.values.gstIn.toUpperCase(),
        state: values.values.state,
        stateCode: Number(values.values.stateCode),
        userId: userId,
      },
    });
    revalidatePath("/");
    revalidatePath("/customers");
    return newCustomer;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteCustomer = async (id: string) => {
  try {
    const delCustomer = await prisma.customer.delete({
      where: { id },
    });
    revalidatePath("/");
    revalidatePath("/customers");
    return delCustomer;
  } catch (error) {
    console.log(error);
  }
};

export const EditCustomer = async (id: string, values: any) => {
  try {
    const editCustomer = await prisma.customer.update({
      where: { id },
      data: {
        customerName: values.customerName?.toUpperCase(),
        address: values.address?.toUpperCase(),
        gstIn: values.gstIn?.toUpperCase(),
        state: values.state,
        stateCode: values.stateCode ? Number(values.stateCode) : undefined,
      },
    });

    revalidatePath("/");
    revalidatePath("/customers");
    return editCustomer;
  } catch (error) {
    console.log(error);
  }
};

export const CreateLocalCustomer = async (values: LocalCustomer) => {
  try {
    const newLocalCustomer = await prisma.localCustomer.create({
      data: {
        customerName: values.customerName.toUpperCase(),
        address: values.address.toUpperCase(),
      },
    });
    revalidatePath("/");
    revalidatePath("/customers");
    return newLocalCustomer;
  } catch (error) {
    console.log(error);
  }
};
