import getTodayFood from "@/Api/Food/GetToday";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import types from "./type.json";

interface Food {
    date: string;
    dormType: string;
    food_menu: string;
    getMealType: string;
}

export default function DormitoryToday({ dorm }: { dorm: "hyomin" | "happy" }) {
    const [foods, setFoods] = useState<Food[]>([]);

    useEffect(() => {
        getTodayFood(dorm).then(setFoods);
    }, [dorm]);

    const meals = ["breakfast", "lunch", "dinner"];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {meals.map(mealType => {
                const meal = foods.find(f => f.getMealType === mealType);
                return (
                    <Card key={mealType}>
                        <CardTitle className="text-lg font-semibold p-3 border-b">
                            {/*@ts-ignore */}
                            {types[mealType]}
                        </CardTitle>
                        <CardContent className="p-4">
                            {meal
                                ? meal.food_menu
                                    .split(/\/|-/)
                                    .map((menu, i) => (
                                        <div key={i} className="mb-1">
                                            {menu.trim()}
                                        </div>
                                    ))
                                : <span className="text-gray-400">없음</span>}
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}