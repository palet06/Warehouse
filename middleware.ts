import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

<<<<<<< HEAD
const protectedRoutes = [
  "/",
  "/statistics",
  "/authorized",
  "/allowed-users",
  "/api/ldapusers",
];
=======
const protectedRoutes = ["/","/statistics","/authorized","/api/ldapusers"];
>>>>>>> 77ed256316ea47c089c0176d6221b1f3d972c76f
const publicRoutes = ["/login"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}
