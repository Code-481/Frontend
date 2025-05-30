import { Button } from "@/components/ui/button";
import deubackground from "../../assets/image/deu-background.png";
import deulogo from "../../assets/image/deu-logo.png";
import { FaBusSimple } from "react-icons/fa6";
import { useNavigate } from "react-router";

function Main_index() {

  const navigate = useNavigate();

  const navigateToDashboard = () => {
    navigate("/dashboard");
  };


  return (
    <div className="flex h-screen w-screen">
      {/* 미Action 구역 */}
      <div className="grow-7 h-full">
        <div className="grid grid-rows-[65px_1fr_120px] h-full">
          <div className="bg-black flex items-center px-2 text-3xl font-bold gap-x-5 pl-5">
            <img src={deulogo} className="h-10" />
            <p className="text-white">DEU Info Service</p>
          </div>
          <div className="h-full">
            <img
              src={deubackground}
              alt="background"
              draggable={false}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-black grid content-center pl-10">
            <span className="text-white text-sm">
              “캠퍼스 곳곳의 실시간 버스, 학교 정보를 한눈에. 바쁜 하루 속,
              여러분의 시간을 아껴드립니다“
            </span>
            <span className="text-white text-sm">Code 418</span>
          </div>
        </div>
      </div>
      {/* Action 구역 */}
      <div className="grid place-content-center h-full w-[130vw] 2xl:w-[60vw]">
        {/* 텍스트 표시 */}
        <div className="text-center pb-10">
          <p className="font-semibold text-3xl 2xl:text-4xl">
            Welcome to DEU Info Service
          </p>
          <p className="text-gray-500">원하는 서비스를 선택해주세요.</p>
        </div>
        {/**버튼 */}
        <div className="grid gap-y-2 pb-5 text-sm 2xl:text-xl">
          <Button onClick={navigateToDashboard} className="">한눈에 보기</Button>
          <Button className=""  onClick={() => navigate("/foodinfo")}>학식/기숙사 식단 보기</Button>
          <Button className=""  onClick={() => navigate("/busmap")}>버스맵 이동</Button>
        </div>
        <div className="separator">DEU BUS INFO</div>
        <div className="grid justify-items-start pt-5 pl-10 gap-y-3">
          <Button variant="ghost" className="text-lg" onClick={() => navigate("/Busno/b64c6as")}>
            <FaBusSimple color="#0B3D91" />
            진구 6번
          </Button>
          <Button variant="ghost" className="text-lg"  onClick={() => navigate("/Busno/12c69as")}>
            <FaBusSimple color="#0B3D91" />
            진구 6-1번
          </Button>
          <Button variant="ghost" className="text-lg"  onClick={() => navigate("/Busno/as5c67as")}>
            <FaBusSimple color="#8BC34A" />
            진구 9번
          </Button>
          {/* <Button variant="ghost" className="text-lg">
            <FaBusSimple color="#2096F3" />
            110-1번
          </Button> */}
        </div>
        <div className="text-center text-[0.8rem] pt-5">
          <p>위 버스 번호를 터치하거나 클릭 하시면</p>
          <p>공공데이터 포털에서 데이터를 가지고 와서 보여드림니다.</p>
        </div>
      </div>
    </div>
  );
}

export default Main_index;
