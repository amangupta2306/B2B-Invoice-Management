import * as React from "react";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Customer } from "@prisma/client";
import { DeleteCustomer, EditCustomer } from "@/action/customer";
import { toast } from "@/components/ui/use-toast";
import { useModal } from "@/store/store";
import { CustomerModel } from "@/components/model/customer-model";

const handleEditCustomer = async (id: string, row: Customer) => {
  // console.log(row, "row");

  //urlprams
  // push to customer form//
  try {
    await EditCustomer(id, row);
  } catch (error) {
    console.log(error);
  }
};

export const columns: ColumnDef<Customer>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("customerName")}</div>,
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("address")}</div>
    ),
  },
  {
    accessorKey: "gstIn",
    header: "GSTIN/UIN",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("gstIn")}</div>
    ),
  },
  {
    accessorKey: "state",
    header: "State",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("state")}</div>
    ),
  },
  {
    accessorKey: "stateCode",
    header: "State Code",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("stateCode")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <OpenEditingCustomerModal rowData={row.original} />
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                try {
                  await DeleteCustomer(id);
                  toast({
                    description: "Customer Deleted Successfully!",
                  });
                } catch (error) {
                  toast({
                    description: "Failed to Delete Customer.",
                  });
                }
              }}
            >
              Delete Customer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const OpenEditingCustomerModal = ({ rowData }: { rowData: any }) => {
  const { onOpen } = useModal();
  return (
    // <CustomerModel/>
    <DropdownMenuItem
      // onClick={() => handleEditCustomer(id, row.original)}
      onClick={() => onOpen("customer", rowData)}
    >
      Edit Customer
    </DropdownMenuItem>
  );
};
