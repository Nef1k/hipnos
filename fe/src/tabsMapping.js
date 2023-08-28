import CountdownWidget from "./components/AdminComponents/Tabs/TabTypes/Countdown/CountdownWidget";

export const TabTypesMapping = {
  event_log: {
    widget: ({tabInfo}) => {
      return (<>Event log widget</>);
    },
  },
  countdown: {
    widget: ({tabInfo}) => {
      return <CountdownWidget tabInfo={tabInfo} />;
    }
  }
}
