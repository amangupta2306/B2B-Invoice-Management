"use server"
import prisma from "@/lib/db";

export const getCustoemrs = async (userId: any) => {
    try {
     return await prisma.localCustomer.findMany({
       where: {
         userId: userId,
       },
     });
    } catch (error) {
     console.log(error, "[getCustoemrs]");
    }
   };
   export const getProducts = async (session: any) => {
     return await prisma.localProduct.findMany({
       where: {
         userId: session?.user?.id,
       },
     });
   };
   