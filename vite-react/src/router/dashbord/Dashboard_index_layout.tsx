import { AppSidebar } from "../APart/AppSidebar";
import BusRoutesCard from "./part/BusStatusCard";
import Topnav from "../APart/Topnav";
import { SidebarProvider } from "@/components/ui/sidebar"
import Food_Card from "./part/Food_Card";


function Dashboard_index_layout() {
    const bus_example = [
        {
            title: "부산진구 6번",
            message: "4분 후, 동의대 본관 행 버스 로타리 도착 예정..",
            color: "bg-violet-500",
            stops: [
                { name: "로타리" },
                { name: "수덕전", current: true },
                { name: "동의대 본관" },
                { name: "수덕전" },
                { name: "로타리" },
            ],
        },
        {
            title: "부산진구 6-1번",
            message: "현재, 로타리 행 버스 수덕전 도착..",
            color: "bg-violet-500",
            stops: [
                { name: "로타리" },
                { name: "수덕전" },
                { name: "동의대 본관" },
                { name: "수덕전", current: true },
                { name: "로타리" },
            ],
        },
        {
            title: "부산진구 9번",
            message: "3분 후, 외국인 기숙사 행 버스 외국인 기숙사 도착 예정..",
            color: "bg-green-500",
            stops: [
                { name: "로타리" },
                { name: "동의대 본관" },
                { name: "외국인 기숙사", current: true },
                { name: "동의대 본관" },
                { name: "로타리" },
            ],
        },
    ]
    return (
        <div className="grid">
            <Topnav />
            <div className=" flex">
                {/* Side */}
                <div className="">
                    <SidebarProvider>
                        <AppSidebar />
                    </SidebarProvider>
                </div>
                {/* content */}
                <div className="grid grow-7">
                    <div className="p-5">
                        <p className="text-4xl font-bold">DEU 캠퍼스 인포</p>
                        <p className="text-1xl text-gray-500">여러분이 궁금해하는 정보, 한눈에 확인해보세요</p>
                        <br />
                        <div className="flex gap-x-2">
                            <BusRoutesCard
                                // 예시 데이터
                                routes={bus_example}
                            />
                            <Food_Card />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard_index_layout;
