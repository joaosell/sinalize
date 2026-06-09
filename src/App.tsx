import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import MainPage from "./pages/MainPage";
import DictionaryPage from "./pages/DictionaryPage";
import QuizPage from "./pages/QuizPage";
import Layout from "./components/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/dictionary" element={<DictionaryPage />} />
          <Route path="*" element={<>404 not found</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
