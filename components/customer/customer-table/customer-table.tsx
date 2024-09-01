"use client";

import { Customer } from "@prisma/client";
import { columns } from "./column";
import { DataTableCustomer } from "./data-table";

export const CustomerTable = ({ customers }: { customers: Customer[] }) => {
  return <DataTableCustomer data={customers || []} columns={columns} />;
};
