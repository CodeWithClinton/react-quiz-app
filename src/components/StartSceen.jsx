import { useState } from "react";
import api from "../api";
import Error from "./Error";

const StartSceen = ({
  username,
  numQuestions,
  setLoadingStatus,
  setUsername,
  setSecondsRemaining,
  SECS_PER_QUESTION,
}) => {
  const [error, setError] = useState("");

  function startQuiz() {
    api
      .post("has_taken_quiz/", { username })
      .then((res) => {
        setLoadingStatus("active");
        setError("");
        localStorage.setItem("username", username);

        setSecondsRemaining(numQuestions * SECS_PER_QUESTION);
      })
      .catch((err) => {
        setError(err.response.data.error);
        console.log(err.response.data.error);
        setUsername("");
      });
  }

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      {error && <Error error={error} />}
      <input
        placeholder="Enter username"
        className="btn btn-ui"
        style={{ marginBottom: "20px", textTransform: "uppercase" }}
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <button
        className="btn btn-ui"
        onClick={startQuiz}
        disabled={username === null}
      >
        Let's start
      </button>
    </div>
  );
};

export default StartSceen;
