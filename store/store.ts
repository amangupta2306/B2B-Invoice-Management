"use client";

import { Customer, LocalCustomer, LocalProduct, Product } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "customer"
  | "editCustomer"
  | "deleteCustomer"
  | "product"
  | "editProduct"
  | "deleteProduct"
  | "invoice"
  | "editInvoice"
  | "localCustomer"
  | "editLocalCustomer"
  | "deleteLocalCustomer"
  | "localProduct"
  | "editLocalProduct"
  | "deleteLocalProduct"
  | "localInvoice"
  | "editLocalInvoice"
  | "companyProfile";

interface ModalData {
  customer?: Customer;
  localCustomer?: LocalCustomer;
  product?: Product;
  localProduct?: LocalProduct;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
