import { Route, BrowserRouter, Routes } from "react-router";
import Main_index from "./router/Main/Main_index";
import Dashboard_index_layout from "./router/dashbord/Dashboard_index_layout";

function App() {
  return (
    <>
      {/*라우터를 통해서 화면이 변하는 구역을 설정하는 곳 임*/}
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main_index />} />
            <Route path="/dashboard" element={<Dashboard_index_layout />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
