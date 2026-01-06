import { useEffect, useState } from "react";
import axios from "axios";

export default function ResultHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("access");

      if (!token) {
        alert("Login first");
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
      } catch (err) {
        console.log(err);
        alert("Could not load results ❌");
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📜 Result History
      </h1>

      {history.length === 0 ? (
        <p className="text-center text-gray-300">
          No results saved yet.
        </p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {history.map((r, index) => (
            <div
              key={index}
              className="bg-white/10 p-4 rounded-xl border border-white/20"
            >
              <h2 className="text-xl font-semibold">{r.quiz_title}</h2>
              <p>Score: {r.score}/{r.total_questions}</p>
              <p>Percentage: {r.percentage}%</p>
              <p className="text-sm text-gray-300">
                {new Date(r.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
