import { Routes, BrowserRouter, Route } from "react-router-dom";
import MainPage from "./Main_Components/MainPage";
import MainBody from "./Main_Components/MainBody";
import Genres from "./Main_Components/Genres/Genres";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<MainBody />} />
          <Route path="genres" element={<Genres />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
