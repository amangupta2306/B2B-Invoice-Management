import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CustomerTable } from "./customer-table/customer-table";
import prisma from "@/lib/db";
import { auth } from "@/auth";
import { CustomerFormModal } from "./customer-form-modal";

export const Customer = async () => {
  const session = await auth();

  const dbCustomers = await prisma.customer.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{session?.user.companyName}</CardTitle>
          <CardDescription>Customer List</CardDescription>
          <div>
            <CustomerFormModal />
          </div>
        </CardHeader>
        <CardContent>
          <CustomerTable customers={dbCustomers} />
        </CardContent>
      </Card>
    </>
  );
};
