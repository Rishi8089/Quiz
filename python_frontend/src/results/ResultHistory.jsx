import React, { useEffect, useState } from "react";
import { saveResult } from "../services/resultService";

export default function Result({ quizTitle, score, totalQuestions }) {
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    const submitResult = async () => {
      try {
        const response = await saveResult({
          quiz_title: quizTitle,
          score: score,
          total_questions: totalQuestions,
        });

        setResultData(response.data);
      } catch (error) {
        console.error("Failed to save result", error);
      }
    };

    submitResult();
  }, [quizTitle, score, totalQuestions]);

  if (!resultData) return <p>Saving your result...</p>;

  return (
    <div>
      <h2>Quiz Result</h2>
      <p>Quiz: {resultData.quiz_title}</p>
      <p>Score: {resultData.score}</p>
      <p>Total Questions: {resultData.total_questions}</p>
      <p>Percentage: {resultData.percentage}%</p>
    </div>
  );
}
