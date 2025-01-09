import * as React from "react"


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Image from "next/image"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Sorgulamlar",
      url: "#",
      items: [
        {
          title: "Sorgulamalar",
          url: "/",
          isActive: true,
        },
        
      ],
    },
   
    
  
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex  items-center justify-center rounded-lg ">
                  <Image src="/logo.svg" height={50} width={50} alt="logo" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">UIGM Warehouse</span>
                  
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem  key={item.title}>
                <SidebarMenuButton  asChild>
                  {item.url == "#" ? (<div className="font-medium uppercase text-csgbBgRed">{item.title}</div>): (<a href={item.url} className="font-medium">
                    {item.title}
                  </a>)}
                  
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub >
                    {item.items.map((item) => (
                      <SidebarMenuSubItem  key={item.title}>
                        <SidebarMenuSubButton  asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
