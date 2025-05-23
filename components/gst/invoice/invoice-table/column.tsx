"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Invoice } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import HoverCardToolTip from "@/components/hover-card-tooltip";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<Invoice>[] = [
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
    accessorKey: "invoiceNo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Invoice No
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const id = row.original.id;
      return <Link href={`/gst/invoices/${id}`}>{row.getValue("invoiceNo")}</Link>;
    },
  },
  {
    accessorKey: "invoiceDate",
    header: "Invoice Date",
    cell: ({ row }) => (
      <div className="lowercase">
        {format(row.getValue("invoiceDate"), "dd-MM-yyyy")}
      </div>
    ),
  },
  {
    header: "Month",
    accessorKey: "monthOf",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("monthOf")}</div>

    ),
  },
  {
    header: "Customer Name",
    accessorKey: "customerName",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("customerName")}</div>
    ),
  },
  {
    header: "Address",
    accessorKey: "address",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("address")}</div>
    ),
  },
  {
    header: "Product",
    accessorKey: "product",
    cell: ({ row }) => (
      <HoverCardToolTip
        side="top"
        label="Product"
        align="center"
        className="min-w-max"
      >
        <div className="capitalize">{row.getValue("product")}</div>
      </HoverCardToolTip>
    ),
  },
  {
    accessorKey: "totalTaxableValue",
    header: "Total Taxable Value",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("totalTaxableValue")}</div>
    ),
  },
  {
    accessorKey: "totalTaxGST",
    header: "Total Tax",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("totalTaxGST")}</div>
    ),
  },
  {
    accessorKey: "totalInvoiceValue",
    header: () => <div className="text-right">Total Invoice Value</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalInvoiceValue"));

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
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
            <Link href={`/gst/invoices/${id}/edit`}>
              <DropdownMenuItem>Edit Invoice</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Link href={`/invoices/${id}`}>
              <DropdownMenuItem>Preview Invoice</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <PrintInvoive invoiceId={id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const PrintInvoive = ({ invoiceId }: { invoiceId: string }) => {
  const router = useRouter();

  const handlePrint = () => {
    router.push(`/gst/invoices/${invoiceId}?print=true`);
  };

  return (
    <DropdownMenuItem onClick={handlePrint}>
      Print & Preview Invoice
    </DropdownMenuItem>
  );
};
