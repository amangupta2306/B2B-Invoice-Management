"use client";

import { useEffect, useState } from "react";
import { CustomerModel } from "../model/customer-model";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CustomerModel />
    </>
  );
};
