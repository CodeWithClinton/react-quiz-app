import { useEffect } from "react";

const Timer = ({ secondsRemaining, setLoadingStatus, setSecondsRemaining }) => {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(function () {
    const id = setInterval(function () {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  if (secondsRemaining === 0) {
    setLoadingStatus("finished");
  }

  return (
    <div className="timer">
      {mins < 10 && 0}
      {mins}:{seconds < 10 && 0}
      {seconds}
    </div>
  );
};

export default Timer;
