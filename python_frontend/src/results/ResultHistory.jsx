import { useEffect, useState } from "react";
import axios from "axios";

export default function ResultHistory() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      alert("Login first");
      window.location.href = "/";
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/results/history/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setResults(res.data))
      .catch(() => alert("Failed to load history"))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Loading history...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-900 p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🎯 Your Quiz History
      </h1>

      {results.length === 0 && (
        <p className="text-center text-lg">No results yet.</p>
      )}

      <div className="max-w-3xl mx-auto space-y-4">
        {results.map((r, i) => (
          <div
            key={i}
            className="bg-white/10 p-4 rounded-xl border border-white/20"
          >
            <h2 className="text-xl font-semibold">{r.quiz_title}</h2>

            <p>Score: {r.score} / {r.total_questions}</p>
            <p>Percentage: {r.percentage}%</p>
            <p className="text-sm text-gray-300">
              Taken on: {new Date(r.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
