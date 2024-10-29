import { Routes, BrowserRouter, Route } from "react-router-dom";
import MainPage from "./Main_Components/MainPage";
import MainBody from "./Main_Components/MainBody";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<MainBody />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
