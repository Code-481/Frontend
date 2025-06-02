//@ts-nocheck
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../APublic_Compoment/AppSidebar";
import Topnav from "../APublic_Compoment/Topnav";
import { useEffect, useState } from "react";
import { Fast_API } from "@/Api/event/Fastival";
import Festival from "../dashbord/Private_Compoment/Festival";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import MonthlySchedulePage from "@/router/shcoolandfestival/Compoment/MonthlySchedulePage";

function Schoolandfesta() {
  const [contentID, setcontentID] = useState(0);
  const [fastival, setfastival] = useState([{}]);
  const [listconetenID, setlistconetenID] = useState([]);
  const [selectedContentId, setSelectedContentId] = useState();

  const handleValueChange = (value: string) => {
    setSelectedContentId(search_data(value));
    console.log(selectedContentId);
  };

  function search_data(search_id) {
    if (!Array.isArray(fastival)) {
      console.error("오류: 입력 데이터가 배열이 아닙니다.");
      return null;
    }

    for (const item of fastival) {
      if (
        item &&
        typeof item === "object" &&
        item.fields &&
        typeof item.fields === "object"
      ) {
        const fields = item.fields;
        if (
          fields["\uFEFF콘텐츠ID"] === search_id ||
          fields["﻿콘텐츠ID"] === search_id
        ) {
          return item.fields;
        }
      }
    }
    return null;
  }

  async function One_more_thing() {
    const parsedData = await Fast_API();
    const extractedObjects = [];

    setfastival(parsedData);

    if (Array.isArray(parsedData)) {
      parsedData.forEach((item) => {
        if (
          item &&
          typeof item === "object" &&
          item.fields &&
          typeof item.fields === "object"
        ) {
          const fields = item.fields;
          const contentId = fields["\uFEFF콘텐츠ID"];
          const title = fields["제목"];
          if (contentId !== undefined && title !== undefined) {
            extractedObjects.push({
              conetentID: contentId,
              title: title,
            });
          }
        }
      });
    }
    setlistconetenID(extractedObjects);
  }

  useEffect(() => {
    One_more_thing();
  }, []);

  return (
    <>
      <Topnav />
      <div className="flex w-screen">
        {/* Side */}
        {true ? (
          <div className="hidden xl:block">
            <SidebarProvider>
              <AppSidebar />
            </SidebarProvider>
          </div>
        ) : null}
        {/* content */}
        <div className={false ? "flex p-5 " : "flex p-5  flex-grow w-full "}>
          <div className="w-7/10 max-h-[85vh]  overflow-y-auto">
            {/* 부산 축제 상세 정보조회 */}
            <div className="pr-5">
              <p className="text-3xl font-bold">부산 축제 정보 조회</p>
              <p className="pb-4">
                아래 리스트 버튼을 눌려서 조회할 축제를 선택해주세요
              </p>
              <Select onValueChange={handleValueChange}>
                <SelectTrigger className="w-[25vw]">
                  <SelectValue placeholder="선택해주세요." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>선택해주세요</SelectLabel>
                    {listconetenID.map((data) => (
                      <SelectItem value={data.conetentID} key={data.conetentID}>
                        {data.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* 선택된 데이터가 있을 경우 화면에 표시 */}
              {!selectedContentId && (
                <div className="mt-6 p-4 border rounded-lg shadow-md bg-yellow-50 text-yellow-700">
                  <p>선택한 데이터가 없거나 없습니다.</p>
                </div>
              )}
              {selectedContentId && (
                <div className="mt-6 p-4 border rounded-lg shadow-md bg-gray-50">
                  <p className="text-xl font-bold">
                    {selectedContentId["제목"]}
                  </p>
                  <div className="pt-4">
                    <div className="flex justify-center">
                      <img
                        className="w-[40vw]"
                        src={selectedContentId["이미지URL"]}
                        alt=""
                      />
                    </div>
                    <p className="font-bold">[이용요금]</p>
                    {selectedContentId["이용요금"]}
                    <p className="font-bold">[주요 장소]</p>
                    {selectedContentId["주요장소"]}
                    <p className="font-bold">[장소]</p>
                    {selectedContentId["장소"]}
                    <p className="font-bold">[주소]</p>
                    {selectedContentId["주소"]}

                    <hr />
                    <p className="font-bold pb-2">[행사나용]</p>
                    {selectedContentId["상세내용"]}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            {/* 학교 학사일정 */}
            <div className="p-10">
              <p className="text-3xl font-bold">학사 일정 조회</p>
              <p className="pb-4">이번달 학사정보를 확인해보세요!</p>
              <MonthlySchedulePage />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Schoolandfesta;
