const OptionContainer = ({
  question,
  selectedOption,
  setSelectedOption,
  correctOptionIndex,
  setCorrectOptionIndex,
}) => {
  const options = question.options;

  function clickme(index, optionObj) {
    setSelectedOption(index);
    if (optionObj.is_correct) {
      setCorrectOptionIndex(index)
    }
  }

  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          className={`btn btn-option ${
            selectedOption === index ? "answer correct" : ""
          }`}
          key={option.id}
          onClick={() => clickme(index, option)}
        >
          {option.option}
        </button>
      ))}
    </div>
  );
};

export default OptionContainer;
