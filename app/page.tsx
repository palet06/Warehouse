import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserInfo } from "@/components/UserInfo";
import {cookies} from "next/headers"
import { decrypt } from "@/lib/session";

import { SearchableDataTable } from "@/components/SearchableDataTable";

const Home = async () => {
	const cookie =  (await cookies()).get("session")?.value;
   const session = await decrypt(cookie);
   
   
   


	return (
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

					


					<UserInfo label="Hesabım" userName={session?.userId as string} />



				</header>

				<div className="flex flex-1 flex-col gap-4 p-4">
					<div className="grid auto-rows-min">
						<SearchableDataTable userEmail={session?.userId} />
						<div className="aspect-video rounded-xl bg-muted/50" />
						<div className="aspect-video rounded-xl bg-muted/50" />
						<div className="aspect-video rounded-xl bg-muted/50" />
					</div>
					<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default Home;
