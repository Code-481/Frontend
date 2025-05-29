import axios from "axios";
import dayjs from "dayjs";

// 식단 데이터 타입 정의
export interface MealData {
    date: string;
    dormType: string;
    food_menu: string;
    getMealType: string;
}

// 1. 서버에서 데이터 받아와 localStorage에 저장
async function fetchAndStoreData(place: string): Promise<MealData[] | null> {
    try {
        const res = await axios.get(
            `http://code418back.powerinmd.com/api/v1/univ/foods?place=${place}`
        );
        window.localStorage.setItem(place, JSON.stringify(res.data));
        return res.data;
    } catch (error) {
        console.error("식단 데이터 가져오는데 오류 발생: " + error);
        return null;
    }
}

// 2. 오늘부터 7일(일주일) 날짜 배열 생성
function getWeekDates(): string[] {
    const today = dayjs();
    return Array.from({ length: 7 }, (_, i) =>
        today.add(i, "day").format("YYYY-MM-DD")
    );
}

// 3. 일주일치 데이터만 필터링
function filterWeekData(data: MealData[]): MealData[] {
    const weekDates = getWeekDates();
    return data.filter(item => weekDates.includes(item.date));
}

// 4. place별 mealType 정렬 우선순위
function getMealOrder(place: string): string[] {
    if (place === "happy") {
        return ["breakfast", "lunch", "lunch_s", "dinner", "dinner_s"];
    } else if (place === "hyomin") {
        return ["breakfast", "lunch", "dinner"];
    }
    return ["breakfast", "lunch", "dinner"];
}

// 5. mealType 우선순위로 정렬
function sortByMealOrder(data: MealData[], mealOrder: string[]): MealData[] {
    return data.slice().sort(
        (a, b) =>
            mealOrder.indexOf(a.getMealType) - mealOrder.indexOf(b.getMealType)
    );
}

// 6. 일주일치 식단 데이터 가져오기 (날짜별 그룹핑)
export async function getWeekFood(place: string): Promise<Record<string, MealData[]>> {
    let dataStr = window.localStorage.getItem(place);
    let data: MealData[] | null = dataStr ? JSON.parse(dataStr) : null;
    let weekData: MealData[] = data ? filterWeekData(data) : [];

    // 일주일치 데이터가 없으면 새로 받아옴
    if (!weekData.length) {
        data = await fetchAndStoreData(place);
        weekData = data ? filterWeekData(data) : [];
    }

    const mealOrder = getMealOrder(place);

    // 날짜별로 그룹핑
    const grouped: Record<string, MealData[]> = {};
    weekData.forEach(item => {
        if (!grouped[item.date]) grouped[item.date] = [];
        grouped[item.date].push(item);
    });

    // 각 날짜별로 mealType 정렬
    Object.keys(grouped).forEach(date => {
        grouped[date] = sortByMealOrder(grouped[date], mealOrder);
    });

    return grouped; // { "2025-05-29": [...], "2025-05-30": [...], ... }
}
