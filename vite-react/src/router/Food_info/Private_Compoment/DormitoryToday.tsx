import getTodayFood from "@/Api/Food/GetToday";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import types from "./type.json"
interface happy {
    date: string,
    dormType: string,
    food_menu: string,
    getMealType: string
}
function DormitoryTodaytsx() {
    const [happym, sethappy] = useState([]);
    const [hoymin, sethoymin] = useState([]);

    useEffect(() => {
        getTodayFood("happy").then(todayFoods => {
            //@ts-ignore
            sethappy(todayFoods);
        });
        getTodayFood("hyomin").then(todayFoods => {
            //@ts-ignore
            sethoymin(todayFoods);
        });
    }, []);

    return <>
        <div className=" overflow-x-auto overflow-y-auto  w-[auto] h-[55vh] xl:h-[auto] ">
            <div className="">
                <Card className="p-5">
                    <CardTitle className="text-2xl">
                        행복기숙사 식단
                    </CardTitle>
                    <CardContent
                        className=" overflow-x-auto overflow-y-auto"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {happym.map((date: happy) => (
                                <div key={date.date + date.getMealType} className="border rounded p-2 bg-white shadow max-w-[180px]">
                                    {/*@ts-ignore */}
                                    <p className="text-xl font-bold">[{types[date.getMealType]}]</p>
                                    <p className="text-lg font-bold">
                                        {date.food_menu.split(/\/|-/).map((menu, i, arr) => (
                                            <span key={i}>
                                                {menu.trim()}
                                                {i < arr.length - 1 && <br />}
                                            </span>
                                        ))}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card className="mt-3 p-5">
                    <CardTitle className="text-2xl">
                        효민기숙사 식단
                    </CardTitle>
                    <CardContent
                        className="overflow-x-auto overflow-y-auto" >
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {hoymin.map((date: happy) => (
                                <div key={date.date + date.getMealType} className="border rounded p-2 bg-white shadow">
                                    {/*@ts-ignore */}
                                    <p className="text-xl font-bold">[{types[date.getMealType]}]</p>
                                    <p className="text-lg font-bold">
                                        {date.food_menu.split(" ").map((menu, i, arr) => (
                                            <span key={i}>
                                                {menu.trim()}
                                                {i < arr.length - 1 && <br />}
                                            </span>
                                        ))}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </>
}

export default DormitoryTodaytsx;