import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import { Link } from "react-router-dom"
import BrandNameAndLogo from "../../BrandNameAndLogo"
import UserDropdown from "./subComponents/UserDropdown"
import { sidebarItems } from "./sidebar.items"

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" className="**:data-[sidebar=sidebar]:bg-card">
            <SidebarHeader className="pt-6 pb-4 flex items-center justify-center">
                <Link to="/" className="flex items-center">
                    <BrandNameAndLogo />
                </Link>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {sidebarItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild >
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <UserDropdown />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar >
    )
}