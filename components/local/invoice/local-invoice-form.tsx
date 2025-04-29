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
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { LocalCustomer } from "@prisma/client";
import { Spinner } from "@/components/spinner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import MultipleSelector from "@/components/ui/multi-selector";
import { useSession } from "next-auth/react";
import { useModal } from "@/store/store";
import { CreateLocalInvoice, updateLocalInvoice } from "@/action/invoice";

const FormSchemaLocalInvoice = z.object({
  invoiceNo: z.string().min(2, "Customer name must be at least 2 characters."),
  customerId: z.string().min(2, "Please select a customer."),
  // productDetails: z
  //   .array(
  //     z.object({
  //       id: z.string(),
  //       qty: z.number().min(1, { message: "Quantity must be at least 1." }),
  //       rate: z.number().min(0, { message: "Rate must be non-negative." }),
  //     })
  //   )
  //   .optional(),
  totalInvoiceValue: z
    .number()
    .min(1, "Total invoice value must be at least 1."),
});

export function LocalInvoiceForm({
  customers,
  // currLocalCustomerId,
  productDetails,
  products,
  lastInvoiceNo,
  localInvoiceData,
}: {
  customers: LocalCustomer[];
  products: any[];
  // currLocalCustomerId: string;
  productDetails?: string;
  lastInvoiceNo: string;
  localInvoiceData?: any;
}) {
  const allProducts = products?.map((product) => ({
    label: product.productName,
    value: product.id,
    ...product,
  }));

  const [productPrices, setProductPrices] = useState<any[]>([]);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchemaLocalInvoice),
    defaultValues: {
      invoiceNo: (lastInvoiceNo ? Number(lastInvoiceNo) + 1 : 2001).toString(),
      customerId: "",
      address: "",
      productDetails: [],
      totalInvoiceValue: 0,
    },
  });

  const currLocalCustomerId = form.watch("customerId");
  const selectProduct = form.watch("productDetails");

  const currLocalCustomer = customers.find(
    (customer: any) => customer.id === currLocalCustomerId
  );

  useEffect(() => {
    const newSelecctedProducts = selectProduct.map((product: any) => {
      const productInfo = productPrices.find((p) => p.id === product.value);
      return productInfo ? { ...product, ...productInfo } : product;
    });
    setProductPrices(newSelecctedProducts);
  }, [selectProduct]);

  useEffect(() => {
    const totalTaxableValue = productPrices.reduce(
      (acc, product) => acc + Number(product.productTotalValue),
      0
    );
    form.setValue("totalInvoiceValue", Number(totalTaxableValue));
  }, [productPrices]);

  const handleProductInfoChange = (
    name: string,
    value: any,
    id: string,
    item: any
  ) => {
    const updatedProductInfos = productPrices.map((product) => {
      let productTotalValue = 0;
      if (name === "rate") {
        productTotalValue = value * product.qty;
      } else {
        productTotalValue = value * product.rate;
      }

      return product.id === id
        ? {
            ...product,
            [name]: value,
            productTotalValue: productTotalValue,
          }
        : product;
    });

    const productExists = updatedProductInfos.some(
      (product) => product.id === id
    );

    if (!productExists) {
      setProductPrices([...productPrices, { id, [name]: value }]);
    } else {
      setProductPrices(updatedProductInfos);
    }
  };
  
  const {
    formState: { isSubmitting },
  } = form;
  
  const session = useSession();
  const { onClose } = useModal();
  
  useEffect(() => {
    if (localInvoiceData) {
      form.setValue("invoiceNo", localInvoiceData.invoiceNo);
      form.setValue("customerId", localInvoiceData.customerId);
      form.setValue("address", localInvoiceData.address);
      // form.setValue("productDetails", localInvoiceData.productDetails);
      form.setValue("totalInvoiceValue", localInvoiceData.totalInvoiceValue);
    }
  });
  
  async function onSubmit(values: z.infer<typeof FormSchemaLocalInvoice>) {
    try {
      const isSuccess = 
        await CreateLocalInvoice(
            { values, productPrices },
            session.data?.user?.id || ""
          )
        // : "a";
      // : await updateLocalInvoice(
      //     { , values,  },
      //     session.data?.user?.id || ""
      //   );
      if (isSuccess) {
        toast("Invoice created successfully!");
        form.reset();
        onClose();
      }
    } catch (error) {
      toast("Failed to create Invoice");
    }
  }


  return (
    <div>
      {isSubmitting && <Spinner size={"lg"} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="invoiceNo"
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
            name="customerId"
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
                                  form.setValue("customerId", customer.id);
                                  setPopoverOpen(false);
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
            <FormField
              control={form.control}
              name="productDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Products</FormLabel>
                  <FormControl className="border-2 shadow">
                    <MultipleSelector
                      {...field}
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
            />
          </div>

          {productPrices.map((product) => {
            return (
              <div
                key={product.id}
                className="flex items-center justify-center gap-4 w-full"
              >
                <div className="w-4/6">
                  <Label>Product Name</Label>
                  <Input
                    disabled
                    value={product.productName}
                    placeholder="product"
                  ></Input>
                </div>
                <div className="flex-1">
                  <Label>Qty</Label>
                  <Input
                    type="number"
                    value={product.qty}
                    onChange={(e) =>
                      handleProductInfoChange(
                        "qty",
                        e.target.value,
                        product.id,
                        product
                      )
                    }
                    placeholder="Quantity"
                  ></Input>
                </div>
                <div className="flex-1">
                  <Label>Rate</Label>
                  <Input
                    type="number"
                    value={product.rate}
                    onChange={(e) =>
                      handleProductInfoChange(
                        "rate",
                        e.target.value,
                        product.id,
                        product
                      )
                    }
                    placeholder="Rate"
                  ></Input>
                </div>
                <div className="flex-1">
                  <Label>Product Total Value</Label>
                  <Input
                    disabled
                    value={product.productTotalValue}
                    placeholder="Product Total Value"
                  ></Input>
                </div>
              </div>
            );
          })}

          <FormField
            control={form.control}
            name="totalInvoiceValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Invoice Value</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="Total Invoice Value"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create Local Invoice</Button>
        </form>
      </Form>
    </div>
  );
}
