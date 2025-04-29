"use client";

import { useModal } from "@/store/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { LocalCustomerForm } from "../local/customer/local-customer-form";
import { LocalCustomer } from "@prisma/client";

export const EditLocalCustomerModal = () => {
  const { data, type, onClose, isOpen } = useModal();

  const isOpenModel = isOpen && type === "editLocalCustomer";

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpenModel} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>MUKESH TRADERS</DialogTitle>
          <DialogDescription>Edit Local Customer</DialogDescription>
        </DialogHeader>
        <LocalCustomerForm localCustomerData={data as LocalCustomer} />
      </DialogContent>
    </Dialog>
  );
};
