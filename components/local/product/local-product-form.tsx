"use client";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateLocalProduct } from "@/action/product";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useModal } from "@/store/store";
import { LocalProduct } from "@prisma/client";

const FormSchemaLocalProduct = z.object({
  productName: z.string(),
});
export const LocalProductForm = ({
  productData,
}: {
  productData?: LocalProduct;
}) => {
  const session = useSession();

  const form = useForm<z.infer<typeof FormSchemaLocalProduct>>({
    resolver: zodResolver(FormSchemaLocalProduct),
    defaultValues: {
      productName: "",
    },
  });

  const { onClose } = useModal();

  async function onSubmit(values: z.infer<typeof FormSchemaLocalProduct>) {
    try {
      const createLocalProduct = await CreateLocalProduct(
        values as any,
        session.data?.user?.id || ""
      );
      if (createLocalProduct) {
        toast("Product created successfully!");
      }
      form.reset();
      onClose();
    } catch (error) {
      toast("Failed to create Product.");
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
        <Button type="submit">Create Local Product</Button>
      </form>
    </Form>
  );
};
