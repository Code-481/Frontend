import axios from "axios";
import dayjs from "dayjs";

// 식단 데이터 가져와서 localStorage에 저장
async function fetchAndStoreData(place: string) {
    try {
        const res = await axios.get(
            `http://code418beta.powerinmd.com/api/v1/univ/foods?place=${place}`
        );
        window.localStorage.setItem(place, JSON.stringify(res.data));
        return res.data;
    } catch (error) {
        console.error("식단 데이터 가져오는데 오류 발생: " + error);
        return null;
    }
}

// 오늘 날짜의 식단 데이터만 필터링
function filterTodayData(data: any[]) {
    const todayStr = dayjs().format("YYYY-MM-DD");
    return data.filter(item => item.date === todayStr);
}

// place별로 mealType 정렬 우선순위 지정
function getMealOrder(place: string): string[] {
    if (place === "happy") {
        return ["breakfast", "lunch", "lunch_s", "dinner", "dinner_s"];
    } else if (place === "hyomin") {
        return ["breakfast", "lunch", "dinner"];
    }
    // 기본값: breakfast -> lunch -> dinner
    return ["breakfast", "lunch", "dinner"];
}

// 정렬 함수
function sortByMealOrder(data: any[], mealOrder: string[]) {
    return data.sort(
        (a, b) =>
            mealOrder.indexOf(a.getMealType) - mealOrder.indexOf(b.getMealType)
    );
}

// 오늘 식단 데이터 가져오기 (정렬 포함)
export default async function getTodayFood(place: string) {
    let dataStr = window.localStorage.getItem(place);
    let data = dataStr ? JSON.parse(dataStr) : null;
    let todayData = data ? filterTodayData(data) : [];

    // 오늘 데이터가 없으면 새로 받아옴
    if (!todayData.length) {
        data = await fetchAndStoreData(place);
        todayData = data ? filterTodayData(data) : [];
    }

    // 정렬
    const mealOrder = getMealOrder(place);
    todayData = sortByMealOrder(todayData, mealOrder);

    return todayData;
}
