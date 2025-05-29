// @ts-nocheck
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

function Food_Card() {
  const [data, Setdata] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 주말 판별 함수
  const isWeekend = () => {
    const today = dayjs();
    return today.day() === 0 || today.day() === 6; // 0: 일요일, 6: 토요일
  };

  useEffect(() => {
    // 주말이면 API 호출하지 않고 로딩 상태만 false로 변경
    if (isWeekend()) {
      setLoading(false);
      return;
    }

    // 평일에만 API 호출
    axios
      .get(
        "https://raw.githubusercontent.com/asw-dod/Deu_food_api/master/output/api.json"
      )
      .then((res) => {
        for (let index = 0; index < res.data.meals.length; index++) {
          if (res.data.meals[index].date == dayjs().format("YYYY-MM-DD")) {
            //@ts-ignore
            function convertMenuData(data) {
              const result = [];

              // 날짜 정보 저장
              const date = data.date;

              // 정보공학관 메뉴 처리
              if (data.information) {
                Object.keys(data.information).forEach((cornerName) => {
                  const menus = data.information[cornerName];

                  const cornerData = {
                    building: "정보공학관",
                    corner: cornerName,
                    date: date,
                    menus: menus.map((menu) => ({
                      name: menu.menuName,
                      time: menu.menuTime,
                    })),
                  };

                  result.push(cornerData);
                });
              }

              // 수덕전 메뉴 처리
              if (data.suduck) {
                Object.keys(data.suduck).forEach((cornerName) => {
                  const menus = data.suduck[cornerName];

                  const cornerData = {
                    building: "수덕전",
                    corner: cornerName,
                    date: date,
                    menus: menus.map((menu) => ({
                      name: menu.menuName,
                      time: menu.menuTime,
                    })),
                  };

                  result.push(cornerData);
                });
              }

              return result;
            }
            //@ts-ignore
            Setdata(convertMenuData(res.data.meals[index]));
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  console.log(data);

  // 주말인 경우 운영 중단 메시지 표시
  if (isWeekend()) {
    return (
      <div className="w-full lg:w-[31vw]">
        <Card className="h-[46vh] xl:h-[auto] md:overflow-y-auto">
          <div className="p-4">
            <p className="text-3xl font-bold pb-3">대학 식당 안내</p>
            <div className="text-center py-8">
              <div className="mb-6">
                <span className="text-6xl">🍽️</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">주말 운영 안내</h3>
              <p className="text-gray-600 text-lg">대학 식당은 주말에 운영하지 않습니다.</p>
              <p className="text-gray-600 mt-2">평일(월~금)에 이용해 주세요.</p>
              <div className="mt-6 text-sm text-gray-500">
                <p>운영시간: 평일 11:30 - 14:00, 17:00 - 19:00</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // 평일 메뉴 표시 (기존 코드)
  return (
    <div className="w-full lg:w-[31vw]">
      <Card className="h-[46vh] xl:h-[auto] md:overflow-y-auto">
        <div className="p-4">
          <p className="text-3xl font-bold pb-3">오늘 대학 식단</p>
          <div className="grid gap-y-3">
            <div className="flex gap-x-6">
              <Card className="p-4 w-[10vw] lg:w-[13vw]">
                <div className="">
                  <CardTitle className="text-lg">
                    {/*@ts-ignore*/}
                    {data[0]?.corner == undefined ? "데이터를 가져오는중" : data[0]?.corner}
                  </CardTitle>
                  <CardDescription className="text-md">
                    {/*@ts-ignore*/}
                    {data[0]?.menus[0]?.name == undefined ? "데이터를 가져오는중" : data[0]?.menus[0]?.name}
                  </CardDescription>
                </div>
                <div className="">
                  <CardTitle className="text-lg">
                    {/*@ts-ignore*/}
                    {data[1]?.corner == undefined ? "데이터를 가져오는중" : data[1]?.corner}
                  </CardTitle>
                  <CardDescription className="text-md">
                    {/*@ts-ignore*/}
                    {data[1]?.menus[0]?.name == undefined ? "데이터를 가져오는중" : data[1]?.menus[0]?.name}
                  </CardDescription>
                </div>
                <div>
                  <CardTitle className="text-lg">
                    {/*@ts-ignore*/}
                    {data[2]?.corner == undefined ? "데이터를 가져오는중" : data[2]?.corner}
                  </CardTitle>
                  <CardDescription className="text-md">
                    {/*@ts-ignore*/}
                    {data[2]?.menus[0]?.name == undefined ? "데이터를 가져오는중" : data[2]?.menus[0]?.name}
                  </CardDescription>
                </div>
              </Card>
              <Card className="p-4  w-[10vw] lg:w-[13vw]">
                <div className="">
                  <CardTitle className="text-lg">
                    {/*@ts-ignore*/}
                    {data[3]?.corner == undefined ? "데이터를 가져오는중" : data[3]?.corner}
                  </CardTitle>
                  <CardDescription className="text-md">
                    {/*@ts-ignore*/}
                    {data[3]?.menus[0]?.name == undefined ? "데이터를 가져오는중" : data[3]?.menus[0]?.name}
                  </CardDescription>
                </div>
                <div className="">
                  <CardTitle className="text-lg">
                    {/*@ts-ignore*/}
                    {data[4]?.corner == undefined ? "데이터를 가져오는중" : data[4]?.corner}
                  </CardTitle>
                  <CardDescription className="text-md">
                    {/*@ts-ignore*/}
                    {data[4]?.menus[0]?.name == undefined ? "데이터를 가져오는중" : data[4]?.menus[0]?.name}
                  </CardDescription>
                </div>
                <div className="">
                  <CardTitle className="text-lg">
                    {/*@ts-ignore*/}
                    {data[5]?.corner == undefined ? "데이터를 가져오는중" : data[5]?.corner}
                  </CardTitle>
                  <CardDescription className="text-md">
                    {/*@ts-ignore*/}
                    {data[5]?.menus[0]?.name == undefined ? "데이터를 가져오는중" : data[5]?.menus[0]?.name}
                  </CardDescription>
                </div>
                <div className="">
                  <CardTitle className="text-lg">
                    {/*@ts-ignore*/}
                    {data[6]?.corner == undefined ? "데이터를 가져오는중" : data[6]?.corner}
                  </CardTitle>
                  <CardDescription className="text-md">
                    {/*@ts-ignore*/}
                    {data[6]?.menus[0]?.name == undefined ? "데이터를 가져오는중" : data[6]?.menus[0]?.name}
                  </CardDescription>
                </div>
              </Card>
            </div>
            <div>
              <Card className="p-4">
                <CardTitle className="text-lg">
                  수덕전 골든벨 (커피류)
                </CardTitle>
                <CardContent className="pl-4">
                  <table >
                    <tbody >
                      <tr>
                        <td>골드브루: 2000원</td>
                        <td>ㅤㅤ</td>
                        <td>바닐라라떼: 3000원</td>
                      </tr>
                      <tr>
                        <td>더치커피: 2000원</td>
                        <td></td>
                        <td>카페모카: 3000원</td>
                      </tr>
                      <tr>
                        <td>카페라떼: 2500원</td>
                        <td></td>
                        <td>카라메멜 마끼아또: 3000원</td>
                      </tr>
                      <tr>
                        <td>카푸치노: 2500원</td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Food_Card;
