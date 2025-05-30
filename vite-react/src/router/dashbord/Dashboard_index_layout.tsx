import { AppSidebar } from "../APublic_Compoment/AppSidebar";
import BusRoutesCard from "./Private_Compoment/BusStatusCard";
import Topnav from "../APublic_Compoment/Topnav";
import { SidebarProvider } from "@/components/ui/sidebar";
import Food_Card from "../APublic_Compoment/ScholarshipToday";
import { useEffect, useState } from "react";
import All_Bus from "@/Api/Bus/Bus_arrival.ts";
import Festival from "./Private_Compoment/Festival";

import ResponsiveWeatherCard from "./Private_Compoment/weather/WeatherWidgetCard";
import GetWeather from "@/Api/Weather/Weather_API";
const dummyWeather = {
  temperature: 34,
  sunsetTime: "6:30 pm",
  location: "Shirdi Sai Nagar",
  cloud: 2,
  sky: 3,
  weekly: [
    { date: "2025-05-19", minTemperature: 23, maxTemperature: 36, sky: 0, cloud: 2 },
    { date: "2025-05-20", minTemperature: 23, maxTemperature: 36, sky: 0, cloud: 2 },
    { date: "2025-05-21", minTemperature: 24, maxTemperature: 36, sky: 0, cloud: 2 },
    { date: "2025-05-22", minTemperature: 24, maxTemperature: 36, sky: 0, cloud: 2 },
    { date: "2025-05-23", minTemperature: 24, maxTemperature: 36, sky: 0, cloud: 2 },

  ],
};
const json = [
  {
    "title": "부산진구6",
    "message": "운행 종료",
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
    "message": "운행 종료",
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
    "message": "운행 종료",
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
];

function Dashboard_index_layout() {
  //@ts-ignore
  const [weather, setWeather] = useState(dummyWeather);
  const [busData, setBusData] = useState(json);
  //@ts-ignore
  const [loading, setLoading] = useState(false);

  async function main() {
    const data = await All_Bus();
    console.log(data);
    
    setBusData(data);
  }

  async function Weahter() {
    const weather = await GetWeather();
    setWeather(weather);
    console.log(weather);
    
  }

  useEffect(() => {
    function runIfInTimeRange() {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      // 오전 5시(05:00)부터 오전 11시 30분(11:30)까지
      const afterStart = hours > 5 || (hours === 5 && minutes >= 0);
      const beforeEnd = hours < 23 || (hours === 23 && minutes <= 30);

      if (afterStart && beforeEnd) {
        main();
      } else {
        setBusData(json);
      }
    }

    runIfInTimeRange(); // mount 시 최초 실행

    const intervalId = setInterval(runIfInTimeRange, 30000);
    //@ts-ignore
    Weahter();
    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <Topnav />
      <div className="flex w-screen">
        {/* Side */}
        {true ? (
          <div>
            <SidebarProvider>
              <AppSidebar />
            </SidebarProvider>
          </div>
        ) : null}
        {/* content */}
        <div className={false ? "grid  overflow-y-auto" : "grid flex-grow w-full overflow-y-auto"}>
          <div className=" p-5 bg-white">
            <p className="text-4xl font-bold">DEU 캠퍼스 인포</p>
            <p className="text-2xl text-gray-500">
              여러분이 궁금해하는 정보, 한눈에 확인해보세요
            </p>
            <br />
            <div className="flex gap-x-6">
              <div className="w-2/3">
                {loading ? <div>로딩중...</div> : <BusRoutesCard

                  routes={busData}
                />}
              </div>
              <Food_Card />
            </div>
            <div className="flex">
              {/*  부산 행사  */}
              <div className="hidden xl:grid w-3/5 pr-10">
                <div className="pt-3">
                  <p className="text-3xl font-bold">Busan is Festival!</p>
                  <p className="text-md text-gray-500">
                    부산에서 진행하는 행사를 알아 보세요!
                  </p>
                  <br />
                </div>
                <div className="">
                  <Festival />
                </div>
              </div>
              {/*  날씨 보여주는   */}
              <div className=" pt-5">
                <ResponsiveWeatherCard date={""} {...weather} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard_index_layout;
