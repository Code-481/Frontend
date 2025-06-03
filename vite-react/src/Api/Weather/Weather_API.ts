import axios from "axios";

//키 사전 지정
const WEATHER_DATA_KEY = "weatherData";
const API_ERROR_MESSAGE = "날씨 데이터를 가져오는 중 오류가 발생했습니다.";

async function fetchWeatherInternal(type: string) {
  const baseUrl = "http://code418back.powerinmd.com/api/v1/weather";
  let url;
  if (type === "today") {
    url = `${baseUrl}/today`;
  } else if (type === "week") {
    url = `${baseUrl}/week`;
  } else {
    throw new Error(`Invalid weather type: ${type}`);
  }

  try {
    const res = await axios.get(url, {
      validateStatus: (status) => status >= 200 && status < 300,
    });

    if (typeof res.data === 'string' && res.data.includes(API_ERROR_MESSAGE)) {
      const error = new Error(API_ERROR_MESSAGE);
      (error as any).isApiContentError = true; // 사용자 정의 플래그
      (error as any).dataType = type;
      throw error;
    }
    return res.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 500) {
      const serverError = new Error(`API server error 500 for ${type}`);
      (serverError as any).isApi500Error = true;
      (serverError as any).dataType = type;
      throw serverError;
    }
    if (error.isApiContentError) { // 위에서 throw한 에러 다시 던지기
        throw error;
    }
    // 그 외 네트워크 오류 등
    const networkError = new Error(`Network or unexpected error fetching ${type} weather: ${error.message}`);
    (networkError as any).isNetworkError = true; // 사용자 정의 플래그
    (networkError as any).dataType = type;
    throw networkError;
  }
}

export default async function GetWeather() {
  let storedWeatherData = null;

  try {
    const storedDataString = localStorage.getItem(WEATHER_DATA_KEY);
    if (storedDataString) {
      storedWeatherData = JSON.parse(storedDataString);
    }
  } catch (e) {
    localStorage.removeItem(WEATHER_DATA_KEY);
  }

  let freshTodayDataResult;
  let freshWeeklyDataResult;
  let apiFetchErrorOccurred = false;

  const results = await Promise.allSettled([
    fetchWeatherInternal("today"),
    fetchWeatherInternal("week")
  ]);

  freshTodayDataResult = results[0];
  freshWeeklyDataResult = results[1];

  let freshTodayData: any = null;
  let freshWeeklyData: any = null;

  if (freshTodayDataResult.status === 'rejected') {
    apiFetchErrorOccurred = true;
    console.warn("Failed to fetch today's weather:", freshTodayDataResult.reason?.message || freshTodayDataResult.reason);
  } else {
    freshTodayData = freshTodayDataResult.value;
  }

  if (freshWeeklyDataResult.status === 'rejected') {
    apiFetchErrorOccurred = true;
    console.warn("Failed to fetch weekly weather:", freshWeeklyDataResult.reason?.message || freshWeeklyDataResult.reason);
  } else {
    freshWeeklyData = freshWeeklyDataResult.value;
  }

  if (apiFetchErrorOccurred) {
    if (storedWeatherData) {
      return storedWeatherData;
    } else {
      throw new Error("Failed to fetch weather data from API and no cached data available.");
    }
  }

  const freshCombinedData = {
    ...(typeof freshTodayData === 'object' && freshTodayData !== null ? freshTodayData : {}),
    weekly: Array.isArray(freshWeeklyData) ? [...freshWeeklyData] : []
  };

  if (!storedWeatherData || JSON.stringify(storedWeatherData) !== JSON.stringify(freshCombinedData)) {
    try {
      localStorage.setItem(WEATHER_DATA_KEY, JSON.stringify(freshCombinedData));
    } catch (e) {
      // localStorage 저장 실패 (예: 공간 부족)
    }
    return freshCombinedData;
  } else {
    return storedWeatherData;
  }
}
