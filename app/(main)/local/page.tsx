import { LocalProductForm } from "@/components/local-productform";
import { MukeshLocalCustomerForm } from "@/components/mukesh-local-customerform";
import { MukeshLocalInvoiceForm } from "@/components/mukesh-local-invoiceform";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/db";

export default async function ProductPage() {
  const customers = await prisma.localCustomer.findMany();
  const products = await prisma.localProduct.findMany();
  return (
    <>
      <Card className="lg:w-1/3">
        <CardHeader>
          <CardTitle>MUKESH TRADERS</CardTitle>
          <CardDescription>Create Product</CardDescription>
        </CardHeader>
        <CardContent>
          <MukeshLocalInvoiceForm customers={customers} products={products} />
        </CardContent>
      </Card>
      <Card className="lg:w-1/3">
        <CardHeader>
          <CardTitle>MUKESH TRADERS</CardTitle>
          <CardDescription>Create Product</CardDescription>
        </CardHeader>
        <CardContent>
          <MukeshLocalCustomerForm />
        </CardContent>
      </Card>
      <Card className="lg:w-1/3">
        <CardHeader>
          <CardTitle>MUKESH TRADERS</CardTitle>
          <CardDescription>Create Product</CardDescription>
        </CardHeader>
        <CardContent>
          <LocalProductForm />
        </CardContent>
      </Card>
    </>
  );
}
