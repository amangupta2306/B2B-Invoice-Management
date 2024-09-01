"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

export const CreateCustomer = async (values: any) => {
    try {
        const newCustomer = await prisma.customer.create({
            data: {
                customerName: values.values.customerName,
                address: values.values.address,
                state: values.values.state,
                gstIn: values.values.gstIn,
                stateCode: Number(values.values.stateCode)
            }
        })
        revalidatePath("/")
        return newCustomer
    } catch (error) {
        console.log(error)
    }
}