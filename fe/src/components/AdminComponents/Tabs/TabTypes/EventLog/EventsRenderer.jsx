import dayjs from "dayjs";
import {EventsMapping} from "./eventsMapping";

const EventsRenderer = ({event}) => {
  const eventType = event?.event_type;
  const ts = dayjs(event?.timestamp);
  const formattedDate = ts.format("DD.MM.YYYY");
  const formattedTime = ts.format("HH:mm:ss");

  function getEventComponent(eventType) {
    if (!(eventType in EventsMapping)) {
      return EventsMapping.unknown;
    }
    return EventsMapping[eventType];
  }

  return (
    <div style={{display: "flex", gap: "20px", alignItems: "center"}}>
      <div style={{textAlign: "right", alignSelf: "start"}}>
        {formattedDate}
        <br />
        {formattedTime}
      </div>
      <div>
        {getEventComponent(eventType)({event})}
      </div>
    </div>
  );
}

export default EventsRenderer;
