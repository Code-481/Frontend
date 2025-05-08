import { AppSidebar } from "../APart/AppSidebar";
import Topnav from "../APart/Topnav";
import { SidebarProvider } from "@/components/ui/sidebar"


function Dashboard_index_layout() {
    return (
        <div className="w-screen  grid">
            <Topnav />
            <div className=" flex">
                {/* Side */}
                <div className="">
                    <SidebarProvider>
                        <AppSidebar />
                    </SidebarProvider>
                </div>
                {/* content */}
                <div className="grow-7">

                </div>
            </div>
        </div>
    );
}

export default Dashboard_index_layout;
