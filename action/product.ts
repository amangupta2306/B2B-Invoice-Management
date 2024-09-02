"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

export const CreateProduct = async (values: any) => {
    try {
        const newProduct = await prisma.product.create({
            data: {
                productName: values.values.productName.toUpperCase(),
                hsnCode: Number(values.values.hsnCode),
                cgstRate: Number(values.values.cgstRate),
                sgstRate: Number(values.values.sgstRate),
            }
        })
        revalidatePath("/") 
        return newProduct
    } catch (error) {
        console.log(error)
    }
}   