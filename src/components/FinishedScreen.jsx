import { useEffect } from "react";
import api from "../api";

const FinishedScreen = ({
  quizMaxScore,
  studentScore,
  setUsername,
  setStudentScore,
  setLoadingStatus,
  setSecondsRemaining
}) => {
  const percentage = (studentScore / quizMaxScore) * 100;
  const username = localStorage.getItem("username")
  let emoji;
  if (percentage == 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "👏";
  if (percentage > 0 && percentage < 50) emoji = "🤔";
  if (percentage == 0) emoji = "🥺";

  function restartQuiz(){
    localStorage.removeItem("username")
    setLoadingStatus("ready")
    setStudentScore(0)
    setUsername(null)
    setSecondsRemaining(null)
  }

//   const studentInfo = { score: studentScore, username };

//   useEffect(function () {
//     api
//       .post("submit_quiz", studentInfo)
//       .then((res) => {
//         setUsername(res.data.username);
//         setStudentScore(res.data.score);
//         setLoadingStatus("finished")
//       })
//       .catch((err) => console.log(err.message));
//   }, []);

  return (
    <>
      <p className="result">
        <span>{emoji}</span>Hi {username}, you scored{" "}
        <strong>{studentScore}</strong> out of {quizMaxScore} ({percentage}%)
      </p>
      <p className="highscore">(HighScore: {studentScore} points)</p>

      <button
        className=" btn btn-ui"
          onClick={restartQuiz}
      >
        Restart Quiz
      </button>
    </>
  );
};

export default FinishedScreen;
