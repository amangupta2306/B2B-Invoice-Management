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
import { CreateCustomer } from "@/action/customer";

const FormSchemaCustomer = z.object({
  customerName: z.string().min(2, {
    message: "Customer name must be at least 2 characters.",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  gstIn: z.string().min(2, {
    message: "GSTIN/UIN must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  stateCode: z.string().min(1, {
    message: "State code must be at least 2 characters.",
  }),
});

export function CustomerForm() {
  const form = useForm<z.infer<typeof FormSchemaCustomer>>({
    resolver: zodResolver(FormSchemaCustomer),
    defaultValues: {
      customerName: "",
      address: "",
      gstIn: "",
      state: "",
      stateCode: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchemaCustomer>) {
    await CreateCustomer({ values: data });
    form.reset();
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
                <Input placeholder="Customer Name" {...field} />
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
                <Input placeholder="Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gstIn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GSTIN/UIN</FormLabel>
              <FormControl>
                <Input className="uppercase" placeholder="GSTIN/UIN" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="State" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stateCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State Code</FormLabel>
              <FormControl>
                <Input placeholder="State Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Customer</Button>
      </form>
    </Form>
  );
}
