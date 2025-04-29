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
import { CreateProduct, UpdateProduct } from "@/action/product";
import { useSession } from "next-auth/react";
import { Product } from "@prisma/client";
import { useEffect } from "react";
import { useModal } from "@/store/store";
import { toast } from "sonner";
import { Spinner } from "@/components/spinner";

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

export function ProductForm({
  productData,
}: {
  productData?: Product;
}) {
  const form = useForm<z.infer<typeof FormSchemaProduct>>({
    resolver: zodResolver(FormSchemaProduct),
    defaultValues: {
      productName: "",
      hsnCode: "",
      cgstRate: "",
      sgstRate: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const { onClose } = useModal();

  useEffect(() => {
    if (productData) {
      form.setValue("productName", productData.productName);
      form.setValue("hsnCode", productData.hsnCode?.toString());
      form.setValue("cgstRate", productData.cgstRate?.toString());
      form.setValue("sgstRate", productData.sgstRate?.toString());
    }
  }, [productData, form]);

  const session = useSession();

  async function onSubmit(data: z.infer<typeof FormSchemaProduct>) {
    try {
      const isSuccess = productData
        ? (await UpdateProduct(productData.id, data),
          toast("Product updated successfully!"))
        : (await CreateProduct({ values: data }, session.data?.user?.id || ""),
          toast("Product created successfully!"));
      if (isSuccess) {
        form.reset();
        onClose();
      }
    } catch (error) {
      productData
        ? toast("Failed to update product")
        : toast("Failed to create product");
    }
  }

  return (
    <>
      {/* {isSubmitting && <Spinner size={"lg"} />} */}
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
          <Button type="submit">
            {productData ? "Update Product" : "Create Product"}
          </Button>
        </form>
      </Form>
    </>
  );
}
