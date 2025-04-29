"use client";

import { LocalProduct } from "@prisma/client";
import { useModal } from "@/store/store";
import AdvancedDataTable from "@/components/advanced-table";

export const LocalProductTable = ({
  products,
}: {
  products: LocalProduct[];
}) => {
  const { onOpen } = useModal();

  const col = ["productName"];

  return (
    <>
      <AdvancedDataTable
        data={(products as any) || []}
        columnNames={col}
        filename="customers_data"
        editModalType="editLocalProduct"
        deleteModalType="deleteLocalProduct"
      />
    </>
  );
};
