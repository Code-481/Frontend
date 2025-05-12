// @ts-nocheck
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
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
    <div className="w-[290px]">
      <Card>
        <div className="pr-3 pl-3 p-6">
          <p className="text-3xl font-bold pb-4">오늘 대학 식단</p>

          <Card className="p-4">
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
          <div className="h-3"></div>
          <Card className="p-4">
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
      </Card>
    </div>
  );
}

export default Food_Card;
