"use client"

import { columns } from "./column"
import { DataTable } from "./data-table"
import { Invoice } from "@prisma/client"

export const InvoiceTable = ({ invoices }: { invoices: Invoice[] }) => {
  return (
    <div className="container mx-auto py-10">
      <DataTable data={invoices || []} columns={columns} />
    </div>
  )
}
