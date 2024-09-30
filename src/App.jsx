import Header from "./components/Header";
import Error from "./components/Error";
import Loader from "./components/Loader";
import { useState } from "react";
import { useEffect } from "react";
import api from "./api";
import StartSceen from "./components/StartSceen";
import Main from "./components/Main";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import FinishedScreen from "./components/FinishedScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const App = () => {
  const [username, setUsername] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("loading");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [error, setError] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(null);
  const [studentScore, setStudentScore] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(null);
  const numQuestions = questions.length;
  const scorePerQuestion = 5;
  const quizMaxScore = numQuestions * scorePerQuestion;
  const SECS_PER_QUESTION = 10;

  function getQuestion() {
    api
      .get("questions")
      .then((res) => {
        setQuestions(res.data);
      })

      .catch((err) => {
        console.log(err.message);
      });
  }

  function reloadPage() {
    setLoadingStatus("finished");
    getQuestion();
  }

  useEffect(function () {
    if (localStorage.getItem("username")) {
      return reloadPage;
    }
    api
      .get("questions")
      .then((res) => {
        setQuestions(res.data);
        setLoadingStatus("ready");
        setError("");
        console.log(res.data);
      })

      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // Required for some browsers to display the warning
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="app">
      <Header />
      <h3>{studentScore}</h3>
      <h4>Time:{secondsRemaining} </h4>
      <Main>
        {error && <Error error={error} />}
        {loadingStatus === "loading" && <Loader />}
        {loadingStatus === "ready" && (
          <StartSceen
            numQuestions={numQuestions}
            setLoadingStatus={setLoadingStatus}
            username={username}
            setUsername={setUsername}
            setSecondsRemaining={setSecondsRemaining}
            SECS_PER_QUESTION={SECS_PER_QUESTION}
          />
        )}

        {loadingStatus === "active" && (
          <>
            <Question
              question={questions[questionIndex]}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              correctOptionIndex={correctOptionIndex}
              setCorrectOptionIndex={setCorrectOptionIndex}
            />

            <Footer>
              <Timer
                secondsRemaining={secondsRemaining}
                setLoadingStatus={setLoadingStatus}
                setSecondsRemaining={setSecondsRemaining}
              />
              <NextButton
                numQuestions={numQuestions}
                selectedOption={selectedOption}
                setQuestionIndex={setQuestionIndex}
                setSelectedOption={setSelectedOption}
                questionIndex={questionIndex}
                correctOptionIndex={correctOptionIndex}
                setCorrectOptionIndex={setCorrectOptionIndex}
                setStudentScore={setStudentScore}
                setLoadingStatus={setLoadingStatus}
                username={username}
                studentScore={studentScore}
              />
            </Footer>
          </>
        )}

        {loadingStatus === "finished" && (
          <FinishedScreen
            quizMaxScore={quizMaxScore}
            studentScore={studentScore}
            setUsername={setUsername}
            setStudentScore={setStudentScore}
            setLoadingStatus={setLoadingStatus}
            setSecondsRemaining={setSecondsRemaining}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
