import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/db";
import { auth } from "@/auth";
import { LocalCustomerFormModal } from "./local-customer-form-modal";
import { LocalCustomerTable } from "./local-customer-table/local-customer-table";

export const LocalCustomer = async () => {
  const session = await auth();

  const dbCustomers = await prisma.localCustomer.findMany({
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
          <CardDescription>Local Customer List</CardDescription>
          <div>
            <LocalCustomerFormModal />
          </div>
        </CardHeader>
        <CardContent>
          <LocalCustomerTable customers={dbCustomers} />
        </CardContent>
      </Card>
    </>
  );
};
