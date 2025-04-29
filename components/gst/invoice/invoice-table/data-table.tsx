"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CalendarIcon, ChevronDown, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { endOfDay, format, startOfDay, subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import CsvDownloader from "react-csv-downloader";

export function DataTableInvoice({
  data,
  columns,
}: {
  data: any[];
  columns: ColumnDef<any>[];
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [filteringInvoice, setFilteringInvoice] = React.useState("");

  const [filteredInvoiceByDate, setFilteredInvoiceByDate] =
    React.useState(data);

  const table = useReactTable({
    data: filteringInvoice ? filteredInvoiceByDate : data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter: filteringInvoice,
    },
    onGlobalFilterChange: setFilteringInvoice,
  });

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  React.useEffect(() => {
    if (date && date.from && date.to) {
      const fromDate = startOfDay(date.from);
      const toDate = endOfDay(date.to);
      const filteredInvoiceByDate = data.filter((invoice) => {
        const invoiceDate = startOfDay(new Date(invoice.invoiceDate));
        return invoiceDate >= fromDate && invoiceDate <= toDate;
      });
      setFilteredInvoiceByDate(filteredInvoiceByDate);
    }
  }, [data, date]);

  const filteredRows = table.getFilteredRowModel().rows;

  const sortedDataCsv = [...filteredRows].sort(
    (a, b) => a.original.invoiceNo - b.original.invoiceNo
  );

  // const csvData = sortedDataCsv.map((row) => ({
  //   // invoiceNumber: row.original.invoiceNo,
  //   // invoiceDate: format(row.original.invoiceDate, "yyyy-MM-dd"),
  //   // customerName: row.original.customer.customerName,
  //   // gstIn: row.original.customer.gstIn,
  //   gstIn: row.original.pricedProducts,

  //   // taxableValue: row.original.totalTaxableValue,
  //   // rate: row.original.totalTaxRate,
  //   // taxAmount: row.original.totalTaxGST,
  //   // ProductTotalValue: row.original.ProductTotalValue,
  // }));

  const csvData = sortedDataCsv.map((row) => ({
    invoiceNumber: row.original.invoiceNo,
    invoiceDate: format(row.original.invoiceDate, "yyyy-MM-dd"),
    customerName: row.original.customer.customerName,
    aquafinaJar: row.original.pricedProducts.find(
      (item: any) => item.product.productName === "AQUAFINA WATER JAR 20 LITRE"
    )?.qty,
    tataCopper: row.original.pricedProducts.find(
      (item: any) => item.product.productName === "TATA COPPER WATER BOX 250ML"
    )?.qty,
    taxableValue: row.original.totalTaxableValue,
    taxAmount: row.original.totalTaxGST,
    invoiceValue: row.original.totalInvoiceValue,
  }));

  const csvColumns = [
    {
      id: "invoiceNumber",
      displayName: "Invoice Number",
    },
    {
      id: "invoiceDate",
      displayName: "Invoice Date",
    },
    {
      id: "customerName",
      displayName: "Receiver Name",
    },
    {
      id: "aquafinaJar",
      displayName: "GST Number",
    },
    {
      id: "tataCopper",
      displayName: "GST Number",
    },
    {
      id: "taxableValue",
      displayName: "Taxable Value",
    },
    // {
    //   id: "rate",
    //   displayName: "Rate",
    // },
    {
      id: "taxAmount",
      displayName: "Tax Amount",
    },
    {
      id: "invoiceValue",
      displayName: "Product Value",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-3">
        <Input
          placeholder="Filter Invoices..."
          value={filteringInvoice}
          onChange={(event) => setFilteringInvoice(event.target.value)}
          className="max-w-sm"
        />

        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <CsvDownloader
          datas={csvData}
          columns={csvColumns}
          filename="GST-MUKESH-TRADERS"
        >
          <Button className="p-2 rounded-lg" variant={"outline"}>
            <Download />
          </Button>
        </CsvDownloader>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex text-sm text-muted-foreground p-2">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center justify-center">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
