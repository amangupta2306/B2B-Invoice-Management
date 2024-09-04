"use server";

import { DeleteCustomer, EditCustomer } from "@/action/customer";

export const handleDeleteCustomer = async (id: string) => {
  await DeleteCustomer(id);
};

export const handleEditCustomer = async (id: string, values: any) => {
  await EditCustomer(id, values);
};
