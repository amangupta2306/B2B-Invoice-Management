import prisma from "@/lib/db";
import { Invoice } from "@prisma/client";

type LineChartData = {
  invoice: Invoice[];
};



export const LineChartData = async () => {
  const invoices = await prisma.invoice.findMany();


  return invoices;
};
