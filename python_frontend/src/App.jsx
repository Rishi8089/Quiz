import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./auth/Login";
import Register from "./auth/Register";

import QuizList from "./quiz/QuizList";
import QuizAttempt from "./quiz/QuizAttempt";

import Result from "./results/Result";
import History from "./results/History";

// import AdminDashboard from "./admin/AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<QuizList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/quizzes/:id" element={<QuizAttempt />} />

        <Route path="/result/:id" element={<Result />} />
        <Route path="/history" element={<History />} />

        {/* <Route path="/admin" element={<AdminDashboard />} /> */}

      </Routes>
    </BrowserRouter>
  );
}
