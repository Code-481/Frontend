export function getWeatherBgGradient(cloud: number, sky: number): string {
  if (sky === 1) return "linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)"; // 비
  if (sky === 2) return "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)"; // 비/눈
  if (sky === 3) return "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)"; // 눈
  if (sky === 4) return "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)"; // 소나기
  if (cloud === 1) return "linear-gradient(135deg, #45a3c2 0%, #2666be 100%)"; // 맑음 (어둡게)
  if (cloud === 2) return "linear-gradient(135deg, #b2fefa 0%, #0ed2f7 100%)"; // 구름 많음
  if (cloud === 3) return "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)"; // 흐림
  return "linear-gradient(135deg, #6dd5fa 0%, #2980b9 100%)"; // 기본
}
