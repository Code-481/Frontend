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

  // 반응형 레이아웃을 위한 화면 크기 감지
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1325);
    };

    // 초기 체크
    checkScreenSize();

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener("resize", checkScreenSize);

    // 클린업 함수
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // 정류장 중복 제거 및 버스 그룹화
  const processRouteStops = (route) => {
    // 정류장 이름으로 그룹화
    const stopsMap = new Map();

    route.stops.forEach((stop, index) => {
      if (!stopsMap.has(stop.name)) {
        stopsMap.set(stop.name, {
          name: stop.name,
          buses: [],
          index,
        });
      }

      // 버스 정보 추가
      if (stop.eta !== undefined) {
        // 정류장의 routeDirection 속성을 우선적으로 사용
        const direction = stop.routeDirection || "default";

        stopsMap.get(stop.name).buses.push({
          eta: stop.eta,
          direction: direction,
        });
      }
    });

    // 정류장 순서대로 배열로 변환
    return Array.from(stopsMap.values()).sort((a, b) => a.index - b.index);
  };

  // 모바일/태블릿 뷰를 위한 테이블 렌더링
  const renderMobileView = (route) => {
    const processedStops = processRouteStops(route);

    return (
      <div className="overflow-y-auto">
        <table className="w-full min-w-[180px] border-collapse text-xs">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">정류장</th>
              <th className="border p-2 text-left">상태</th>
            </tr>
          </thead>
          <tbody>
            {processedStops.map((stop, i) => {
              // 2분 이내 도착 버스 필터링
              const soonBuses = stop.buses.filter((bus) => bus.eta <= 1);
              // 2분 초과 도착 버스 필터링
              const approachingBuses = stop.buses.filter((bus) => bus.eta > 1);

              return (
                <tr key={i} className="border-b">
                  <td className="border-r p-2">
                    <div className="font-bold text-center">
                      {formatStationName(stop.name)}
                    </div>
                  </td>
                  <td className="p-2">
                    {/* 2분 이내 도착 버스가 여러 대인 경우 동시 도착으로 표시 */}
                    {soonBuses.length > 1 && (
                      <div className="flex items-center">
                        <Bus className="text-red-600 w-6 h-6 mr-2" />
                        <span className="font-bold text-red-600">
                          동시 도착
                        </span>
                      </div>
                    )}

                    {/* 2분 이내 도착 버스가 한 대인 경우 해당 방향으로 표시 */}
                    {soonBuses.length === 1 && (
                      <div className="flex items-center">
                        <Bus
                          className={`${soonBuses[0].direction === "left"
                            ? "text-orange-500"
                            : soonBuses[0].direction === "right"
                              ? "text-blue-600"
                              : "text-red-600"
                            } w-6 h-6 mr-2`}
                          style={
                            soonBuses[0].direction === "left"
                              ? { transform: "scaleX(-1)" }
                              : {}
                          }
                        />
                        <span
                          className={`font-bold ${soonBuses[0].direction === "left"
                            ? "text-orange-500"
                            : soonBuses[0].direction === "right"
                              ? "text-blue-600"
                              : "text-red-600"
                            }`}
                        >
                          곧 도착
                        </span>
                      </div>
                    )}

                    {/* 2분 초과 도착 버스들 표시 */}
                    {approachingBuses.map((bus, busIndex) => (
                      <div key={busIndex} className="flex items-center mt-2">
                        <Bus
                          className={`${bus.direction === "left"
                            ? "text-orange-500"
                            : bus.direction === "right"
                              ? "text-blue-600"
                              : "text-red-600"
                            } w-6 h-6 mr-2`}
                          style={
                            bus.direction === "left"
                              ? { transform: "scaleX(-1)" }
                              : {}
                          }
                        />
                        <span
                          className={`${bus.direction === "left"
                            ? "text-orange-500"
                            : bus.direction === "right"
                              ? "text-blue-600"
                              : "text-red-600"
                            }`}
                        >
                          {bus.eta}분
                        </span>
                      </div>
                    ))}

                    {/* 버스가 없는 경우 */}
                    {stop.buses.length === 0 && (
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

  // 데스크톱 뷰를 위한 렌더링
  const renderDesktopView = (route) => {
    const processedStops = processRouteStops(route);

    // 선 색상 결정
    const lineColor = route.title.includes("9")
      ? "bg-[#8BC34A]"
      : "bg-[#0B3D91]";

    return (
      <div className="flex flex-col pt-6 ml-3">
        {/* 정류장 및 선 표시 */}
        <div className="flex items-center">
          {processedStops.map((stop, i) => {
            // 2분 이내 도착 버스 필터링
            const soonBuses = stop.buses.filter((bus) => bus.eta <= 2);
            // 2분 초과 도착 버스 필터링
            const approachingBuses = stop.buses.filter((bus) => bus.eta > 2);

            return (
              <React.Fragment key={i}>
                {/* 정류장 */}
                <div className="flex flex-col items-center relative">
                  {/* 정류장 점 */}
                  <div className={`w-3 h-3 rounded-full ${lineColor}`}></div>

                  {/* 정류장 이름 */}
                  <div className="text-sm mt-1 text-center min-w-[60px]">
                    {formatStationName(stop.name)}
                  </div>

                  {/* 2분 이내 도착 버스가 여러 대인 경우 동시 도착으로 표시 */}
                  {soonBuses.length > 1 && (
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 min-w-[90px]">
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-center text-red-600">
                          좌우 동시
                          <br /> 도착
                        </span>
                        <Bus className="text-red-600 w-8 h-8" />
                      </div>
                    </div>
                  )}

                  {/* 2분 이내 도착 버스가 한 대인 경우 해당 방향으로 표시 */}
                  {soonBuses.length === 1 && (
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 min-w-[90px]">
                      <div className="flex flex-col items-center">
                        <span
                          className={`font-bold ${soonBuses[0].direction === "left"
                            ? "text-orange-500"
                            : soonBuses[0].direction === "right"
                              ? "text-blue-600"
                              : "text-red-600"
                            }`}
                        >
                          곧 도착
                        </span>
                        <Bus
                          className={`${soonBuses[0].direction === "left"
                            ? "text-orange-500"
                            : soonBuses[0].direction === "right"
                              ? "text-blue-600"
                              : "text-red-600"
                            } w-8 h-8`}
                          style={
                            soonBuses[0].direction === "left"
                              ? { transform: "scaleX(-1)" }
                              : {}
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 정류장 사이 선 */}
                {i < processedStops.length - 1 && (
                  <div className="relative mx-2 w-[53px] 2xl:w-[90px]">
                    <div
                      className={`h-1 ${lineColor}`}
                      style={{ width: "100%" }}
                    ></div>

                    {/* 2분 초과 도착 예정인 버스는 선 위에 표시 */}
                    {approachingBuses.map((bus, busIndex) => {
                      // 방향에 따라 위치 결정
                      const positionClass =
                        bus.direction === "left"
                          ? "left-2/6"
                          : bus.direction === "right"
                            ? "left-4/5"
                            : "left-1/2"; // 기본 위치는 중앙

                      return (
                        <div
                          key={busIndex}
                          className={`absolute -top-16 ${positionClass} transform -translate-x-1/2`}
                        >
                          <div className="flex flex-col items-center">
                            <span
                              className={`font-bold ${bus.direction === "left"
                                ? "text-orange-500"
                                : bus.direction === "right"
                                  ? "text-blue-600"
                                  : "text-red-600"
                                } w-10`}
                            >
                              {bus.eta} 분
                            </span>
                            <Bus
                              className={`${bus.direction === "left"
                                ? "text-orange-500"
                                : bus.direction === "right"
                                  ? "text-blue-600"
                                  : "text-red-600"
                                } w-8 h-8`}
                              style={
                                bus.direction === "left"
                                  ? { transform: "scaleX(-1)" }
                                  : {}
                              }
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  };

  // 노선을 2개씩 그룹화하는 함수
  const groupRoutes = (routes) => {
    const result = [];
    for (let i = 0; i < routes.length; i += 2) {
      if (i + 1 < routes.length) {
        result.push([routes[i], routes[i + 1]]);
      } else {
        result.push([routes[i]]);
      }
    }
    return result;
  };

  return (
    <Card className="shadow-md rounded-2xl p-5 w-[auto] h-[46vh] xl:h-[auto] md:overflow-y-auto">
      <h1 className="text-3xl font-bold mb-2">각 버스별 위치</h1>

      {/* 범례 */}
      <div className="flex gap-6 mb-4 ">
        <div className="flex items-center">
          <Bus
            className="text-orange-500 w-6 h-6 mr-1"
            style={{ transform: "scaleX(-1)" }}
          />
          <span>좌측 방향</span>
        </div>
        <div className="flex items-center">
          <Bus className="text-blue-600 w-6 h-6 mr-1" />
          <span>우측 방향</span>
        </div>
        <div className="flex items-center">
          <Bus className="text-red-600 w-6 h-6 mr-1" />
          <span>동시 도착</span>
        </div>
      </div>

      {isMobile ? (
        // 모바일 뷰 - 노선을 세로로 표시
       <div className="h-[34vh] grid grid-cols-1 sm:grid-cols-2 gap-4">
          {routes.map((route, index) => (
            <div key={index} className="mb-6">
              <div className="text font-semibold pb-3">
                {route.title}
              </div>
              {renderMobileView(route)}
            </div>
          ))}
        </div>
      ) : (
        // 데스크톱 뷰 - 노선을 2열 그리드로 표시
        <div className="grid grid-cols-2 gap-6">
          {routes.map((route, index) => (
            <div key={index} className="">
              <div className="text-2xl font-semibold">{route.title} 노선</div>
              <div className=" text-lg mb-10">{route.message}</div>
              {renderDesktopView(route)}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
