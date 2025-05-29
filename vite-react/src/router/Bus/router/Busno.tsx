import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/router/APublic_Compoment/AppSidebar";
import Topnav from "@/router/APublic_Compoment/Topnav";
import { useParams } from "react-router";
import Infocard from "../Compoment/Ifocard";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import {
  getBusRoute6,
  getBusRoute6_1,
  getBusRoute9,
} from "@/Api/Bus/Bus_arrival";
import BusRoutesCard from "../Compoment/BusRoutesCard";

function Busno() {
  // 파라미터 보여주는 함수
  const params = useParams();
  const template = [
    {
      message: "운행 종료",
      stops: [
        {
          name: "동의대\n입구",

          routeDirection: "left",
  
        },
        {
          name: "자연대학",

          routeDirection: "left",
        },
        {
          name: "도서관",

          routeDirection: "left",
        },
        {
          name: "본관",

          routeDirection: "right",
        },
        {
          name: "도서관",

          routeDirection: "right",
        },
        {
          name: "자연대학",

          routeDirection: "right",
        },
        {
          name: "동의대\n입구",

          routeDirection: "right",
        },
      ],
    },
  ];
  const [Arrival, Setarrival] = useState(template);

  const data = {
    b64c6as: "6번",
    "12c69as": "6-1번",
    as5c67as: "9번",
  };

  async function get() {
    if (params.busID === "b64c6as") {
      const bus = await getBusRoute6();
      //@ts-ignore
      Setarrival(bus);
    } else if (params.busID === "12c69as") {
      const bus = await getBusRoute6_1();
      //@ts-ignore
      Setarrival(bus);
    } else {
      const bus = await getBusRoute9();
      //@ts-ignore
      Setarrival(bus);
    }
  }

  console.log(Arrival);

  useEffect(() => {
    function runIfInTimeRange() {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      // 오전 5시(05:00)부터 오전 11시 30분(11:30)까지
      const afterStart = hours > 5 || (hours === 5 && minutes >= 0);
      const beforeEnd = hours < 23 || (hours === 23 && minutes <= 30);

      if (afterStart && beforeEnd) {
        get();
      }
    }

    runIfInTimeRange(); // mount 시 최초 실행

    const intervalId = setInterval(runIfInTimeRange, 30000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
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
        <div className={false ? "grid p-5" : "grid p-5  flex-grow w-full"}>
          <div>
            {/* item1 */}
            <div className="flex">
              <p className="text-3xl  font-bold pb-4 pr-10">
                {/* @ts-ignore */}
                부산진구 {data[params.busID]} 버스 운행 정보
              </p>
              <div>
                <Badge variant="outline" color="#0b3d91">
                  부산 마을버스
                </Badge>
              </div>
            </div>
            <Infocard id={params.busID} />
            {/* item2 */}
            <p className="text-3xl  font-bold pt-4 pb-4 pr-10">
              {/* @ts-ignore */}
              부산진구 {data[params.busID]} 버스 도착 정보
            </p>
            <BusRoutesCard routes={Arrival} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Busno;
