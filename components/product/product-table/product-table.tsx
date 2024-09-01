"use client"

import { Product } from "@prisma/client"
import { DataTableProduct } from "./data-table"
import { columns } from "./column"


export const ProductTable = ({ products }: { products: Product[] }) => {
  return (
    <div className="container mx-auto">
      <DataTableProduct data={products || []} columns={columns} />
    </div>
  )
}
