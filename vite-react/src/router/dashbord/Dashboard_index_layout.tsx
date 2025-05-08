import { AppSidebar } from "./part/AppSidebar";
import Topnav from "./part/Topnav";
import { SidebarProvider } from "@/components/ui/sidebar"


function Dashboard_index_layout() {
    return (
        <div className="grid">
            <Topnav />
            <div className=" w-screen  flex">
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
