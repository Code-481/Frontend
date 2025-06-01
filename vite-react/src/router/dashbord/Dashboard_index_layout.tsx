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
import { Fast_API } from "@/Api/event/Fastival";
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
  const [fastival, setfastival] = useState([  {
    "fields": {
      "﻿콘텐츠ID": "71",
      "콘텐츠명": "부산바다축제(한,영, 중간,중번,일)",
      "구군": "수영구",
      "위도": "35.151604",
      "경도": "129.11713",
      "장소": "부산바다축제, 다대포",
      "제목": "부산하면 여름, 여름하면 부산바다축제!",
      "부제목": "축제의 바다 속으로",
      "주요장소": "다대포 해수욕장 일원 (2024년 다대포 일원화 개최)",
      "주소": "",
      "주소 기타": "",
      "연락처": "051-713-5000",
      "홈페이지": "http://www.bfo.or.kr/festival_sea/info/01.asp?MENUDIV=1",
      "교통정보": "도시철도 1호선 다대포해수욕장역 2번 출구 도보 8분\n버스 11, 2, 3, 338, 96, 96-1, 1000",
      "운영기간": "",
      "이용요일 및 시간": "2024. 07. 26.(금) ~ 07. 28.(일)",
      "이용요금": "",
      "이미지URL": "https://www.visitbusan.net/uploadImgs/files/cntnts/20191213191711585_ttiel",
      "썸네일이미지URL": "https://www.visitbusan.net/uploadImgs/files/cntnts/20191213191711585_thumbL",
      "편의시설": "장애인 한바다축제 수어통역 / (사)부산장애인총연합회 051-863-0650"
    }
  },]);

  //@ts-ignore
  const [loading, setLoading] = useState(false);

  async function main() {
    const data = await All_Bus();
    setBusData(data);
  }

  async function One_more_thing() {
    const festiaval = await Fast_API();
    setfastival(festiaval);
  }

    async function Two_more_thing() {
    const weather = await GetWeather();
    setWeather(weather);
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
    One_more_thing();
    Two_more_thing();
    return () => clearInterval(intervalId);
  }, []);

  console.log(fastival);

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
        <div className={false ? "grid  overflow-y-auto" : "grid flex-grow w-full h-screen overflow-y-auto"}>
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
                <div className="  overflow-y-auto">
                  <Festival festivalData={fastival} />
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
