import OptionContainer from "./OptionContainer";
import { useState } from "react";

const Question = ({
  question,
  selectedOption,
  setSelectedOption,
  correctOptionIndex,
  setCorrectOptionIndex,
}) => {
  return (
    <div>
      <h4>{question.question}</h4>
      <OptionContainer
        question={question}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        correctOptionIndex={correctOptionIndex}
        setCorrectOptionIndex={setCorrectOptionIndex}
      />
    </div>
  );
};

export default Question;
