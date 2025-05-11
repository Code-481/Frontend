import { AppSidebar } from "../APart/AppSidebar";
import BusRoutesCard from "./part/BusStatusCard";
import Topnav from "../APart/Topnav";
import { SidebarProvider } from "@/components/ui/sidebar"
import Food_Card from "./part/Food_Card";


function Dashboard_index_layout() {
    const bus_example = [
        {
            title: "부산진구 6번",
            message: "운행중",
            color: "bg-violet-500",
            stops: [
                { name: "로타리",  eta: 1 },
                { name: "수덕전" },
                { name: "동의대 본관" },
                { name: "수덕전" },
                { name: "로타리", eta: 5 },
            ],
        },
        {
            title: "부산진구 6-1번",
            message: "운행중",
            color: "bg-violet-500",
            stops: [
                { name: "로타리", eta: 5 },
                { name: "수덕전" },
                { name: "동의대 본관" },
                { name: "수덕전", eta: 2 },
                { name: "로타리" },
            ],
        },
        {
            title: "부산진구 9번",
            message: "운행중",
            color: "bg-green-500",
            stops: [
                { name: "로타리" },
                { name: "동의대 본관" },
                { name: "외국인 기숙사", eta: 5 },
                { name: "동의대 본관" },
                { name: "로타리" },
            ],
        },
    ]
    return (
        <>
            <Topnav />
            <div className="flex">
                {/* Side */}
                <div>
                    <SidebarProvider>
                        <AppSidebar />
                    </SidebarProvider>
                </div>
                {/* content */}
                <div className="grid">
                    <div className="p-5">
                        <p className="text-4xl font-bold">DEU 캠퍼스 인포</p>
                        <p className="text-1xl text-gray-500">여러분이 궁금해하는 정보, 한눈에 확인해보세요</p>
                        <br />
                        <div className="flex gap-x-6">
                            <BusRoutesCard
                                // 예시 데이터
                                routes={bus_example}
                            />
                            <Food_Card />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Dashboard_index_layout;
