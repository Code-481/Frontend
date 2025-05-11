// @ts-nocheck
import { Card } from "@/components/ui/card";
import { Bus, ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";

export default function BusRoutesCard({ routes }) {
  const formatStationName = (name) => {
    return name.split("\n").map((part, i, arr) => (
      <React.Fragment key={i}>
        {part}
        {i < arr.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  // 반응형 레이아웃을 위한 화면 크기 감지
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1000); // 768px 미만을 모바일/태블릿으로 간주
    };

    // 초기 체크
    checkScreenSize();

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener("resize", checkScreenSize);

    // 클린업 함수
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // 모바일/태블릿 뷰를 위한 테이블 렌더링
  const renderMobileView = (route) => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">정류장</th>
              <th className="border p-2 text-left">상태</th>
            </tr>
          </thead>
          <tbody>
            {route.stops.map((stop, i) => {
              const isSoon = stop.eta !== undefined && stop.eta <= 2;
              const isApproaching = stop.eta !== undefined && stop.eta > 2;
              const direction = stop.direction; // 방향 정보 (left 또는 right)

              return (
                <tr key={i} className="border-b">
                  <td className="border-r p-2">
                    <div className="font-bold">
                      {formatStationName(stop.name)}
                    </div>
                  </td>
                  <td className="p-2">
                    {isSoon && (
                      <div className="flex items-center">
                        {direction === "left" ? (
                          <ArrowLeft className="text-orange-500 w-6 h-6 mr-2" />
                        ) : direction === "right" ? (
                          <ArrowRight className="text-blue-600 w-6 h-6 mr-2" />
                        ) : (
                          <Bus className="text-gray-700 w-6 h-6 mr-2" />
                        )}
                        <span
                          className={`font-bold ${
                            direction === "left"
                              ? "text-orange-500"
                              : direction === "right"
                              ? "text-blue-600"
                              : "text-red-600"
                          }`}
                        >
                          {stop.eta}분
                        </span>
                      </div>
                    )}
                    {isApproaching && (
                      <div className="flex items-center">
                        {direction === "left" ? (
                          <ArrowLeft className="text-orange-500 w-6 h-6 mr-2" />
                        ) : direction === "right" ? (
                          <ArrowRight className="text-blue-600 w-6 h-6 mr-2" />
                        ) : (
                          <Bus className="text-gray-700 w-6 h-6 mr-2" />
                        )}
                        <span
                          className={`${
                            direction === "left"
                              ? "text-orange-500"
                              : direction === "right"
                              ? "text-blue-600"
                              : "text-gray-600"
                          }`}
                        >
                          {stop.eta}분
                        </span>
                      </div>
                    )}
                    {!isSoon && !isApproaching && (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  // 데스크톱 뷰를 위한 렌더링 - 겹침 문제 해결
  const renderDesktopView = (route) => {
    // 각 정류장에 대한 버스 정보를 그룹화
    const busPositions = {};

    // 각 정류장에 도착하는 버스 정보 수집
    route.stops.forEach((stop, i) => {
      if (stop.eta !== undefined) {
        if (!busPositions[i]) {
          busPositions[i] = [];
        }
        busPositions[i].push({
          eta: stop.eta,
          direction: stop.direction,
          isSoon: stop.eta <= 2,
        });
      }
    });

    // 각 정류장에 도착하는 버스 정보를 ETA에 따라 정렬
    Object.keys(busPositions).forEach((stopIndex) => {
      busPositions[stopIndex].sort((a, b) => a.eta - b.eta);
    });

    return (
      <div className="flex flex-wrap items-center gap-x-2">
        {route.stops.map((stop, i) => {
          const buses = busPositions[i] || [];

          return (
            <React.Fragment key={i}>
              {/* 각 정류장 */}
              <div className="flex flex-col items-center relative w-[4.2vw]">
                {/* 버스 아이콘과 ETA 표시 */}
                {buses.map((bus, busIndex) => {
                  const { eta, direction, isSoon } = bus;
                  const verticalOffset = busIndex * -25; // 버스가 여러 대일 때 수직 간격

                  return (
                    <div
                      key={busIndex}
                      className="flex flex-col items-center absolute w-full"
                      style={{ bottom: `${30 + verticalOffset}px` }}
                    >
                      <div
                        className={`text-md ${
                          direction === "left"
                            ? "text-orange-500"
                            : direction === "right"
                            ? "text-blue-600"
                            : "text-red-600"
                        } -mb-1`}
                      >
                        {eta}분
                      </div>
                      {direction === "left" ? (
                        <ArrowLeft className="text-orange-500 w-10 h-10 mb-1" />
                      ) : direction === "right" ? (
                        <ArrowRight className="text-blue-600 w-10 h-10 mb-1" />
                      ) : (
                        <Bus className="text-gray-700 w-10 h-10 mb-1" />
                      )}
                    </div>
                  );
                })}

                {/* 원형 정류장 */}
                <div
                  className={`w-1 h-1 rounded-full ${route.color} ${
                    buses.some((b) => b.isSoon) ? "border-2 border-black" : ""
                  }`}
                />
                <div className="text-sm mt-1 text-center font-bold">
                  {formatStationName(stop.name)}
                </div>
              </div>

              {/* stop과 stop 사이의 선 */}
              {i < route.stops.length - 1 && (
                <div
                  className="relative flex items-center"
                  style={{ width: 30, height: 20 }}
                >
                  {/* 선 */}
                  <div className={`h-1 w-full ${route.color}`} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <Card className="shadow-md rounded-2xl p-6">
      <p className="text-3xl font-bold">각 버스별 위치</p>
      {isMobile ? (
        <div className="flex flex-col">
          {routes.map((route, index) => (
            <div key={index} className="mb-6">
              <div className="text-xl font-semibold pb-3">{route.title}</div>
              {renderMobileView(route)}
            </div>
          ))}
        </div>
      ) : (
        <div className="">
          {routes.map((route, index) => (
            <div className="pt-5">
              <div key={index}>
                <div className="text-2xl font-semibold pb-15">
                  {route.title}
                </div>
                {renderDesktopView(route)}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
