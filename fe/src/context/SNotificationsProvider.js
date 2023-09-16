import {createContext, useEffect, useRef, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {notificationsWebsocket} from "../api/axios";
import useAuth from "../hooks/useAuth";

export const SNotificationsContext = createContext({});

export const ALL_CHANNEL = "__all__";

export const SNotificationsProvider = ({children}) => {
  const socket = useRef(null);
  const subscriptions = useRef({});

  const {auth} = useAuth();

  function subscribe(channel, handler) {
    const newHandlerId = _addHandler(channel, handler);
    const sock = socket.current;

    if (!sock) {
      _connect();
    }

    return newHandlerId;
  }

  function unsubscribe(handlerId) {
    const wasRemoved = _removeHandler(handlerId);

    if (wasRemoved && !_hasHandlers()) {
      _disconnect();
    }

    return wasRemoved;
  }

  function emit(channel, payload) {
    const handlers = subscriptions.current[channel];
    if (!handlers && !subscriptions.current[ALL_CHANNEL]) {
      console.warn(`Channel ${channel} is not being listened by anyone`);
      return;
    }

    for (let handlerId in handlers) {
      const handler = handlers[handlerId];
      handler && handler(payload);
    }

    (channel !== ALL_CHANNEL) && emit(ALL_CHANNEL, payload);
  }

  function _connect() {
    if (socket.current !== null) {
      _disconnect();
    }

    const token = auth?.accessToken;

    const sock = notificationsWebsocket(['__all__'], token);
    sock.onerror = _handleError;
    sock.onmessage = (message) => _handleMessage(message);
    socket.current = sock;
  }

  function _disconnect() {
    if (socket.current === null) {
      return;
    }

    socket.current.close();
    socket.current = null;
  }

  function _handleError(e) {
    console.log('Websocket error: ', e);
  }

  function _handleMessage(message) {
    const dataJson = JSON.parse(message.data);
    const channel = dataJson.channel;
    const payload = dataJson.payload;

    emit(channel, payload);
  }

  function _addHandler(channel, handler) {
    const newId = uuidv4();

    const prev = subscriptions.current;
    const newHandlers = {...(prev[channel] || {})};
    newHandlers[newId] = handler;
    subscriptions.current = {
      ...prev,
      [channel]: newHandlers,
    };

    return newId;
  }

  function _removeHandler(handlerId) {
    const channel = _searchHandler(handlerId);
    if (!channel) {
      return false;
    }

    const prev = subscriptions.current;
    const newHandlers = Object.fromEntries(Object
      .entries({...prev[channel] || {}})
      .filter(([key]) => key !== handlerId)
    );
    const newSubs = {
      ...prev,
      [channel]: newHandlers,
    };
    if (Object.keys(newHandlers).length === 0) {
      delete newSubs[channel];
    }
    subscriptions.current = newSubs;

    return true;
  }

  function _hasHandlers() {
    return Object.keys(subscriptions.current || {}).length > 0;
  }

  function _searchHandler(handlerId) {
    for (let channel in subscriptions.current) {
      if (handlerId in subscriptions.current[channel]) {
        return channel;
      }
    }
    return null;
  }

  const context = {
    subscribe,
    unsubscribe,
    emit,
  }
  return (
    <SNotificationsContext.Provider value={context}>
      {children}
    </SNotificationsContext.Provider>
  )
}
