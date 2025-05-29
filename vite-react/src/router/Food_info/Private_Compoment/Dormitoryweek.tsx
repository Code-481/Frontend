//@ts-nocheck
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getWeekFood } from "@/Api/Food/GetWeek";
import { Sandwich } from "lucide-react";
import types from "./type.json";

function Dormitoryweek() {
  const [activeTab, setActiveTab] = useState<"hyomin" | "happy">("hyomin");
  const [hyominFoods, setHyominFoods] = useState<any>({});
  const [happyFoods, setHappyFoods] = useState<any>({});

  useEffect(() => {
    // 실제로는 getWeekFood("hyomin").then(setHyominFoods) 등으로 사용
    getWeekFood("hyomin").then((result) => {
      setHyominFoods(result);
    });
    getWeekFood("happy").then((result) => {
      setHappyFoods(result);
    });
  }, []);

  // 카드 리스트 렌더링 함수
  const renderFoodCards = (
    groupedFoods: Record<string, any[]>,
    isHyomin: boolean
  ) => (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {Object.keys(groupedFoods).length === 0 ? (
        <div className="text-gray-400 p-4">식단 정보가 없습니다.</div>
      ) : (
        Object.entries(groupedFoods).map(([date, meals]) => (
          <Card key={date} className="min-w-[320px] flex-shrink-0 p-5">
            <CardTitle className="text-2xl">{date}</CardTitle>
            <CardContent>
              <div className={activeTab == "happy" ? "flex gap-x-3" : ""}>
                {meals
                  .filter((meal) =>
                    isHyomin
                      ? !["lunch_s", "dinner_s"].includes(meal.getMealType)
                      : true
                  )
                  .map((meal, idx) => (
                    <div key={idx}>
                      <span className="font-semibold">
                        {types[meal.getMealType]}
                      </span>
                      <p className="list-disc pb-3">
                        {meal.food_menu
                          .split(" / ")
                          .map((menu: string, i: number) => (
                            <p key={i} style={{ whiteSpace: "pre-line" }}>
                              {menu.replace(/-/g, "\n")}
                            </p>
                          ))}
                      </p>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );

  return (
    <div className="grid pt-5">
      {/* 탭 버튼 */}
      <div className="flex w-10 gap-x-4 mb-4">
        <Button
          variant={activeTab === "hyomin" ? "default" : "outline"}
          onClick={() => setActiveTab("hyomin")}
          className="flex-1"
        >
          효민기숙사
        </Button>
        <Button
          variant={activeTab === "happy" ? "default" : "outline"}
          onClick={() => setActiveTab("happy")}
          className="flex-1"
        >
          행복기숙사
        </Button>
      </div>
      {/* 탭 콘텐츠 */}
      <div>
        {activeTab === "hyomin" && (
          <>
            <h2 className="mb-2 font-bold text-3xl">효민기숙사 주간 식단표</h2>
            {renderFoodCards(hyominFoods, true)}
          </>
        )}
        {activeTab === "happy" && (
          <>
            <h2 className="mb-2 font-bold text-3xl">행복기숙사 주간 식단표</h2>
            {renderFoodCards(happyFoods, false)}
          </>
        )}
      </div>
    </div>
  );
}

export default Dormitoryweek;
