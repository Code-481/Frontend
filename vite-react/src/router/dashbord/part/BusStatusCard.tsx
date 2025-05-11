import { Card } from "@/components/ui/card"
import { Bus } from "lucide-react"
import React from "react"

//@ts-ignore
export default function BusRoutesCard({ routes }) {
    return (
        <Card className="shadow-md rounded-2xl p-6">
            <p className="text-3xl font-bold">각 버스별 위치</p>
            {/**@ts-ignore */}
            {routes.map((route, index) => (
                <div key={index} className="mb-2">
                    <div className="text-xl font-semibold ">{route.title}</div>
                    <div className="text-sm text-muted-foreground pb-1">{route.message}</div>
                    <div className="flex flex-wrap items-center gap-x-4">
                        {/**@ts-ignore */}
                        {route.stops.map((stop, i) => {
                            const isSoon = stop.eta !== undefined && stop.eta <= 2;
                            const isApproaching = stop.eta !== undefined && stop.eta > 2;

                            return (
                                <React.Fragment key={i}>
                                    {/* 각 정류장 */}
                                    <div className="flex flex-col items-center relative w-16">
                                        {/* ETA <= 2일 때: 원 위 */}
                                        {isSoon && (
                                            <>
                                                <div className="text-md text-red-600 -mb-1">{stop.eta}분</div>
                                                <Bus className="text-gray-700 w-10 h-10 mb-1" />
                                            </>
                                        )}

                                        {/* 원형 정류장 */}
                                        <div
                                            className={`w-1 h-1 rounded-full ${route.color} ${isSoon ? "border-2 border-black" : ""}`}
                                        />
                                        <div className="text-sm mt-1 whitespace-nowrap text-center font-bold">{stop.name}</div>
                                    </div>

                                    {/* stop과 stop 사이의 선 + ETA > 2 표시 */}
                                    {i < route.stops.length - 1 && (
                                        <div className="relative flex items-center" style={{ width: 30, height: 20 }}>
                                            {/* 선 */}
                                            <div className={`h-1 w-full ${route.color}`} />

                                            {/* ETA > 2일 때 선 위에 버스와 시간 */}
                                            {isApproaching && (
                                                <div className="absolute -top-12 -right-4 -translate-x-1/2 flex flex-col items-center">
                                                    <div className="text-md text-gray-600">{stop.eta}분</div>
                                                    <Bus className="text-gray-700 w-8 h-8" />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        })}

                    </div>
                </div>
            ))}
        </Card>
    );
}
