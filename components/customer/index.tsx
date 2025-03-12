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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { auth } from "@/auth";

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
      {/* <div className="lg:flex gap-3 lg:p-4"> */}
      {/* <Card className="lg:w-1/3">
        <CardHeader>
          <CardTitle>MUKESH TRADERS</CardTitle>
          <CardDescription>Create Customer</CardDescription>
        </CardHeader>
        <CardContent>
          <CustomerForm />
          </CardContent>
          </Card> */}
      <Card>
        <CardHeader>
          <CardTitle>MUKESH TRADERS</CardTitle>
          <CardDescription>Customer List</CardDescription>
          <div>
            <Dialog>
              <DialogTrigger>Create Customer</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>MUKESH TRADERS</DialogTitle>
                  <DialogDescription>Create Customer</DialogDescription>
                </DialogHeader>
                <CustomerForm />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <CustomerTable customers={dbCustomers} />
        </CardContent>
      </Card>
      {/* </div> */}
    </>
  );
};
