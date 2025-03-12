"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { boolean } from "zod";

export const BreadCrumb = () => {
  const pathname = usePathname();
  console.log(pathname, "pathname");
  const paths = pathname.split("/").filter(Boolean)
  console.log(paths, "paths");


  return (
    <Breadcrumb>
      <BreadcrumbList>

        {paths.map((path, index) => {
          const href = `/${paths.slice(1, index).join("/")}`
          const isLast = index === paths.length - 1
          console.log(isLast, "isLast");
          console.log(href, "href");
          return (
            <>
              <BreadcrumbItem key={path}>
                {isLast ? (
                  <BreadcrumbPage className="capitalize font-medium">{path}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href} className="uppercase font-medium">{path}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}

            </>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
