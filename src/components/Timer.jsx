import { useEffect } from "react";

const Timer = ({ secondsRemaining, setLoadingStatus, setSecondsRemaining }) => {
  useEffect(function() {
    const id = setInterval(function() {
        setSecondsRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  if(secondsRemaining === 0){
    setLoadingStatus("finished")
  }

  return <div className="timer">{secondsRemaining}</div>;
};

export default Timer;
