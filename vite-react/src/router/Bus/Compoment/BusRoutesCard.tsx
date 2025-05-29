// @ts-nocheck
import { Card } from "@/components/ui/card";
import { Bus } from "lucide-react";
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

  // 정류장 처리 - 모든 stops를 순서대로 표시
  const processRouteStops = (route) => {
    // stops 배열을 그대로 사용하여 모든 정류장 표시
    return route.stops.map((stop, index) => ({
      name: stop.name,
      eta: stop.eta,
      direction: stop.routeDirection || "default",
      index: index,
    }));
  };

  // 일직선 노선 표시
  const renderLinearRoute = (route, routeIndex) => {
    const processedStops = processRouteStops(route);

    // 노선별 색상 결정
    const lineColor = routeIndex === 2 ? "#8BC34A" : "#0B3D91"; // 9번: 초록, 나머지: 파랑

    return (
      <div className="flex flex-col pt-6 ml-3 ">
        {/* 정류장 및 선 표시 */}
        <div className="flex items-center pb-4">
          {/* 왼쪽 끝 막대 */}
          <div className="flex items-center mr-2">
            <div
              className="w-1 h-6 rounded"
              style={{ backgroundColor: lineColor }}
            ></div>
          </div>

          {processedStops.map((stop, i) => {
            // 회차 지점 여부 확인 (본관)
            const isReturnPoint = stop.name === "본관";

            return (
              <React.Fragment key={i}>
                {/* 정류장 */}
                <div className="flex flex-col items-center relative min-w-[100px]">
                  {/* 정류장 점 */}
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white shadow-md relative z-10"
                    style={{ backgroundColor: lineColor }}
                  >
                    {/* 회차 표시 (본관만) */}
                    {isReturnPoint && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                        회차
                      </div>
                    )}
                  </div>

                  {/* 정류장 이름 */}
                  <div className="text-sm mt-2 text-center min-w-[80px] font-medium">
                    {formatStationName(stop.name)}
                  </div>

                  {/* 운행 종료 시 버스 표시 안함 */}
                  {route.message !== "운행 종료" && stop.eta !== undefined && (
                    <div className="absolute -top-15 left-1/2 transform -translate-x-1/2 min-w-[90px]">
                      <div className="flex flex-col items-center">
                        <span
                          className={`font-bold text-md ${
                            stop.direction === "left"
                              ? "text-orange-500"
                              : stop.direction === "right"
                              ? "text-blue-600"
                              : "text-red-600"
                          }`}
                        >
                          {stop.eta <= 2 ? "곧 도착" : `${stop.eta} 분`}
                        </span>
                        <Bus
                          className={`${
                            stop.direction === "left"
                              ? "text-orange-500"
                              : stop.direction === "right"
                              ? "text-blue-600"
                              : "text-red-600"
                          } w-7 h-7`}
                          style={stop.direction === "left" ? {} : {}}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 정류장 사이 연결선 */}
                {i < processedStops.length - 1 && (
                  <div className="relative mx-3 w-[80px] 2xl:w-[100px]">
                    {/* 일직선 연결선 */}
                    <div
                      className="h-1 rounded"
                      style={{
                        width: "100%",
                        backgroundColor: lineColor,
                      }}
                    ></div>
                  </div>
                )}
              </React.Fragment>
            );
          })}

          {/* 오른쪽 끝 막대 */}
          <div className="flex items-center ml-2">
            <div
              className="w-1 h-6 rounded"
              style={{ backgroundColor: lineColor }}
            ></div>
          </div>
        </div>

        {/* 운행 종료 시 메시지 표시 */}
        {route.message === "운행 종료" && (
          <div className="mt-4 p-3 bg-gray-100 rounded-lg text-center">
            <span className="text-gray-600 font-medium">
              현재 운행이 종료되었습니다
            </span>
          </div>
        )}
      </div>
    );
  };

  // 노선 번호 생성 함수 (인덱스 기반)
  const getRouteNumber = (index) => {
    const routeNumbers = ["6", "6-1", "9"];
    return routeNumbers[index] || `${index + 1}`;
  };

  return (
    <Card className="shadow-md rounded-2xl p-5 h-auto w-7/10 2xl:w-7/10  ">
      <div className="flex gap-6 mb-4 flex-wrap">
        <div className="flex items-center">
          <Bus className="text-orange-500 w-6 h-6 mr-1" />
          <span>올라가는 방향</span>
        </div>
        <div className="flex items-center">
          <Bus className="text-blue-600 w-6 h-6 mr-1" />
          <span>내려가는 방향</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded mr-1"></div>
          <span>회차지점</span>
        </div>
      </div>
      <br />
      <div className="grid grid-cols-1 gap-8">
        {routes.map((route, index) => (
          <div key={index} className="">
            {renderLinearRoute(route, index)}
          </div>
        ))}
      </div>
    </Card>
  );
}
