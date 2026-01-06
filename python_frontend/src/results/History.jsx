import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ResultHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("access");

        if (!token) {
          alert("Please login again");
          return;
        }

        const res = await axios.get(
          "http://127.0.0.1:8000/api/results/history/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setHistory(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-white text-xl">
        Loading history...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-3xl text-white font-bold text-center mb-6">
        📜 Your Quiz History
      </h1>

      {history.length === 0 ? (
        <p className="text-center text-white text-lg">
          No quiz attempts yet.
        </p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {history.map((res, idx) => (
            <div
              key={idx}
              className="bg-white/10 text-white p-4 rounded-xl shadow"
            >
              <h2 className="text-xl font-semibold">
                {res.quiz_title}
              </h2>

              <p>Score: {res.score} / {res.total_questions}</p>

              <p>Percentage: {res.percentage}%</p>

              <p className="text-sm opacity-70">
                {new Date(res.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
