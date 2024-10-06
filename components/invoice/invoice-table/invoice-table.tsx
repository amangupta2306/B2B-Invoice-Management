"use client";

import { columns } from "./column";
import { Invoice } from "@prisma/client";
import { DataTableInvoice } from "./data-table";
import Link from "next/link";
import { Plus } from "lucide-react";

export const InvoiceTable = ({ invoices }: { invoices: Invoice[] }) => {
  return (
    <div className="p-3 lg:px-8">
      <div className="fixed bottom-20 lg:bottom-7 lg:right-7 right-8 z-50 w-14 h-14 rounded-full bg-primary hover:bg-blue-800" 
      >
        <Link
          href="/"
          className="flex items-center justify-center h-full w-full"
        >
          <Plus className="h-7 w-7" />
        </Link>
      </div>

      <DataTableInvoice data={invoices || []} columns={columns} />
    </div>
  );
};
