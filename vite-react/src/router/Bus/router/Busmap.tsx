//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/router/APublic_Compoment/AppSidebar";
import Topnav from "@/router/APublic_Compoment/Topnav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import deubackground from "@/assets/image/deu-background.png";
import All_Bus from "@/Api/Bus/Bus_arrival.ts";
import six_bus from "@/assets/image/bus/6.png";
import sixone_bus from "@/assets/image/bus/61.png";
import nine_bus from "@/assets/image/bus/9.png";
// 정류장+방향별 위치를 따로 지정
const stopPositionMap = {
    "동의대\n입구-right": { top: "87%", left: "52%" },
    "동의대\n입구-left": { top: "87%", left: "43%" },
    "자연대학-right": { top: "67%", left: "62%" },
    "자연대학-left": { top: "68%", left: "54%" },
    "도서관-right": { top: "56%", left: "70%" },
    "도서관-left": { top: "52%", left: "65%" },
    "본관-right": { top: "40%", left: "79%" },
    "본관-left": { top: "40%", left: "72%" },
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
            {
                "name": "본관",
                "routeDirection": "left"
            },
            {
                "name": "도서관",
                "routeDirection": "left"
            },
            {
                "name": "자연대학",
                "routeDirection": "left"
            },
            {
                "name": "동의대\n입구",
                "routeDirection": "left"
            }
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
            },
            {
                "name": "본관",
                "routeDirection": "left"
            },
            {
                "name": "도서관",
                "routeDirection": "left"
            },
            {
                "name": "자연대학",
                "routeDirection": "left"
            },
            {
                "name": "동의대\n입구",
                "routeDirection": "left"
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
            },
            {
                "name": "본관",
                "routeDirection": "left"
            },
            {
                "name": "도서관",
                "routeDirection": "left"
            },
            {
                "name": "자연대학",
                "routeDirection": "left"
            },
            {
                "name": "동의대\n입구",
                "routeDirection": "left"
            }
        ]
    }
];

const DIRECTION_META = {
    right: { label: "올라가는 방향", color: "bg-green-500 border-green-400", arrow: "⬆" },
    left: { label: "내려가는 방향", color: "bg-yellow-400 border-yellow-300", arrow: "⬇" }
};

function Busmap() {
    const [busData, setBusData] = useState([]);
    // 카드의 열림 여부와 현재 선택된 정류장+방향 정보
    const [cardOpen, setCardOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    async function main() {
        const data = await All_Bus();
        console.log(data);

        setBusData(data);
    }

    // 30초마다 All_Bus로 데이터 갱신
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
        return () => clearInterval(intervalId);

    }, []);

    // 모든 정류장+방향 조합 추출 (중복 없이)
    const allStops = [];
    busData.forEach(bus => {
        bus.stops.forEach(stop => {
            const key = `${stop.name}-${stop.routeDirection}`;
            if (
                stopPositionMap[key] &&
                !allStops.find(s => s.key === key)
            ) {
                allStops.push({ ...stop, key });
            }
        });
    });

    // 정류장+방향별 도착 정보
    function getStopInfo(stopName, direction) {
        const infoList = [];
        busData.forEach(bus => {
            const stop = bus.stops.find(
                s => s.name === stopName && s.routeDirection === direction
            );
            if (stop) {
                infoList.push({
                    route: bus.title,
                    eta: stop.eta,
                    message: bus.message
                });
            }
        });
        return infoList;
    }

    // 현재 선택된 정류장+방향 정보
    let cardContent = null;
    if (selected) {
        const meta = DIRECTION_META[selected.direction];
        const infoList = getStopInfo(selected.name, selected.direction);

        cardContent = (
            <Card className=" min-w-[30vw] shadow-lg">
                <CardHeader className="p-3">
                    <CardTitle className="text-3xl font-bold text-left">
                        정류소:  {selected.name} <span className="text-sm text-gray-500">({meta.label})</span>
                    </CardTitle>
                </CardHeader>
                {/*버스 정보 출력*/}
                <CardContent className="space-y-2 grid">
                    <div className='flex'>
                        {infoList.length === 0 ? (
                            <div className="text-center text-gray-500">도착 정보 없음</div>
                        ) : (
                            infoList.map((info) => (
                                <div key={info.route} className="p-2 border-b last:border-b-0">
                                    <img src={info.route == "부산진구6" ? six_bus : info.route == "부산진구6-1" ? sixone_bus : nine_bus}
                                        className='h-40' />
                                    <p className="font-bold text-2xl pt-1">{info.route}</p>
                                    <p className="font-bold text-md">{info.message}</p>
                                    <span className={`font-bold ${info.eta !== undefined && info.eta <= 5
                                        ? "text-green-600"
                                        : "text-gray-700"
                                        }`}>
                                        {info.eta === undefined ? "도착 정보 없습" : info.eta === 0 ? "곧 도착" : `${info.eta}분 후`}
                                    </span>

                                </div>
                            ))
                        )}

                    </div>

                </CardContent>
                <CardFooter className='pb-3'>
                    <Button className="w-full" onClick={() => setCardOpen(false)}>
                        닫기
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    return (
        <>
            <Topnav />
            <div className="flex w-screen">
                <div className="hidden xl:block">
                    <SidebarProvider>
                        <AppSidebar />
                    </SidebarProvider>
                </div>
                <div className="grid flex-grow w-full">
                    <div className="w-full mx-auto">
                        <div className="relative w-full h-full">
                            <img
                                src={deubackground}
                                alt="학교 버스맵"
                                className="w-full h-full object-cover"
                            />
                            {/* 정류장+방향별 버튼 */}
                            {allStops.map((stop) => {
                                const key = `${stop.name}-${stop.routeDirection}`;
                                const pos = stopPositionMap[key];
                                const meta = DIRECTION_META[stop.routeDirection];
                                return (
                                    <Button
                                        key={key}
                                        className={`
                                            absolute transform -translate-x-1/2 -translate-y-1/2
                                            ${meta.color}
                                            text-white font-bold border-2
                                            w-27 h-12 md:w-27 md:h-12
                                            text-xs md:text-base
                                            rounded-full shadow-lg hover:scale-110
                                            transition-all duration-200 ease-in-out
                                            focus:ring-4 focus:ring-white/50
                                        `}
                                        style={{
                                            top: pos.top,
                                            left: pos.left
                                        }}
                                        onClick={() => {
                                            setSelected({ name: stop.name, direction: stop.routeDirection });
                                            setCardOpen(true);
                                        }}
                                    >
                                        {stop.name.replace('\n', '')} {meta.arrow}
                                    </Button>
                                );
                            })}
                            {/* 최상단 왼쪽에 공유 카드 배치 */}
                            {cardOpen && selected && (
                                <div
                                    style={{
                                        position: "fixed",
                                        top: "100px",
                                        left: "15%",
                                        zIndex: 1000,
                                    }}
                                >
                                    {cardContent}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Busmap;
