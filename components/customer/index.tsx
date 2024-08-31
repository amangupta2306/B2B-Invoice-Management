import { CustomerForm } from "./customer-form"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CustomerTable } from "./customer-table"
import prisma from "@/lib/db";

export const Customer = async () => {
    const dbCustomers = await prisma.customer.findMany();
    return (
        <div className="flex gap-3">
            <Card className="flex-1">
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <CustomerForm />

                </CardContent>
            </Card>
            <Card className="flex-1">
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <CustomerTable customers={dbCustomers}  />
                </CardContent>
            </Card>
        </div>

    )
}