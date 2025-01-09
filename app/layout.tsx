import type { Metadata } from "next";
import { Nunito, Rubik } from "next/font/google";
import "./globals.css";

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
// import { UserInfo } from "@/components/UserInfo";



import { Toaster } from "@/components/ui/toaster"

const fontRubik = Rubik({
  variable: "--font-rubik-sans",
  subsets: ["latin"],
});

const fontNunito = Nunito({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Warehouse",
  description: "Play with large data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${fontRubik.className} ${fontNunito.variable} antialiased`}
      >

        
        <SidebarProvider>
			<AppSidebar />
			<SidebarInset>
			
				<header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-csgbBgRed">
					<div className="flex items-center gap-2 px-3 ">
						<SidebarTrigger className="text-white " />
						{/* <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
					</div>




					{/* <UserInfo label="Hesabım" userName="murat" /> */}



				</header>

				<div className="flex flex-1 flex-col gap-4 p-4 ">

					<div className="grid auto-rows-min ">
          {children}
					
						{/* <div className="aspect-video rounded-xl bg-muted/50" />
						<div className="aspect-video rounded-xl bg-muted/50" />
						
						<div className="aspect-video rounded-xl bg-muted/50" /> */}
					</div>
					<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
				</div>
			</SidebarInset>
		</SidebarProvider>
        

       
        <Toaster />

      </body>
    </html>
  );
}
