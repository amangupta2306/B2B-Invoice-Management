"use client";

import { useModal } from "@/store/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Customer } from "@prisma/client";
import { CustomerForm } from "../gst/customer/customer-form";

export const EditCustomerModal = () => {
  const { data, type, onClose, isOpen } = useModal();

  const isOpenModel = isOpen && type === "editCustomer";

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpenModel} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>

          <DialogTitle>MUKESH TRADERS</DialogTitle>
          <DialogDescription>Edit Customer</DialogDescription>
        </DialogHeader>
        <CustomerForm customerData={data as Customer} />
      </DialogContent>
    </Dialog>
  );
};
