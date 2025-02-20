import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";


const protectedRoutes = [
  "/",
  "/statistics",
  "/authorized",
  "/allowed-users",
  "/api",
  "/api/ldapusers",
  "/api/globalstate",
  "/api/jobs",
  "/jobs",
];

const publicRoutes = ["/login"];

export default async function middleware(req: NextRequest) {
  
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

 
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let session: any = null;
  if (cookie) {
    try {
      session = await decrypt(cookie);
    } catch (error) {
      console.error("Session decryption failed:", error);
    }
  }

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
