import { auth } from "./auth";

const authRoutes = [
  "/dashboard",
  "/gst/create-invoice",
  "/gst/invoices",
  "/gst/customers",
  "/gst/products",
  "/local/create-invoice",
  "/local/invoices",
  "/local/customers",
  "/local/products",
];

const authPages = ["/auth/signin", "/auth/signup"];

export default auth((req) => {
  if (!req.auth && authRoutes.includes(req.nextUrl.pathname)) {
    return Response.redirect(new URL("/auth/signin", req.nextUrl.origin));
  }

  if (req.auth && authPages.includes(req.nextUrl.pathname)) {
    return Response.redirect(new URL("/dashboard", req.nextUrl.origin));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
