import SubscriberConnected from "./Events/SubscriberConnected";
import SubscriberDisconnected from "./Events/SubscriberDisconnected";
import UnknownEvent from "./Events/UnknownEvent";
import PhraseSubmitted from "./Events/PhraseSubmitted";
import PhraseUnlocked from "./Events/PhraseUnlocked";
import PhraseActionTriggered from "./Events/PhraseActionTriggered";

export const EventsMapping = {
  subscriber_connected: ({event}) => <SubscriberConnected event={event} />,
  subscriber_disconnected: ({event}) => <SubscriberDisconnected event={event} />,
  phrase_submitted: ({event}) => <PhraseSubmitted event={event} />,
  phrase_unlocked: ({event}) => <PhraseUnlocked event={event} />,
  phrase_action_triggered: ({event}) => <PhraseActionTriggered event={event} />,
  unknown: ({event}) => <UnknownEvent event={event} />,
}
