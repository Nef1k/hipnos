import axios from "axios";

export const BASE_URL = process.env.REACT_APP_HIPNOS_BASE_URL || "https://hipnos.local:8443";
export const NOTIFICATIONS_WS_URL = process.env.REACT_APP_NOTIFICATIONS_WS_URL || "wss://hipnos.local:8443/ws/notifications/";
export const NOTIFICATIONS_AUTH_TOKEN = process.env.REACT_APP_TOKEN;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
})

export const notificationsWebsocket = (channels, token) => {
  let channelsStr = channels ? channels.join(',') : '';
  channelsStr = `channels=${channelsStr}`
  const url = `${NOTIFICATIONS_WS_URL}?${channelsStr}`;

  // Fuck chrome for not letting set headers in websockets
  const authProtocol = `authorization_${token}`;
  let protocols = ["test_protocol"];
  if (token) {
    protocols = [authProtocol, ...protocols];
  }

  return new WebSocket(url, protocols);
}
