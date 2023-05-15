import {createContext, useEffect, useRef, useState} from "react";
import {notificationsWebsocket} from "../api/axios";

const NotificationsContext = createContext({});

export const NotificationsProvider = ({children}) => {
  const [notificationService, setNotificationService] = useState({
    socket: null,
    handlers: {},
  });

  useEffect(() => {}, []);

  function setHandler(channelName, handler) {
    setNotificationService((prevState) => {
      return {
        ...prevState,
        handlers: {
          ...prevState.handlers,
          [channelName]: handler,
        }
      };
    });
  }

  function connect(channels, handlers = {}) {
    console.log('Connecting to notifications');
    const socket = notificationsWebsocket(channels);
    socket.onerror = handleError;
    socket.onmessage = (message) => handleMessage(handlers, message);
    setNotificationService((prevState) => {
      return {
        ...prevState,
        socket: socket,
      }
    })
  }

  function disconnect() {
    console.log('Disconnection from notifications');
    const socket = notificationService.socket;
    if (socket) {
      socket.close();
    }
    setNotificationService((prevState) => {
      return {
        ...prevState,
        socket: null,
      }
    })
  }

  function handleError(e) {
    console.log('Websocket error: ', e);
  }

  const handleMessage = (handlers, message) => {
    const dataJson = JSON.parse(message.data);
    const channel = dataJson.channel;
    const payload = dataJson.payload;

    // TODO: make multiple handlers
    const handler = handlers[channel];
    console.log(handlers);
    if (handler) {
      handler(payload);
    }
  }

  function subscribe(channelsWithHandlers) {
    const channels = Object.keys(channelsWithHandlers);
    for (const [channelName, handler] of Object.entries(channelsWithHandlers)) {
      setHandler(channelName, handler);
    }
    connect(channels, channelsWithHandlers);
  }
  function unsubscribe() {
    disconnect();
  }

  const context = {
    notificationService: notificationService,
    setChannelHandler: setHandler,
    connect: connect,
    disconnect: disconnect,
    subscribe,
    unsubscribe,
  }

  return (
    <NotificationsContext.Provider value={context}>
      {children}
    </NotificationsContext.Provider>
  )
}

export default NotificationsContext;
