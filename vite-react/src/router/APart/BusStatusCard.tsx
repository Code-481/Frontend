// BusStatusCard.jsx
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaServer } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";

const busData = [
    {
        title: "부산진구 6번",
        status: "4분 후, 동의대 본관 행 버스 로타리 도착 예정..",
        stops: ["로타리", "수덕전", "동의대 본관", "수덕전", "로타리"],
        icons: [{ idx: 1, type: "server" }],
        activeIdx: null,
        color: "bg-blue-600"
    },
    {
        title: "부산진구 6-1번",
        status: "현재, 로타리 행 버스 수덕전 도착..",
        stops: ["로타리", "수덕전", "동의대 본관", "수덕전", "로타리"],
        icons: [{ idx: 1, type: "server" }],
        activeIdx: null,
        color: "bg-blue-600"
    },
    {
        title: "부산진구 9번",
        status: "3분 후, 외국인 기숙사 행 버스 외국인 기숙사 도착 예정..",
        stops: ["로타리", "동의대 본관", "외국인 기숙사", "동의대 본관", "로타리"],
        icons: [{ idx: 2, type: "server" }],
        activeIdx: null,
        color: "bg-green-500"
    }
];

// @ts-ignore
const BusLine = ({ stops, icons, color }) => (
    <div className="flex items-center gap-4 my-2">
        {/* @ts-ignore */}
        {stops.map((stop, idx) => (
            <React.Fragment key={stop + idx}>
                <div className="flex flex-col items-center">
                    <FaCircle className={`text-2xl ${color}`} />
                    {/* @ts-ignore */}
                    {icons?.find((icon) => icon.idx === idx) && (
                        <FaServer className="text-gray-400 text-xs -mt-3" />
                    )}
                </div>
                {idx < stops.length - 1 && (
                    <div className={`flex-1 h-1 ${color}`} />
                )}
            </React.Fragment>
        ))}
    </div>
);

const BusStatusCard = () => (
    <Card className="max-w-xl mx-auto mt-8 shadow-lg">
        <CardHeader>
            <CardTitle className="text-2xl font-bold">각 버스별 위치</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
            {busData.map((bus) => (
                <div key={bus.title}>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-lg">{bus.title}</span>
                        <Badge variant="secondary" className="ml-2">{bus.status}</Badge>
                    </div>
                    <BusLine stops={bus.stops} icons={bus.icons} color={bus.color} />
                    <div className="flex justify-between text-xs text-gray-700 mt-1">
                        {bus.stops.map((stop, i) => (
                            <span key={stop + i}>{stop}</span>
                        ))}
                    </div>
                </div>
            ))}
        </CardContent>
    </Card>
);

export default BusStatusCard;
