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
import { CreateProduct } from "@/action/product";
import { toast } from "../ui/use-toast";

const FormSchemaProduct = z.object({
  productName: z.string().min(2, {
    message: "Customer name must be at least 2 characters.",
  }),
  hsnCode: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  cgstRate: z.string(),
  sgstRate: z.string(),
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

  async function onSubmit(data: z.infer<typeof FormSchemaProduct>) {
    try {
      await CreateProduct({ values: data });
      toast({
        description: "Product created Successfully!",
      });
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to create Product.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input
                  className="uppercase"
                  placeholder="Product Name"
                  {...field}
                />
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
