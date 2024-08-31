"use client"

import { Customer } from "@prisma/client"
import { columns } from "./column"
import { DataTable } from "./data-table"

export const CustomerTable = ({ customers }: { customers: Customer[] }) => {
  return (
    <div className="container mx-auto py-10">
      <DataTable data={customers || []} columns={columns} />
    </div>
  )
}
