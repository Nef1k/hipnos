import axios from "axios";

export const BASE_URL = process.env.REACT_APP_HIPNOS_BASE_URL || "http://192.168.1.160:8000";
export const NOTIFICATIONS_WS_URL = process.env.REACT_APP_NOTIFICATIONS_WS_URL || "ws://192.168.1.160:8000/ws/notifications/test/";
export const NOTIFICATIONS_AUTH_TOKEN = process.env.REACT_APP_TOKEN;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
})

export const notificationsWebsocket = (channels, token = NOTIFICATIONS_AUTH_TOKEN) => {
  // Fuck chrome for not letting set headers in websockets
  const authProtocol = `authorization_${NOTIFICATIONS_AUTH_TOKEN}`;
  let channelsStr = channels ? channels.join(',') : '';
  channelsStr = `channels=${channels}`
  const url = `${NOTIFICATIONS_WS_URL}?${channelsStr}`;
  return new WebSocket(url, [authProtocol, "test_protocol"]);
}
