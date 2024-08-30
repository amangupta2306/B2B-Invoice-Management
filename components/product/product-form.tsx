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

const FormSchemaProduct = z.object({
  productName: z.string().min(2, {
    message: "Customer name must be at least 2 characters.",
  }),
  hsnCode: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  cgstRate: z.string().min(2, {
    message: "GSTIN/UIN must be at least 2 characters.",
  }),
  sgstRate: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
});

export function ProductForm() {
  const form = useForm<z.infer<typeof FormSchemaProduct>>({
    resolver: zodResolver(FormSchemaProduct),
    defaultValues: {
      productName: "",
      hsnCode: "",
      cgstRate: "",
      sgstRate: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchemaProduct>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Product Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hsnCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>HSN Code</FormLabel>
              <FormControl>
                <Input placeholder="22011010" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cgstRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CGST Rate</FormLabel>
              <FormControl>
                <Input placeholder="CGST Rate" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sgstRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SGST Rate</FormLabel>
              <FormControl>
                <Input placeholder="SGST Rate" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Product</Button>
      </form>
    </Form>
  );
}
