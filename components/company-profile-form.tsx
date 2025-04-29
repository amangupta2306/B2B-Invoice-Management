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
import { CreateCompanyProfile } from "@/action/user";

const FormSchemaCompanyDetails = z.object({
  companyName: z.string(),
  companyAddress: z.string(),
  gstNo: z.string(),
  state: z.string(),
  stateCode: z.string(),
  bankName: z.string(),
  bankAccountNo: z.string(),
  bankBranch: z.string(),
  bankIfscCode: z.string(),
});
export const CompanyProfileForm = () => {
  const session = useSession();

  const form = useForm<z.infer<typeof FormSchemaCompanyDetails>>({
    resolver: zodResolver(FormSchemaCompanyDetails),
    defaultValues: {
      companyName: "",
      companyAddress: "",
      gstNo: "",
      state: "",
      stateCode: "",
      bankName: "",
      bankAccountNo: "",
      bankBranch: "",
      bankIfscCode: "",
    },
  });

  const { onClose } = useModal();

  async function onSubmit(values: z.infer<typeof FormSchemaCompanyDetails>) {
    try {
      const onSuccess = await CreateCompanyProfile(
        values as any,
        session.data?.user?.id || ""
      );
      if (onSuccess) {
        toast("Product created successfully!");
        form.reset();
        onClose();
      }
    } catch (error) {
      toast("Failed to create Product.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full pt-4"
      >
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your company’s registered legal name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Office Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your full official address of your company"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gstNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company GST Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your 15-digit GSTIN as per government records"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex items-center gap-8">
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the state where your company is registered"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stateCode"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>State Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your registered state (e.g., 07 for Delhi)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center gap-8">
          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Bank Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the full name of your bank (e.g., State Bank of India)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bankAccountNo"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Bank Account Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your company’s bank account number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center gap-8">
          <FormField
            control={form.control}
            name="bankBranch"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Branch Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Specify the bank branch associated with your account"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bankIfscCode"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>IFSC Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the IFSC code (e.g., SBIN0001234)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="mt-10">
          Save
        </Button>
      </form>
    </Form>
  );
};
