import CountdownWidget from "./components/AdminComponents/Tabs/TabTypes/Countdown/CountdownWidget";
import EventLogWidget from "./components/AdminComponents/Tabs/TabTypes/EventLog/EventLog";

export const TabTypesMapping = {
  event_log: {
    widget: ({tabInfo}) => {
      return <EventLogWidget key={tabInfo?.id || Math.random()} tabInfo={tabInfo} />;
    },
  },
  countdown: {
    widget: ({tabInfo}) => {
      return <CountdownWidget key={tabInfo?.id || Math.random()} tabInfo={tabInfo} />;
    },
  }
}
