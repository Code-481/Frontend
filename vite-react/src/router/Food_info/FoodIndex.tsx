import { SidebarProvider } from "@/components/ui/sidebar";
import Topnav from "../APublic_Compoment/Topnav";
import { AppSidebar } from "../APublic_Compoment/AppSidebar";
import Food_Card from "../APublic_Compoment/ScholarshipToday";
import Dormitoryweek from "./Private_Compoment/Dormitoryweek";
import DormitoryToday from "./Private_Compoment/DormitoryToday";
import { useState } from "react";

const dormTabs = [
    { key: "hyomin", label: "효민기숙사" },
    { key: "happy", label: "행복기숙사" },
];

function FoodIndex() {
    const [activeDorm, setActiveDorm] = useState<"hyomin" | "happy">("hyomin");

    return <>
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
            <div className={false ? "grid " : "grid flex-grow w-full"}>
                <div className="p-5">
                    <div className="flex gap-x-4">
                        <div className="w-5/10 xl:w-6/10">
                            <h2 className="mb-5 font-bold text-3xl">당일 식단표</h2>
                            {/* 기숙사 탭 */}
                            <div className="flex mb-6 border-b">
                                {dormTabs.map(tab => (
                                    <button
                                        key={tab.key}
                                        className={`py-2 px-4 font-semibold transition ${activeDorm === tab.key
                                            ? "border-b-2 border-blue-600 text-blue-600"
                                            : "text-gray-500"
                                            }`}
                                        onClick={() => setActiveDorm(tab.key as "hyomin" | "happy")}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                            <DormitoryToday dorm={activeDorm} />
                        </div>
                        <div className="w-2/7">
                            <p className="text-4xl font-bold">학식/기숙사 식당</p>
                            <p className="text-xl text-gray-500 pb-2">
                                오늘 하고 이번주 밥은 뭘까?
                            </p>
                            <Food_Card />
                        </div>
                    </div>
                    <div >
                        <Dormitoryweek />
                    </div>
                </div>
            </div>
        </div>
    </>

}

export default FoodIndex;