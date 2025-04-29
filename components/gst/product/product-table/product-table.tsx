"use client";

import { Product } from "@prisma/client";
import { useModal } from "@/store/store";
import AdvancedDataTable from "@/components/advanced-table";

export const ProductTable = ({ products }: { products: Product[] }) => {
  const { onOpen } = useModal();

  const col = ["productName", "hsnCode", "cgstRate", "sgstRate"];

  return (
    <>
      <AdvancedDataTable
        data={(products as any) || []}
        columnNames={col}
        filename="customers_data"
        editModalType="editProduct"
        deleteModalType="deleteProduct"
      />
    </>
  );
};
