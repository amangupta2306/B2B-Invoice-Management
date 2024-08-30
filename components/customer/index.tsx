import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CustomerForm } from "./customer-form"

export const Customer = ()=>{
    return(
        <div className="p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Create Customer</CardTitle>
                    <CardDescription>Customer</CardDescription>
                </CardHeader>
                <CardContent>
                    <CustomerForm
                    //  customers={customers || []} products={products || []} lastInvoiceNo={invoices?.invoiceNo || null}
                    />
                </CardContent>
                {/* <CardFooter>
                    <p>Card Footer</p>
                </CardFooter> */}
            </Card>
        </div>
    )
}