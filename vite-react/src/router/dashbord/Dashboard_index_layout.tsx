import { AppSidebar } from "../APart/AppSidebar";
import BusRoutesCard from "./part/BusStatusCard";
import Topnav from "../APart/Topnav";
import { SidebarProvider } from "@/components/ui/sidebar";
import Food_Card from "./part/Food_Card";

function Dashboard_index_layout() {
  const bus_example = [
    {
      title: "부산진구 6 번",
      message: "운행중",
      stops: [
        { name: "동의대\n입구", eta: 2, routeDirection: "left" },
        { name: "자연대학", eta: 2, routeDirection: "right" },
        { name: "도서관" },
        { name: "본관" },
      ],
    },
    {
      title: "부산진구 6-1번",
      message: "운행중",
      stops: [
        { name: "동의대\n입구", eta: 5, routeDirection: "left" },
        { name: "도서관", eta: 3, routeDirection: "left" },
        { name: "자연대학", eta: 6, routeDirection: "left" },
        { name: "본관" },
      ],
    },
    {
      title: "부산진구 9번",
      message: "운행중",
      stops: [
        { name: "동의대\n입구", eta: 2, routeDirection: "right" },
        { name: "본관" },
        { name: "자연대학" },
      ],
    },
    {
      title: "110-1번",
      message: "운행중",
      stops: [],
    },
  ];

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
            <p className="text-1xl text-gray-500">
              여러분이 궁금해하는 정보, 한눈에 확인해보세요
            </p>
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
