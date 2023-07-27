import {useEffect, useState} from "react";

const Clock = () => {
  const getNewTime = () => {
    return (new Date()).toLocaleString();
  }

  const [time, setTime] = useState(getNewTime());

  useEffect(() => {
    setInterval(() => {
      const newTime = getNewTime();
      setTime(newTime);
    }, 1000);
  }, []);

  return (
    <span>{time}</span>
  );
}

export default Clock;
