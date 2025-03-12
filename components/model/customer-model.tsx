"use client"

import { useModal } from "@/store/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { CustomerForm } from "../customer/customer-form";
import { Customer } from "@prisma/client";
import { useEffect } from "react";

export const CustomerModel = () => {
  const { data, type, onClose, isOpen } = useModal();

  const isOpenModel = isOpen && type === "customer";

  const handleClose = () => {
    // form.reset();
    onClose();
  };

  // Handle escape key
  // useEffect(() => {
  //   const handleEscape = (event: KeyboardEvent) => {
  //     if (event.key === "Escape" && isOpenModel) {
  //       handleClose();
  //     }
  //   };

  //   document.addEventListener("keydown", handleEscape);
  //   return () => document.removeEventListener("keydown", handleEscape);
  // }, [isOpenModel, handleClose]);

  // if (!isOpenModel) return null;

  return (
    <Dialog open={isOpenModel} onOpenChange={handleClose}>
      <DialogContent
        // onEscapeKeyDown={handleClose}
        // onInteractOutside={(e) => {
        //   e.preventDefault();
        //   handleClose();
        // }}
      >
        <DialogHeader>
          <DialogTitle>MUKESH TRADERS</DialogTitle>
          <DialogDescription>Create Customer</DialogDescription>
        </DialogHeader>
        <CustomerForm customerData={data as Customer} />
      </DialogContent>
    </Dialog>
  );
};
