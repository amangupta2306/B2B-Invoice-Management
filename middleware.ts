import { auth } from "./lib/auth";

const authRoutes = [
  "/dashboard",
  "/create-invoice",
  "/customers",
  "/invoices",
  "/products",
];

const authPages = ["/auth/signin", "/auth/signup"];

export default auth((req) => {
  if (!req.auth && authRoutes.includes(req.nextUrl.pathname)) {
    return Response.redirect(new URL("/auth/signin", req.nextUrl.origin));
  }

  if (req.auth && authPages.includes(req.nextUrl.pathname)) {
    return Response.redirect(new URL("/create-invoice", req.nextUrl.origin));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
