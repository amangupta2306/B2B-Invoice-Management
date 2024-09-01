import { CustomerForm } from "./customer-form"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CustomerTable } from "./customer-table/customer-table"
import prisma from "@/lib/db";

export const Customer = async () => {
    const dbCustomers = await prisma.customer.findMany();
    return (
        <div className="flex gap-3 p-3">
            <Card className="w-1/3">
                <CardHeader>
                    <CardTitle>Create Customer</CardTitle>
                    <CardDescription>Customer</CardDescription>
                </CardHeader>
                <CardContent>
                    <CustomerForm />
                </CardContent>
            </Card>
            <Card className="w-2/3">
                <CardHeader>
                    <CardTitle>Customer List</CardTitle>
                    <CardDescription>Customer Table</CardDescription>
                </CardHeader>
                <CardContent>
                    <CustomerTable customers={dbCustomers}  />
                </CardContent>
            </Card>
        </div>

    )
}