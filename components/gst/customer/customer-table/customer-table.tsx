"use client";

import { Customer } from "@prisma/client";
import { useModal } from "@/store/store";
import AdvancedDataTable from "@/components/advanced-table";

export const CustomerTable = ({ customers }: { customers: Customer[] }) => {
  const { onOpen } = useModal();

  const col = ["customerName", "address", "gstIn", "state", "stateCode"];
  return (
    <>
      <AdvancedDataTable
        data={(customers as any) || []}
        columnNames={col}
        filename="customers_data"
        editModalType="editCustomer"
        deleteModalType="deleteCustomer"
      />
    </>
  );
};
