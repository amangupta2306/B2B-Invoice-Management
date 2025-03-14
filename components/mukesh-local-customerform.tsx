"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "./ui/use-toast";
import { Input } from "./ui/input";
import { CreateLocalCustomer } from "@/action/customer";
import { Button } from "./ui/button";

const FormSchemaCustomer = z.object({
  customerName: z.string().min(2, {
    message: "customer/UIN must be at least 2 characters.",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
});

export const MukeshLocalCustomerForm = () => {
  const form = useForm<z.infer<typeof FormSchemaCustomer>>({
    resolver: zodResolver(FormSchemaCustomer),
    defaultValues: {
      customerName: "",
      address: "",
    },
  });

  //   const {
  //     formState: { isSubmitting },
  //   } = form;

  async function onSubmit(values: z.infer<typeof FormSchemaCustomer>) {
    try {
      await CreateLocalCustomer(values as any);
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Name</FormLabel>
              <FormControl>
                <Input
                  className="uppercase"
                  placeholder="Customer Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input className="uppercase" placeholder="Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Customer</Button>
      </form>
    </Form>
  );
};
