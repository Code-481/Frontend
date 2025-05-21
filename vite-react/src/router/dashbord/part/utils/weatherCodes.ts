export function getCloudText(code: number): string {
  switch (code) {
    case 1: return "맑음";
    case 2: return "구름 많음";
    case 3: return "흐림";
    default: return "-";
  }
}
export function getWeatherIcon(cloud?: number, sky?: number): string {
  // sky는 비, 눈 등 우선 처리
  if (sky === 1) return "🌧️";
  if (sky === 2) return "🌨️";
  if (sky === 3) return "❄️";
  if (sky === 4) return "🌦️";
  if (cloud === 1) return "☀️";
  if (cloud === 2) return "⛅";
  if (cloud === 3) return "☁️";
  return "🌈";
}
const weekDayKor = ["일", "월", "화", "수", "목", "금", "토"];
export function getDayKor(date: string) {
  return weekDayKor[new Date(date).getDay()];
}
