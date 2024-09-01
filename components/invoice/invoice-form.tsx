"use client"
import { useEffect, useState } from "react"

import { format } from "date-fns";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CalendarIcon, CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import MultipleSelector from "../ui/multi-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CreateInvoice } from "@/action/invoice";

const formSchemaInvoice = z.object({
  invoiceNo: z.string().min(1, "Invoice number is required."),
  invoiceDate: z.date(),
  monthOf: z.string().min(1, "Please select a month."),
  customerId: z.string().min(1, "Please select a Customer."),
  // productDetails: z.array(
  //   z.object({
  //     productId: z.string().min(1, "Please select a Product."),
  //     qty: z.number().min(1, "Quantity is required."),
  //     rate: z.number().min(1, "Rate is required."),
  //     taxableValue: z.number().min(1, "Taxable Value is required."),
  //     cgstAmt: z.number().min(1, "CGST Amount is required."),
  //     sgstAmt: z.number().min(1, "SGST Amount is required."),
  //     productTotalValue: z.number().min(1, "Product Total Value is required."),
  //   })
  // ),
  totalInvoiceValue: z.number().min(1, "Total Invoice Value is required."),
  totalTaxGST: z.number().min(1, "Total Tax Value is required."),
  totalTaxableValue: z.number().min(1, "Total Taxable Value is required."),
})

