import useHipnos from "../../../../../hooks/useHipnos";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import EventsRenderer from "./EventsRenderer";
import WidgetPanel from "../../WidgetPanel/WidgetPanel";
import {Button, Checkbox, FormControlLabel} from "@mui/material";
import useNotifications from "../../../../../hooks/useNotifications";
import {ALL_CHANNEL} from "../../../../../context/SNotificationsProvider";

const EventLogWidget = ({tabInfo}) => {
  const [events, setEvents] = useState([]);
  const [autoScroll, setAutoScroll] = useState(true);
  const hipnos = useHipnos();

  const bottomRef = useRef(null);

  const subId = useRef(null);
  const {subscribe, unsubscribe} = useNotifications();

  async function fetchEvents() {
    try {
      const events = await hipnos.getEvents({});
      setEvents(events);
    } catch (e) {
      console.log(e);
    }
  }

  function scrollToBottom() {
    bottomRef.current?.scrollIntoView({
      block: "end",
    });
  }

  function handleNotification(info) {
    fetchEvents().catch();
  }

  useEffect(() => {
    autoScroll && scrollToBottom();
  }, [events]);

  useLayoutEffect(() => {
    return () => {
      const curSubId = subId.current;
      if (curSubId !== null) {
        unsubscribe(curSubId);
      }
    }
  }, []);

  useEffect(() => {
    fetchEvents().catch();
    subId.current = subscribe(ALL_CHANNEL, handleNotification);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <WidgetPanel
        style={{
          display: "flex",
        }}
      >
        <div style={{flex: "1"}}>

        </div>
        <div>
          <FormControlLabel
            control={<Checkbox />}
            label="Автоскролл"
            value={autoScroll}
            onChange={(e) => {setAutoScroll(e.target.check)}}
          />
        </div>
      </WidgetPanel>
      <div
        style={{
          overflowY: "scroll",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            gap: "20px",
            padding: "20px",
          }}
        >
          {events?.map((event) => <EventsRenderer key={event.id} event={event}/>)}
        </div>
        <div ref={bottomRef}/>
      </div>
    </div>
  );
}

export default EventLogWidget;
