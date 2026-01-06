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

        {/* Login is now root */}
        <Route path="/" element={<Login />} />

        {/* Register */}
        <Route path="/register" element={<Register />} />

        {/* After login go here */}
        <Route path="/quizlist" element={<QuizList />} />

        {/* Quiz attempt */}
        <Route path="/quizzes/:id" element={<QuizAttempt />} />

        {/* Saved results */}
        <Route path="/history" element={<ResultHistory />} />

      </Routes>
    </BrowserRouter>
  );
}
