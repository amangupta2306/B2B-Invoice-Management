"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Spinner } from "./spinner";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { ScrollArea } from "./ui/scroll-area";
import { useState } from "react";
import { LocalCustomer } from "@prisma/client";
import { Label } from "./ui/label";
import MultipleSelector from "./ui/multi-selector";

const FormSchemaCustomer = z.object({
  invoiceNumber: z.string().min(2, {
    message: "Customer name must be at least 2 characters.",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  customer: z.string().min(2, {
    message: "customer/UIN must be at least 2 characters.",
  }),
  product: z.string().min(2, {
    message: "product must be at least 2 characters.",
  }),
  totalInvoiceValue: z.string().min(1, {
    message: "product code must be at least 2 characters.",
  }),
});

export function MukeshLocalInvoiceForm({
  customers,
  products,
}: {
  customers: LocalCustomer[];
  products: any[];
}) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchemaCustomer>>({
    resolver: zodResolver(FormSchemaCustomer),
    defaultValues: {
      invoiceNumber: "",
      customer: "",
      address: "",
      product: "",
      totalInvoiceValue: "",
    },
  });

  const currLocalCustomerId = form.watch("customer");
  const currLocalProductId = form.watch("product");

  const currLocalCustomer = customers.find(
    (customer: any) => customer.id === currLocalCustomerId
  );

  const allProducts = products?.map((product) => ({
    label: product.productName,
    value: product.id,
    ...product,
  }));

  const handleProductInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = e.target.value;
    const rate = e.target.value;
  };

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(data: z.infer<typeof FormSchemaCustomer>) {
    try {
      // await CreateCustomer({ values: data });
      toast({
        description: "Customer created successfully!",
      });
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to create Customer.",
      });
    }
  }

  return (
    <div>
      {isSubmitting && <Spinner size={"lg"} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="invoiceNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Invoice Number</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    className="uppercase"
                    placeholder="Invoice Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="customer"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Customer</FormLabel>
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                  <PopoverTrigger asChild>
                    <FormControl className="border-2 shadow">
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full max-w-screen-2xl overflow-ellipsis overflow-clip justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                        onClick={() => setPopoverOpen(!popoverOpen)}
                      >
                        {currLocalCustomer
                          ? `${currLocalCustomer?.customerName}`
                          : "Select Customer"}
                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Command className="max-w-screen-2xl">
                      <CommandInput placeholder="Search Customer..." />
                      <CommandList>
                        <ScrollArea className="h-48 lg:h-[300px] w-80 lg:w-full rounded-md border pr-3">
                          <CommandEmpty>No Customer found.</CommandEmpty>
                          <CommandGroup>
                            {customers?.map((customer) => (
                              <CommandItem
                                value={`${customer?.customerName} - ${customer?.address}`}
                                key={customer.id}
                                onSelect={() => {
                                  form.setValue("customer", customer.id);
                                  setPopoverOpen(false); // Close the popover after selection
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
            <Label htmlFor="address">Address</Label>
            <Input
              className="border-2 shadow"
              id="address"
              disabled
              value={currLocalCustomer?.address || ""}
              placeholder="address"
            />
          </div>
          <div>
            {/* <FormField
              control={form.control}
              name="product"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Products</FormLabel>
                  <FormControl className="border-2 shadow">
                    <MultipleSelector
                      {...field}
                      // onChange={(value) => setProductPrices(value)}
                      defaultOptions={allProducts || []}
                      commandProps={{
                        className: "border",
                      }}
                      placeholder="Select Products..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>

          {/* {products &&
            products.map((product) => {
              return (
                <div key={product.id}>
                  <div>
                    <Input
                      disabled
                      value={product.productName}
                      placeholder="product"
                    ></Input>
                  </div>
                  <div>
                    <Input
                      type="number"
                      value={(e) => handleProductInfoChange(product.id
                        "qty"
                      )}
                      placeholder="Quantity"
                    ></Input>
                  </div>
                  <div>
                    <Input
                      type="number"
                      value={(e) => handleProductInfoChange(product.id
                        "rate"
                      )}
                      placeholder="Rate"
                    ></Input>
                  </div>
                </div>
              );
            })} */}

          <FormField
            control={form.control}
            name="totalInvoiceValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Invoice Value</FormLabel>
                <FormControl>
                  <Input placeholder="Total Invoice Value" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create Invoice</Button>
        </form>
      </Form>
    </div>
  );
}
