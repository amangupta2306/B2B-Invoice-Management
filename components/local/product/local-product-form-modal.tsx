"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/store/store";

export const LocalProductFormModal = () => {
  const { onOpen } = useModal();
  return <Button onClick={() => onOpen("localProduct")}>Create Local Product</Button>;
};
