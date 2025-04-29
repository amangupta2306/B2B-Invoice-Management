"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const CreateCompanyProfile = async (values: any, userId: string) => {
  try {
    const newCompanyProfile = await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        companyName: values.companyName,
        companyAddress: values.companyAddress,
        gstNo: values.gstNo,
        state: values.state,
        stateCode: Number(values.stateCode),
        bankName: values.bankName,
        bankAccountNo: values.bankAccountNo,
        bankBranch: values.bankBranch,
        bankIfscCode: values.bankIfscCode,
      },
    });
    revalidatePath("/");
    return newCompanyProfile;
  } catch (error) {
    console.log(error);
  }
};
