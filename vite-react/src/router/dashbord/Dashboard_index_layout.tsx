import { AppSidebar } from "../APart/AppSidebar";
import BusRoutesCard from "./part/BusStatusCard";
import Topnav from "../APart/Topnav";
import { SidebarProvider } from "@/components/ui/sidebar";
import Food_Card from "./part/Food_Card";

function Dashboard_index_layout() {
  const bus_example = [
    {
      title: "부산진구 6-1 번",
      message: "운행중",
      color: "bg-[#0B3D91]",
      stops: [
        { name: "동의대역" },
        { name: "수정터널" },
        { name: "반도아파트" },
        { name: "동의대\n입구 ", eta: 1, direction: "right" }, // 오른쪽 방향으로 이동 중
        { name: "자연대학" },
        { name: "중앙\n도서관" },
        { name: "본관" },
      ],
    },
    {
      title: "부산진구 6번",
      message: "운행중",
      color: "bg-[#0B3D91]",
      stops: [
        { name: "본관", eta: 5 },
        { name: "도서관" },
        { name: "자연대학" },
        { name: "동의대\n입구", eta: 2, direction: "left" }, // 왼쪽 방향으로 이동 중 (회차 후)
        { name: "수정터널" },
        { name: "동의대역" },
        { name: "가야1\n치안센터" },
      ],
    },
    {
      title: "부산진구 9번",
      message: "운행중",
      color: "bg-green-500",
      stops: [
        { name: "본관" },
        { name: "자연대학" },
        { name: "동의대\n입구", eta: 5 }, // 방향 없음 (기본 버스 아이콘)
        { name: "가야1\n치안센터" },
        { name: "동의대역" },
        { name: "개금역" },
        { name: "주례한효아파트" },
      ],
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
