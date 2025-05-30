import { BusFront, Info, Utensils, Map } from "lucide-react"

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
    title: "동의대 종합정보창",
    url: "/dashboard",
    icon: Info,
  },
  {
    title: "학식/기숙사 식단",
    url: "/foodinfo",
    icon: Utensils,
  }
]

const Bus_Info = [
  {
    title: "버스 지도",
    url: "/busmap",
    icon: Map,
  },
  {
    title: "진구 6번",
    url: "/Busno/b64c6as",
    icon: BusFront,
  },
  {
    title: "진구 6-1번",
    url: "/Busno/12c69as",
    icon: BusFront,
  },
  {
    title: "진구 9번",
    url: "/Busno/as5c67as",
    icon: BusFront,
  },
  // {
  //   title: "시내 110-1번",
  //   url: "/Busno/88448ca",
  //   icon: BusFront,
  // }
]


export function AppSidebar() {
  return (
    <>
      <br />
      <Sidebar className="pr-2">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className=" pb-2 text-xl font-bold">Menu</SidebarGroupLabel>
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
            <SidebarGroupLabel className="pb-2  text-xl font-bold">Bus Info</SidebarGroupLabel>
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
    </>
  )
}
