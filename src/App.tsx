import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import MainPage from "./pages/MainPage";
import DictionaryPage from "./pages/DictionaryPage";
import QuizPage from "./pages/QuizPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/dictionary" element={<DictionaryPage />} />
        <Route path="*" element={<>404 not found</>} />
      </Routes>
    </BrowserRouter>
  );
}
