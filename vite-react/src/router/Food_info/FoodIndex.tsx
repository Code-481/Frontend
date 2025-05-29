import { SidebarProvider } from "@/components/ui/sidebar";
import Topnav from "../APublic_Compoment/Topnav";
import { AppSidebar } from "../APublic_Compoment/AppSidebar";
import Food_Card from "../APublic_Compoment/ScholarshipToday";
import DormitoryTodaytsx from "./Private_Compoment/DormitoryToday";
import Dormitoryweek from "./Private_Compoment/Dormitoryweek";


function FoodIndex() {

    return <>
        <Topnav />
        <div className="flex w-screen">
            {/* Side */}
            {true ? (
                <div className="hidden xl:block">
                    <SidebarProvider>
                        <AppSidebar />
                    </SidebarProvider>
                </div>
            ) : null}
            {/* content */}
            <div className={false ? "grid " : "grid flex-grow w-full"}>
                <div className="p-5">
                    <div className="flex gap-x-4">
                        <div className="w-5/10 xl:w-6/10">
                            <DormitoryTodaytsx />
                        </div>
                        <div className="w-2/7">
                            <p className="text-4xl font-bold">학식/기숙사 식당</p>
                            <p className="text-xl text-gray-500 pb-2">
                                오늘 하고 이번주 밥은 뭘까?
                            </p>
                            <Food_Card />
                        </div>
                    </div>
                    <div >
                        <Dormitoryweek />
                    </div>
                </div>
            </div>
        </div>
    </>

}

export default FoodIndex;