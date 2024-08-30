import prisma from "@/lib/db"
import { InvoiceForm } from "./invoice-form"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


export const Invoice = async () => {
    const customers = await prisma.customer.findMany()
    // const createCustomer = await prisma.customer.create({
    //     data: {
    //         customerName: "Rajesh",
    //         address: "Bangalore",
    //         gstIn: "29AABCU9602H1ZI",
    //         state: "Karnataka",
    //         stateCode: 7,
    //     }
    // })
    const products = await prisma.product.findMany()
    const invoices = await prisma.invoice.findFirst({
        orderBy: {
            createdAt: "desc"
        }
    })
    // const createProduct = await prisma.product.create({
    //     data: {
    //         productName: "TATA COPPER WATER BOX (250ML)",
    //         hsnCode: 22011010,
    //         cgstRate: 9,
    //         sgstRate: 9,
    //     }
    // })
    return (
        <div className="p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Create Invoice</CardTitle>
                    <CardDescription>Invoice </CardDescription>
                </CardHeader>
                <CardContent>
                    <InvoiceForm customers={customers || []} products={products || []} lastInvoiceNo={invoices?.invoiceNo || null} />
                </CardContent>
                {/* <CardFooter>
                    <p>Card Footer</p>
                </CardFooter> */}
            </Card>
        </div>
    )
}