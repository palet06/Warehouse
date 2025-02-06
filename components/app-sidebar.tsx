"use client";
import * as React from "react";
import { usePathname } from "next/navigation";

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
} from "@/components/ui/sidebar";
import Image from "next/image";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Sorgulamalar",
      url: "#",
      items: [
        {
          title: "Warehouse",
          url: "/",
          role:["Regular","Admin"],
        },
        {
          title: "İstatistikler",
          url: "/statistics",
          role:["Regular","Admin"],
        },
      ],
    },
    {
      title: "Kullanıcı İşlemlerİ",
      url: "#",
      items: [
        {
          title: "Erişim İzinleri",
          url: "/allowed-users",
          role:["Admin"],
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  
  const pathName = usePathname();

  return (
    <Sidebar  {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href={"/"}>
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
              
              <SidebarMenuItem key={item.title} hidden={!item.items[0].role.includes(props.userrole!)}>
                <SidebarMenuButton asChild>
                  
                  {item.url == "#" ? (
                    <div className="font-medium uppercase text-csgbBgRed cursor-pointer">
                      {item.title}
                    </div>
                  ) : (
                    <a href={item.url} className="font-medium cursor-pointer">
                      {item.title}
                    </a>
                  )}
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathName === item.url}
                        >
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
  );
}
