import { cookies } from "next/headers";

import { decrypt } from "@/lib/session";
import type { Metadata } from "next";

import "./globals.css";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import { Toaster } from "@/components/ui/toaster";

import { UserInfo } from "@/components/UserInfo";

// const fontRubik = Rubik({
//   variable: "--font-rubik-sans",
//   subsets: ["latin"],
// });

// const fontNunito = Nunito({
//   variable: "--font-nunito-sans",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Warehouse",
  description: "Play with large data",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookie = (await cookies()).get("session")?.value;

  const session = await decrypt(cookie);
  const userRoleData = session?.sub;

  return (
    <html lang="en">
      <body
        // className={`${fontRubik.className} ${fontNunito.variable} antialiased`}
        className={`antialiased`}
      >
        {!session?.userId ? (
          <>{children}</>
        ) : (
          <SidebarProvider>
            <AppSidebar userrole={userRoleData} />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-csgbBgRed">
                <div className="flex items-center gap-2 px-3 ">
                  <SidebarTrigger className="text-white " />
                </div>

                <UserInfo
                  label="Hesabım"
                  userName={session.userId.toString()}
                  sessionExpires={session.exp!}
                />
              </header>

              <div className="flex flex-1 flex-col gap-4 p-4 ">
                <div className="grid auto-rows-min ">{children}</div>
                <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
              </div>
            </SidebarInset>
          </SidebarProvider>
        )}

        <Toaster />
      </body>
    </html>
  );
}
