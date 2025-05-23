"use client";

import { columns } from "./column";
import { Invoice } from "@prisma/client";
import { DataTableInvoice } from "./data-table";

export const InvoiceTable = ({ invoices }: { invoices: Invoice[] }) => {
  return (
    <div className="p-3 lg:px-8">
      <DataTableInvoice data={invoices || []} columns={columns} />
    </div>
  );
};
