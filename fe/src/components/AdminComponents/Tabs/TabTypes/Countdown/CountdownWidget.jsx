import {useState} from "react";
import Countdown from "../../../../Clock/Countdown";
import dayjs from "dayjs";

const CountdownWidget = ({tabInfo}) => {
  const wState = tabInfo?.widget_state;
  const [currentText, setCurrentText] = useState(wState?.before_prompt)

  function Error({text}) {
    return <div>Ошибка{Boolean(text) ? `: ${text}` : ""}</div>
  }

  return !Boolean(tabInfo?.widget_state?.target_timestamp) ? <Error text={"Таймер не задан"} /> : (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <p>{currentText}</p>
      <p>
        <Countdown
          targetTime={dayjs(wState?.target_timestamp)}
          onTimesUp={() => {setCurrentText(wState?.after_prompt)}}
        />
      </p>
    </div>
  );
}

export default CountdownWidget;
