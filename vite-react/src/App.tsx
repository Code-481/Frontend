import { Route, BrowserRouter, Routes } from "react-router";
import Main_index from "./router/Main/Main_index";

function App() {
  return (
    <>
      {/*라우터를 통해서 화면이 변하는 구역을 설정하는 곳 임*/}
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main_index />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
