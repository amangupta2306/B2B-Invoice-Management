"use client";

import AdvancedDataTable from "@/components/advanced-table";
import { useModal } from "@/store/store";
import { LocalInvoice } from "@prisma/client";

export const LocalInvoiceTable = ({
  invoices,
}: {
  invoices: LocalInvoice[];
}) => {
  const { onOpen } = useModal();

  const col = ["invoiceNo", "customerName", "address", "totalInvoiceValue"];
  return (
    <div className="p-3 lg:px-8">
      <AdvancedDataTable
        data={(invoices as any) || []}
        columnNames={col}
        filename="customers_data"
        editModalType="editLocalInvoice"
      />
    </div>
  );
};
