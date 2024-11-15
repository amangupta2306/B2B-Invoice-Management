import { CustomerForm } from "./customer-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CustomerTable } from "./customer-table/customer-table";
import prisma from "@/lib/db";

export const Customer = async () => {
  const dbCustomers = await prisma.customer.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="lg:flex gap-3 lg:p-4">
      <Card className="lg:w-1/3">
        <CardHeader>
          <CardTitle>MUKESH TRADERS</CardTitle>
          <CardDescription>Create Customer</CardDescription>
        </CardHeader>
        <CardContent>
          <CustomerForm />
        </CardContent>
      </Card>
      <Card className="lg:w-2/3">
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
          <CardDescription>Customer Table</CardDescription>
        </CardHeader>
        <CardContent>
          <CustomerTable customers={dbCustomers} />
        </CardContent>
      </Card>
    </div>
  );
};
