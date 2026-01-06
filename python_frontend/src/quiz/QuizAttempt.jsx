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

  const [timeLeft, setTimeLeft] = useState(0);

  // NEW STATE FOR HISTORY
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);

  // FETCH QUIZ
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/quizzes/${id}/`
        );
        setQuiz(res.data);
        setTimeLeft(res.data.duration_minutes * 60);
      } catch (error) {
        console.error("Error loading quiz", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  // TIMER
  useEffect(() => {
    if (!timeLeft || result) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, result]);

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

  // SUBMIT QUIZ + AUTO SAVE RESULT
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

      // submit answers
      const res = await axios.post(
        `http://127.0.0.1:8000/api/quizzes/${id}/submit/`,
        payload
      );

      const quizResult = res.data;
      setResult(quizResult);

      // auto save
      const token = localStorage.getItem("access");

      if (token) {
        await axios.post(
          "http://127.0.0.1:8000/api/results/save/",
          {
            quiz_title: quiz.title,
            score: quizResult.score,
            total_questions: quizResult.total,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Result auto-saved ✔️");
      } else {
        console.log("No token → result not saved");
      }
    } catch (error) {
      console.error("Submission failed", error);
      alert("Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  // LOAD QUIZ HISTORY
  const loadHistory = async () => {
    const token = localStorage.getItem("access");

    if (!token) {
      alert("Login first");
      navigate("/");
      return;
    }

    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/results/history/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHistory(res.data);
      setShowHistory(true);
    } catch (err) {
      console.error(err);
      alert("Failed to load history");
    }
  };

  // LOADING
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

  // RESULT SCREEN
  if (result) {
    return (
      <div className="min-h-screen bg-slate-900 p-6 text-white">
        <div className="max-w-2xl mx-auto bg-white/10 p-6 rounded-2xl shadow-lg">

          <h2 className="text-3xl font-bold mb-4 text-center">
            🎉 Quiz Result
          </h2>

          <p className="text-xl mb-2">Score: {result.score}</p>
          <p className="text-xl mb-2">Total: {result.total}</p>
          <p className="text-2xl font-semibold mb-4">
            Percentage: {result.percentage}%
          </p>

          <div className="flex gap-4 justify-center mb-6">

            <button
              onClick={loadHistory}
              className="bg-blue-600 px-5 py-2 rounded-lg font-semibold hover:bg-blue-700"
            >
              📜 View Result History
            </button>

            <button
              onClick={() => navigate("/quizlist")}
              className="bg-green-500 px-5 py-2 rounded-lg font-semibold text-black hover:bg-green-400"
            >
              Back to Quizzes
            </button>
          </div>

          {/* HISTORY BLOCK */}
          {showHistory && (
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-3">
                🎯 Your Quiz History
              </h3>

              {history.length === 0 ? (
                <p>No history yet</p>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto pr-2">

                  {history.map((h, index) => (
                    <div
                      key={index}
                      className="bg-black/40 p-4 rounded-xl"
                    >
                      <p className="font-semibold">{h.quiz_title}</p>

                      <p>Score: {h.score} / {h.total_questions}</p>

                      <p>Percentage: {h.percentage}%</p>

                      <p className="text-sm text-gray-300">
                        Taken on: {new Date(h.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))}

                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // QUIZ ATTEMPT UI
  return (
    <div className="min-h-screen bg-indigo-700 p-6 text-white">
      <div className="max-w-4xl mx-auto bg-white/10 p-8 rounded-2xl">

        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-bold">{quiz.title}</h1>

          <div className="bg-red-600 px-4 py-2 rounded-lg">
            ⏱ {formatTime(timeLeft)}
          </div>
        </div>

        {quiz.questions.map((q, i) => (
          <div key={q.id} className="mb-6">
            <h3 className="text-lg font-semibold mb-2">
              {i + 1}. {q.text}
            </h3>

            {q.options.map((opt) => (
              <label
                key={opt.id}
                className="block bg-white/10 p-2 rounded mb-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  checked={answers[q.id] === opt.id}
                  onChange={() => handleSelect(q.id, opt.id)}
                  className="mr-2"
                />
                {opt.text}
              </label>
            ))}
          </div>
        ))}

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-white text-purple-700 py-3 rounded-xl font-semibold text-lg"
        >
          {submitting ? "Submitting..." : "Submit Quiz"}
        </button>
      </div>
    </div>
  );
};

export default QuizAttempt;
