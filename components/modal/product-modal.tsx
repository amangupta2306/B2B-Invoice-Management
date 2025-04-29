"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/store/store";
import { ProductForm } from "../gst/product/product-form";

export const ProductModal = () => {
  const { data, type, onClose, isOpen } = useModal();

  const isOpenModel = isOpen && type === "product";

  const handleClose = () => {
    onClose();
  };
  return (
    <>
      <Dialog open={isOpenModel} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>MUKESH TRADERS</DialogTitle>
            <DialogDescription>Create Product</DialogDescription>
          </DialogHeader>
          <ProductForm />
        </DialogContent>
      </Dialog>
    </>
  );
};
