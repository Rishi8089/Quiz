import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const QuizAttempt = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const [timeLeft, setTimeLeft] = useState(0); // seconds

  /* ---------------- FETCH QUIZ ---------------- */
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/quizzes/${id}/`
        );
        setQuiz(res.data);

        // ⏱ convert minutes → seconds
        setTimeLeft(res.data.duration_minutes * 60);
      } catch (error) {
        console.error("Error loading quiz", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  /* ---------------- TIMER LOGIC ---------------- */
  useEffect(() => {
    if (!timeLeft || result) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(); // auto submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, result]);

  /* ---------------- HELPERS ---------------- */
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleSelect = (questionId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    if (submitting) return;

    const payload = Object.entries(answers).map(
      ([question_id, option_id]) => ({
        question_id: Number(question_id),
        option_id: Number(option_id),
      })
    );

    try {
      setSubmitting(true);
      const res = await axios.post(
        `http://127.0.0.1:8000/api/quizzes/${id}/submit/`,
        payload
      );
      setResult(res.data);
    } catch (error) {
      alert("Submission failed");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------------- STATES ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-white">
        Loading quiz...
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Quiz not found
      </div>
    );
  }

const handleSaveResult = async () => {
  try {
    await axios.post(
      "http://127.0.0.1:8000/api/results/save/",
      {
        quiz_title: quiz.title,           // ✅ REQUIRED
        score: result.score,              // ✅ REQUIRED
        total_questions: result.total,    // ✅ REQUIRED
      },
      {
        withCredentials: true,             // ✅ session auth
      }
    );
    


    alert("Result saved successfully ✅");
  } catch (error) {
    console.error("Error saving result", error);
    alert("Failed to save result ❌");
  }
};


  /* ---------------- RESULT ---------------- */
if (result) {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center p-6">
      <div className="bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center text-white max-w-md w-full">
        <h2 className="text-3xl font-bold mb-4">Quiz Result 🎉</h2>

        <p className="text-xl mb-2">Score: {result.score}</p>
        <p className="text-xl mb-2">Total: {result.total}</p>
        <p className="text-2xl font-semibold mb-6">
          Percentage: {result.percentage}%
        </p>

        <div className="flex gap-4 justify-center">
          {/* SAVE RESULT */}
          <button
            onClick={handleSaveResult}
            className="
              bg-blue-600 px-5 py-2 rounded-lg font-semibold text-white
              hover:bg-blue-700 transition
            "
          >
            💾 Save Result
          </button>

          {/* BACK TO QUIZZES */}
          <button
            onClick={() => navigate("/")}
            className="
              bg-white px-5 py-2 rounded-lg font-semibold text-green-700
              hover:bg-green-100 transition
            "
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    </div>
  );
}


  /* ---------------- QUIZ UI ---------------- */
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      <div className="max-w-4xl mx-auto bg-white/20 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">

        {/* ⏱ TIMER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">{quiz.title}</h1>
          <div className="bg-red-600 px-4 py-2 rounded-lg text-white font-semibold">
            ⏱ {formatTime(timeLeft)}
          </div>
        </div>

        {quiz.questions.map((q, index) => (
          <div key={q.id} className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              {index + 1}. {q.text}
            </h3>

            <div className="space-y-2">
              {q.options.map((opt) => (
                <label
                  key={opt.id}
                  className="flex items-center gap-3 bg-white/10 p-3 rounded-lg cursor-pointer hover:bg-white/20"
                >
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    checked={answers[q.id] === opt.id}
                    onChange={() => handleSelect(q.id, opt.id)}
                    className="accent-purple-600"
                  />
                  <span className="text-white">{opt.text}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full mt-6 bg-white text-purple-700 py-3 rounded-xl font-semibold text-lg hover:bg-purple-100 disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Quiz"}
        </button>
      </div>
    </div>
  );
};

export default QuizAttempt;
