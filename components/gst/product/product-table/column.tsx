"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from "@prisma/client";
import { DeleteProduct } from "@/action/product";
import { useModal } from "@/store/store";
import { toast } from "sonner";

export const columns: ColumnDef<Product>[] = [
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
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("productName")}</div>
    ),
  },
  {
    accessorKey: "hsnCode",
    header: "HSN Code",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("hsnCode")}</div>
    ),
  },
  {
    accessorKey: "cgstRate",
    header: "CGST Rate",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("cgstRate")}</div>
    ),
  },
  {
    accessorKey: "sgstRate",
    header: "SGST Rate",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("sgstRate")}</div>
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
            <OpenEditingProductModal row={row.original} />
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                try {
                  await DeleteProduct(id);
                  toast("Product Deleted Successfully!");
                } catch (error) {
                  toast("Failed to Delete Product.");
                }
              }}
            >
              Delete Product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const OpenEditingProductModal = ({ row }: { row: any }) => {
  const { onOpen } = useModal();
  return (
    <DropdownMenuItem onClick={() => onOpen("product", { product: row })}>
      Edit Product
    </DropdownMenuItem>
  );
};