export const InvoiceForm = ({ customers, products, lastInvoiceNo }: { customers: any[], products: any[], lastInvoiceNo: string | null }) => {

  const productsOpt = products?.map(product => ({ label: product.productName, value: product.id, ...product }))
  const [productPrices, setProductPrices] = useState<any[]>([])

  const form = useForm({
    resolver: zodResolver(formSchemaInvoice),
    defaultValues: {
      invoiceNo: (((lastInvoiceNo ? Number(lastInvoiceNo) : 1001) + 1) || 0).toString(),
      invoiceDate: new Date(),
      monthOf: new Date().toLocaleString("en-US", { month: 'long' }),
      customerId: "",
      productDetails: [],
      totalInvoiceValue: 0,
      totalTaxGST: 0,
      totalTaxableValue: 0,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchemaInvoice>) => {
    try {
      await CreateInvoice({ values, productPrices })
      form.reset()
    } catch (error) {
      console.log(error, 'Error in creating invoice')
    }
  }

  const currCustomerId = form.watch("customerId")
  const selectProduct = form.watch("productDetails")

  useEffect(() => {
    const newSelecctedProducts = selectProduct.map((product: any) => {
      const productInfo = productPrices.find((p) => p.id === product.value);
      return productInfo ? { ...product, ...productInfo } : product;
    })
    setProductPrices(newSelecctedProducts)
  }, [selectProduct])

  useEffect(() => {
    const totalTaxableValue = productPrices.reduce((acc, product) => acc + (product.taxableValue), 0);
    const totalTaxGST = productPrices.reduce((acc, product) => acc + (product.cgstAmt + product.sgstAmt), 0);
    const totalInvoiceValue = totalTaxableValue + totalTaxGST;
    form.setValue("totalTaxableValue", totalTaxableValue);
    form.setValue("totalTaxGST", totalTaxGST);
    form.setValue("totalInvoiceValue", totalInvoiceValue);
  }, [productPrices])

  const handleProductInfoChange = (name: string, value: any, id: string, item: any) => {
    const updatedProductInfos = productPrices.map((product) => {
      let taxableValue = 0;
      if (name === "rate") {
        taxableValue = value * product.qty;
      } else {
        taxableValue = value * product.rate;
      }
      const cgstAmt = (taxableValue * item.cgstRate) / 100;
      const sgstAmt = (taxableValue * item.sgstRate) / 100;
      const productTotalValue = cgstAmt + sgstAmt + taxableValue;

      return product.id === id ? { ...product, [name]: value, taxableValue, cgstAmt, sgstAmt, productTotalValue } : product
    });

    const productExists = updatedProductInfos.some((product) => product.id === id);

    if (!productExists) {
      setProductPrices([...productPrices, { id, [name]: value }]);
    } else {
      setProductPrices(updatedProductInfos);
    }
  };

  const currCustomer = customers.find((customer) => customer.id === currCustomerId)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-5 w-full justify-center items-center">
          <FormField
            control={form.control}
            name="invoiceNo"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Invoice Number</FormLabel>
                <FormControl>
                  <Input disabled placeholder="Invoice Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="monthOf"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Select Month</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger id="month">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="January">January</SelectItem>
                      <SelectItem value="February">February</SelectItem>
                      <SelectItem value="March">March</SelectItem>
                      <SelectItem value="April">April</SelectItem>
                      <SelectItem value="May">May</SelectItem>
                      <SelectItem value="June">June</SelectItem>
                      <SelectItem value="July">July</SelectItem>
                      <SelectItem value="August">August</SelectItem>
                      <SelectItem value="September">September</SelectItem>
                      <SelectItem value="1October">October</SelectItem>
                      <SelectItem value="1November">November</SelectItem>
                      <SelectItem value="1December">December</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="invoiceDate"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-1">
                <FormLabel className="mb-2">Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          " pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disableBefore={true}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="customerId"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>Customer</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full max-w-screen-2xl overflow-ellipsis overflow-clip justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {currCustomer ? (`${currCustomer?.customerName}`)
                        : "Select Customer"}
                      <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Command className="max-w-screen-2xl">
                    <CommandInput placeholder="Search Customer..." />
                    <CommandList>
                      <ScrollArea className="h-[300px] w-full rounded-md border pr-3">
                        <CommandEmpty>No Customer found.</CommandEmpty>
                        <CommandGroup>
                          {customers?.map((customer) => (
                            <CommandItem
                              value={`${customer?.customerName} - ${customer?.address}`}
                              key={customer.id}
                              onSelect={() => {
                                form.setValue("customerId", customer.id)
                              }}
                            >
                              <CheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  customer.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {`${customer?.customerName} - ${customer?.address}`}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </ScrollArea>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Label htmlFor="customerAddress">Address</Label>
          <Input id="customerAddress" disabled value={currCustomer?.address || ""} placeholder="address" />
        </div>


        <div className="flex gap-5 w-full">
          <div className="flex-1">
            <Label htmlFor="customerGST">GST</Label>
            <Input id="customerGST" value={currCustomer?.gstIn || ""} disabled placeholder="GST" />
          </div>
          <div className="flex-1">
            <Label htmlFor="customerState">State</Label>
            <Input id="customerState" value={currCustomer?.state || ""} disabled placeholder="State" />
          </div>
          <div className="flex-1">
            <Label htmlFor="customerStateCode">State Code</Label>
            <Input id="customerStateCode" value={currCustomer?.stateCode || ""} disabled placeholder="State Code" />
          </div>

        </div>

        <div>
          <FormField
            control={form.control}
            name="productDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Products</FormLabel>
                <FormControl >
                  <MultipleSelector
                    {...field}
                    // onChange={(value) => setProductPrices(value)}
                    defaultOptions={productsOpt || []}
                    commandProps={{
                      className: "border"
                    }}
                    placeholder="Select Products..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {productPrices?.map((product: any, index: number) => {
          return (
            <div key={product.id} className="mt-3 flex gap-5 ">
              <div className="flex-1">
                <Label>Product Name</Label>
                <Input disabled value={product.label} placeholder="Product Name" />
              </div>
              <div className="flex-1">
                <Label>Qty</Label>
                <Input
                  type="number"
                  value={product.qty}
                  // name, value, id, item
                  onChange={(e) => handleProductInfoChange('qty', e.target.value, product.id, product)}
                  placeholder="Quantity"
                />
              </div>
              <div className="flex-1">
                <Label>Rate</Label>
                <Input
                  type="number"
                  value={product.rate}
                  onChange={(e) => handleProductInfoChange('rate', e.target.value, product.id, product)}
                  placeholder="Rate"
                />
              </div>
              <div className="flex-1">
                <Label >Taxable Value</Label>
                <Input disabled value={product.taxableValue} placeholder="Taxable Value" />
              </div>
              <div className="flex-1">
                <Label >Cgst Rate</Label>
                <Input disabled value={product.cgstRate} placeholder="cgstRate" />
              </div>
              <div className="flex-1">
                <Label >Sgst Rate</Label>
                <Input disabled value={product.sgstRate} placeholder="sgstRate" />
              </div>
              <div className="flex-1">
                <Label >Cgst Amt</Label>
                <Input disabled value={product.cgstAmt} placeholder="cgstAmt" />
              </div>
              <div className="flex-1">
                <Label >Sgst Amt</Label>
                <Input disabled value={product.sgstAmt} placeholder="sgstAmt" />
              </div>
              <div className="flex-1">
                <Label >Product Total Value</Label>
                <Input disabled value={product.productTotalValue} placeholder="productTotalValue" />
              </div>
            </div>
          );
        })}

        <FormField
          control={form.control}
          name="totalTaxableValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Taxable Value</FormLabel>
              <FormControl>
                <Input disabled placeholder="Total Taxable Value" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalTaxGST"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Tax Value</FormLabel>
              <FormControl>
                <Input disabled placeholder="Total Tax Value" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalInvoiceValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Invoice Value</FormLabel>
              <FormControl>
                <Input disabled placeholder="Total Invoice Value" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        < Button type="submit" > Create Invoice</Button >
      </form >
    </Form >
  )
}