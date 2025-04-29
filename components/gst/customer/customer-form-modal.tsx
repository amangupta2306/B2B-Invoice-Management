"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/store/store";

export const CustomerFormModal = () => {
  const { onOpen } = useModal();
  return <Button onClick={() => onOpen("customer")}>Create Customer</Button>;
};
