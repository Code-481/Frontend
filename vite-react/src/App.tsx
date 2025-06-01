import { Route, BrowserRouter, Routes } from "react-router";
import Main_index from "./router/Main/Main_index";
import Dashboard_index_layout from "./router/dashbord/Dashboard_index_layout";
import FoodIndex from "./router/Food_info/FoodIndex";
import Busno from "./router/Bus/router/Busno";
import Busmap from "./router/Bus/router/Busmap";
import Schoolandfesta from "./router/shcoolandfestival/shcoolandfestival";

function App() {
  return (
    <>
      {/*라우터를 통해서 화면이 변하는 구역을 설정하는 곳 임*/}
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main_index />} />
            <Route path="/dashboard" element={<Dashboard_index_layout />} />
            <Route path="/foodinfo" element={<FoodIndex />} />
            <Route path="/busno/:busID" element={<Busno />} />
            <Route path="/busmap" element={<Busmap />} />
              <Route path="/shcoolandfestival" element={<Schoolandfesta/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
