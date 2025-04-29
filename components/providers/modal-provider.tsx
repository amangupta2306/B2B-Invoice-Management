"use client";

import { useEffect, useState } from "react";
import { CustomerModal } from "../modal/customer-modal";
import { ProductModal } from "../modal/product-modal";
import { EditProductModal } from "../modal/edit-product-modal";
import { EditCustomerModal } from "../modal/edit-customer-model";
import { LocalProductModal } from "../modal/local-product-modal";
import { EditLocalProductModal } from "../modal/edit-local-product-modal";
import { LocalCustomerModal } from "../modal/local-customer-modal";
import { EditLocalCustomerModal } from "../modal/edit-local-customer-modal";
import { EditLocalInvoiceModal } from "../modal/edit-local-invoice-modal";
import { DeleteLocalCustomerModal } from "../modal/delete-local-customer-modal";
import { DeleteCustomerModal } from "../modal/delete-customer-modal";
import { DeleteLocalProductModal } from "../modal/delete-local-product-modal";
import { DeleteProductModal } from "../modal/delete-product-modal";
import { CompanyProfileModal } from "../modal/company-profile-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CustomerModal />
      <EditCustomerModal />
      <DeleteCustomerModal />

      <ProductModal />
      <EditProductModal />
      <DeleteProductModal />

      <LocalProductModal />
      <EditLocalProductModal />
      <DeleteLocalProductModal />

      <LocalCustomerModal />
      <EditLocalCustomerModal />
      <DeleteLocalCustomerModal />
      
      <EditLocalInvoiceModal />
      <CompanyProfileModal />
    </>
  );
};
