"use client";

import { columns } from "./column";
import { Invoice } from "@prisma/client";
import { DataTableInvoice } from "./data-table";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const InvoiceTable = ({ invoices }: { invoices: Invoice[] }) => {
  return (
    <div className="p-3 lg:p-10">
      <Link
        href="/"
        className={buttonVariants({
          variant: "default",
        })}
      >
        Create Invoice
      </Link>
      <DataTableInvoice data={invoices || []} columns={columns} />
    </div>
  );
};
