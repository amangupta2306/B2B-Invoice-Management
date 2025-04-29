"use client";

import { LocalCustomer } from "@prisma/client";
import { useModal } from "@/store/store";
import AdvancedDataTable from "@/components/advanced-table";

export const LocalCustomerTable = ({
  customers,
}: {
  customers: LocalCustomer[];
}) => {
  const { onOpen } = useModal();

  const col = ["customerName", "address"];

  return (
    <>
      <AdvancedDataTable
        data={(customers as any) || []}
        columnNames={col}
        filename="customers_data"
        editModalType="editLocalCustomer"
        deleteModalType="deleteLocalCustomer"
      />
    </>
  );
};
