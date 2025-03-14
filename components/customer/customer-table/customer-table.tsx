"use client";

import { Customer } from "@prisma/client";
import { columns } from "./column";
import { useModal } from "@/store/store";
import { DataTable } from "@/components/table/data-table";
import AdvancedDataTable from "@/components/advanced-inventory-table";

export const CustomerTable = ({ customers }: { customers: Customer[] }) => {
  const { onOpen } = useModal();

  const col = [
    "id",
    "customerName",
    "address",
    "gstIn",
    "state",
    "stateCode",
  ]
  return (
    <>
      {/* <DataTable columns={columns} data={customers as any || []} /> */}
      <AdvancedDataTable data={customers as any || []} columnNames={col} filename="customers_data" />
    </>
  )
};
