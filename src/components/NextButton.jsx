import api from "../api";

const NextButton = ({
  selectedOption,
  setQuestionIndex,
  setSelectedOption,
  numQuestions,
  questionIndex,
  correctOptionIndex,
  setCorrectOptionIndex,
  setStudentScore,
  setLoadingStatus,
  username,
  studentScore,
}) => {
  const nextButton = () => {
    if (correctOptionIndex === selectedOption) {
      setStudentScore((prev) => prev + 5);
    }

    setQuestionIndex((prev) => prev + 1);
    setSelectedOption(null);
    setCorrectOptionIndex(null);
    setSelectedOption(null);
  };

  const finishQuiz = () => {
    setStudentScore((prev) => {
      const updatedScore = prev + 5;

      // Prepare student info with the updated score
      const studentInfo = { score: updatedScore, username: username };

      // Submit quiz with the updated score
      api
        .post("submit_quiz/", studentInfo)
        .then((res) => {
          setLoadingStatus("finished");
          setSelectedOption(null);
          setCorrectOptionIndex(null);
        })
        .catch((err) => console.log(err.message));

      return updatedScore; // Return the updated score to actually set it in state
    });
  };



  if (selectedOption === null) return null;

  if (questionIndex === numQuestions - 1)
    return (
      <button className=" btn btn-ui" onClick={finishQuiz}>
        Finish
      </button>
    );

  if (questionIndex < numQuestions - 1)
    return (
      <button className=" btn btn-ui" onClick={nextButton}>
        Next
      </button>
    );
};

export default NextButton;
