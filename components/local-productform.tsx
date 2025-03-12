"use client";

import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "./ui/use-toast";
import { useForm } from "react-hook-form";
import { CreateLocalProduct } from "@/action/product";
import { useSession } from "next-auth/react";

const FormSchemaLocalProduct = z.object({
  productName: z.string(),
});
export const LocalProductForm = () => {
  const session = useSession();

  const form = useForm<z.infer<typeof FormSchemaLocalProduct>>({
    resolver: zodResolver(FormSchemaLocalProduct),
    defaultValues: {
      productName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchemaLocalProduct>) {
    try {
      const createLocalProduct = await CreateLocalProduct(
        values,
        session.data?.user?.id || ""
      );
      if (createLocalProduct) {
        toast({
          description: "Product created successfully!",
        });
      }
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
                <Input placeholder="Product Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Product</Button>
      </form>
    </Form>
  );
};
