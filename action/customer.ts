"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

export const CreateCustomer = async (values: any) => {
    try {
        const newCustomer = await prisma.customer.create({
            data: {
                customerName: values.values.customerName.toUpperCase(),
                address: values.values.address.toUpperCase(),
                gstIn: values.values.gstIn.toUpperCase(),
                state: values.values.state,
                stateCode: Number(values.values.stateCode)
            }
        })
        revalidatePath("/")
        revalidatePath("/customers")
        return newCustomer
    } catch (error) {
        console.log(error)
    }
}