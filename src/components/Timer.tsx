import React from "react";
import { formatTime } from "../utils";
import { useGameInfors } from "../utils/context";

type TimerProps = {
  initTime?: number;
  isStop: boolean;
};

const Timer = ({ initTime = Date.now(), isStop }: TimerProps) => {
  let { setElapsedTime: setTime } = useGameInfors();
  const [elapsedTime, setElapsedTime] = React.useState(initTime);
  React.useEffect(() => {
    if (!isStop) {
      let myInterval = setInterval(() => {
        let diffTime = Date.now() - initTime;
        setElapsedTime(diffTime);
        setTime(diffTime);
      }, 1000);
      return () => {
        clearInterval(myInterval);
      };
    }
  });

  return (
    <div>
      <span style={{ fontSize: 24 }}>⏱</span> {formatTime(elapsedTime)}
    </div>
  );
};

export default React.memo(Timer);
