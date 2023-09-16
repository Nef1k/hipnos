import SubscriberConnected from "./Events/SubscriberConnected";
import SubscriberDisconnected from "./Events/SubscriberDisconnected";
import UnknownEvent from "./Events/UnknownEvent";

export const EventsMapping = {
  subscriber_connected: ({event}) => <SubscriberConnected event={event} />,
  subscriber_disconnected: ({event}) => <SubscriberDisconnected event={event} />,
  unknown: ({event}) => <UnknownEvent event={event} />,
}
