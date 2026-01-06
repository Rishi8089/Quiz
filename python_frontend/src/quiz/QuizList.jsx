import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/accounts/logout/",
        {},
        { withCredentials: true } // REQUIRED for Django sessions
      );

      // Optional: clear frontend data
      localStorage.clear();
      sessionStorage.clear();

      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
      navigate("/login"); // fallback
    }
  };

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/quizzes/");
        setQuizzes(res.data);
      } catch (error) {
        console.error("Failed to load quizzes", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading quizzes...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 p-8">
      <div className="flex justify-end">
  <button
    className="
      flex items-center gap-2
      px-5 py-2.5
      rounded-xl
      bg-linear-to-r from-red-500 to-pink-600
      text-white font-semibold
      shadow-lg shadow-red-500/30
      hover:from-red-600 hover:to-pink-700
      hover:scale-105
      active:scale-95
      transition-all duration-200
    "
    onClick={handleLogout} 
  >
    🚪 Logout
  </button>
</div>

      <h1 className="text-4xl font-bold text-white text-center mb-10">
        Available Quizzes 🧠
      </h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white/20 backdrop-blur-xl p-6 rounded-2xl shadow-xl 
                       hover:scale-105 transition-transform cursor-pointer"
            onClick={() => navigate(`/quizzes/${quiz.id}`)}
          >
            <h2 className="text-2xl font-semibold text-white mb-2">
              {quiz.title}
            </h2>

            <p className="text-white/90 mb-4">
              {quiz.description || "No description provided"}
            </p>

            <div className="flex justify-between items-center">
              {/* <span className="text-sm text-white/80">
                Questions: {quiz.total_questions ?? "N/A"}
              </span> */}

              <button
                className="bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold 
                           hover:bg-purple-100"
              >
                Start Quiz →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList;
