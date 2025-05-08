// components/BusRoutesCard.tsx
import { Card } from "@/components/ui/card"
import { Bus } from "lucide-react"

type Stop = {
    name: string
    current?: boolean
}

type Route = {
    title: string
    message: string
    color: string // Tailwind bg color (e.g. 'bg-violet-500')
    stops: Stop[]
}

export default function BusRoutesCard({ routes }: { routes: Route[] }) {
    return (
        <Card className="shadow-md rounded-2xl p-6">
            <p className="text-2xl font-bold">각 버스별 위치</p>
            {routes.map((route, index) => (
                <div key={index}>
                    <div className="text-lg font-semibold mb-1">{route.title}</div>
                    <div className="text-sm text-muted-foreground pb-1">{route.message}</div>
                    <div className="flex items-center justify-between relative overflow-x-auto">
                        {route.stops.map((stop, i) => (
                            <div key={i} className="flex flex-col items-center relative min-w-20">
                                {/* 현재 위치 아이콘 */}
                                {stop.current && <Bus className="text-gray-700 w-5 h-5 mb-1 " />}
                                {/* 정류장 원형 */}
                                <div
                                    className={`w-4 h-4 rounded-full ${route.color} ${stop.current ? "border-2 border-black" : ""
                                        }`}
                                />
                                <div className="text-xs mt-1 whitespace-nowrap">{stop.name}</div>
                                {/* 선 연결 */}
                                {i < route.stops.length - 1 && (
                                    <div
                                        className={`absolute top-2 left-1/2 h-1 w-full -z-10 ${route.color
                                            }`}
                                        style={{ width: "100%", height: 2, top: 10 }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </Card>
    )
}
