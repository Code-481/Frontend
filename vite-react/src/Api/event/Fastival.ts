import axios from "axios";

export async function Fast_API() {
  try {
    const res = await axios.get(
      `http://code418back.powerinmd.com/api/v1/festival/info`
    );

    // API 응답 데이터가 배열 형태인지 확인
    if (Array.isArray(res.data)) {
      const filteredData = res.data.filter((item) => {
        if (
          item &&
          item.fields &&
          typeof item.fields["이용요일 및 시간"] === "string"
        ) {
          return item.fields["이용요일 및 시간"].includes("2025");
        }
        return false;
      });
      return filteredData;
    } else {
      console.warn(
        "API 응답 데이터가 예상한 배열 형식이 아닙니다. 실제 데이터 구조를 확인해주세요.",
        res.data
      );

      return [];
    }
  } catch (error) {
    console.error("Fast_API 호출 중 오류 발생:", error);
    return [];
  }
}
