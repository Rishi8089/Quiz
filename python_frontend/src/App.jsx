import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./auth/login";
import Register from "./auth/Register";

import QuizList from "./quiz/QuizList";
import QuizAttempt from "./quiz/QuizAttempt";

import ResultHistory from "./results/ResultHistory";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public pages */}
        <Route path="/" element={<Login />} />
        <Route path="/quizlist" element={<QuizList />} />
        <Route path="/register" element={<Register />} />

        {/* Quiz pages */}
        <Route path="/quizzes/:id" element={<QuizAttempt />} />

        {/* Results history */}
        <Route path="/results" element={<ResultHistory />} />

      </Routes>
    </BrowserRouter>
  );
}
