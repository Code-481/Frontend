import { AppSidebar } from "../APart/AppSidebar";
import BusRoutesCard from "./part/BusStatusCard";
import Topnav from "../APart/Topnav";
import { SidebarProvider } from "@/components/ui/sidebar";
import Food_Card from "./part/Food_Card";
import { useEffect, useState } from "react";
import All_Bus from "@/Api/Bus/Bus_arrival.ts";
function Dashboard_index_layout() {

  const [busData, setBusData] = useState([
    {
      "title": "부산진구6",
      "message": "운행중",
      "stops": [
        {
          "name": "동의대\n입구",
          
          "routeDirection": "right"
        },
        {
          "name": "자연대학",
         
          "routeDirection": "right"
        },
        {
          "name": "도서관",
          "routeDirection": "right"
        },
        {
          "name": "본관",
        
          "routeDirection": "right"
        },
      ]
    },
    {
      "title": "부산진구6-1",
      "message": "운행중",
      "stops": [
        {
          "name": "동의대\n입구",
       
          "routeDirection": "right"
        },
        {
          "name": "자연대학",
        
          "routeDirection": "right"
        },
        {
          "name": "도서관",
         
          "routeDirection": "right"
        },
        {
          "name": "본관",
          
          "routeDirection": "right"
        }
      ]
    },
    {
      "title": "부산진구9",
      "message": "운행중",
      "stops": [
        {
          "name": "동의대\n입구",
          "routeDirection": "right"
        },
        {
          "name": "자연대학",
          "routeDirection": "right"
        },
        {
          "name": "도서관",
          "routeDirection": "right"
        },
        {
          "name": "본관",
          "routeDirection": "right"
        }
      ]
    }
  ]);
  const [loading, setLoading] = useState(false);

  async function main() {
    const data = await All_Bus();
    setBusData(data);
  }

  useEffect(() => {
    main();
    const intervalId = setInterval(main, 30000);
    return () => clearInterval(intervalId);
  }, []);

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
            <p className="text-2xl text-gray-500">
              여러분이 궁금해하는 정보, 한눈에 확인해보세요
            </p>
            <br />
            <div className="flex gap-x-6">
              <div>
                {loading ? <div>로딩중...</div> : <BusRoutesCard

                  routes={busData}
                />}
              </div>
              <Food_Card />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard_index_layout;
