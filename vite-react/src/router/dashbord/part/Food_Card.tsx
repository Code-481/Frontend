// @ts-nocheck
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

function Food_Card() {
  const [data, Setdata] = useState([]);
  useEffect(() => {
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
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  console.log(data);

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
                    {data[0]?.menus[0].name == undefined ? "데이터를 가져오는중" : data[0]?.menus[0].name}
                  </CardDescription>
                </div>
                <div className="">
                  <CardTitle className="text-lg">
                    {/*@ts-ignore*/}
                    {data[1]?.corner == undefined ? "데이터를 가져오는중" : data[1]?.corner}
                  </CardTitle>
                  <CardDescription className="text-md">
                    {/*@ts-ignore*/}
                    {data[1]?.menus[0].name == undefined ? "데이터를 가져오는중" : data[1]?.menus[0].name}
                  </CardDescription>
                </div>
                <div>
                  <CardTitle className="text-lg">
                    {/*@ts-ignore*/}
                    {data[2]?.corner == undefined ? "데이터를 가져오는중" : data[2]?.corner}
                  </CardTitle>
                  <CardDescription className="text-md">
                    {/*@ts-ignore*/}
                    {data[2]?.menus[0].name == undefined ? "데이터를 가져오는중" : data[2]?.menus[0].name}
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
                    {data[3]?.menus[0].name == undefined ? "데이터를 가져오는중" : data[3]?.menus[0].name}
                  </CardDescription>
                </div>
                <div className="">
                  <CardTitle className="text-lg">
                    {/*@ts-ignore*/}
                    {data[4]?.corner == undefined ? "데이터를 가져오는중" : data[4]?.corner}
                  </CardTitle>
                  <CardDescription className="text-md">
                    {/*@ts-ignore*/}
                    {data[4]?.menus[0].name == undefined ? "데이터를 가져오는중" : data[4]?.menus[0].name}
                  </CardDescription>
                </div>
                <div className="">
                  <CardTitle className="text-lg">
                    {/*@ts-ignore*/}
                    {data[5]?.corner == undefined ? "데이터를 가져오는중" : data[5]?.corner}
                  </CardTitle>
                  <CardDescription className="text-md">
                    {/*@ts-ignore*/}
                    {data[5]?.menus[0].name == undefined ? "데이터를 가져오는중" : data[5]?.menus[0].name}
                  </CardDescription>
                </div>
                <div className="">
                  <CardTitle className="text-lg">
                    {/*@ts-ignore*/}
                    {data[6]?.corner == undefined ? "데이터를 가져오는중" : data[6]?.corner}
                  </CardTitle>
                  <CardDescription className="text-md">
                    {/*@ts-ignore*/}
                    {data[6]?.menus[0].name == undefined ? "데이터를 가져오는중" : data[6]?.menus[0].name}
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
