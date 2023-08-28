import {useEffect, useState} from "react";
import dayjs from "dayjs";

const Countdown = ({targetTime, onTimesUp}) => {
  const [timeLeftStr, setTimeLeftStr] = useState("");
  const [timer, setTimer] = useState(null);

  function getSecondsLeft() {
    let secondsSrc = targetTime.diff(dayjs(), 'second');
    if (secondsSrc < 0) secondsSrc = 0;

    return secondsSrc;
  }

  function getTimeLeftStr() {
    let secondsSrc = getSecondsLeft();

    const secondsLeft = secondsSrc % 60;
    const minutesLeft = Math.floor(secondsSrc % (60 * 60) / 60);
    const hoursLeft = Math.floor(secondsSrc % (60 * 60 * 24) / (60 * 60));
    const daysLeft = Math.floor(secondsSrc / (60 * 60 * 24));

    return `${daysLeft}д ${hoursLeft}ч ${minutesLeft}мин ${secondsLeft}сек`;
  }

  function timesUp() {
    clearTimeout(timer);
    setTimer(null);
    onTimesUp && onTimesUp();
  }

  useEffect(() => {
    setTimeLeftStr(getTimeLeftStr());

    if (!timer) {
      setTimer(setInterval(() => {
        setTimeLeftStr(getTimeLeftStr());
      }, 1000));
    }

    return () => {
      clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const secondsLeft = getSecondsLeft();
    if (!secondsLeft) {
      timesUp();
    }
  }, [timeLeftStr]);

  return (
    <>{timeLeftStr}</>
  );
}

export default Countdown;
