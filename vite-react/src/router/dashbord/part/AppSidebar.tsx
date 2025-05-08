import { BusFront, Info, Utensils } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const Menuitems = [
  {
    title: "Deu Info 서비스",
    url: "#",
    icon: Info,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Utensils,
  }
]

const Bus_Info = [
  {
    title: "진구 6번",
    url: "#",
    icon: BusFront,
  },
  {
    title: "진구 6-1번",
    url: "#",
    icon: BusFront,
  },
  {
    title: "진구 9번",
    url: "#",
    icon: BusFront,
  },
  {
    title: "시내 110-1번",
    url: "#",
    icon: BusFront,
  }
]


export function AppSidebar() {
  return (
    <Sidebar className="pr-10">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl font-bold">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="pl-5 gap-2.5">
              {Menuitems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span className="text-lg">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <br />
          <SidebarGroupLabel className="text-xl font-bold">Bus Info</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="pl-5  gap-2.5">
              {Bus_Info.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span className="text-lg">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
