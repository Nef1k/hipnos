import {createContext, useState} from "react";
import {Alert, Box, Snackbar} from "@mui/material";

const SnacksContext = createContext({});

export const SnacksProvider = ({children}) => {
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const handleMessageHide = () => {
    setMessage('');
  }

  const showMessage = (message, severity='info') => {
    setSeverity(severity);
    setMessage(message)
  }

  return (
    <SnacksContext.Provider value={showMessage}>
      {children}
      <Snackbar
        open={!!message}
        onClose={handleMessageHide}
        autoHideDuration={5000}
      >
        <Alert elevation={6} severity={severity} variant="filled">{message}</Alert>
      </Snackbar>
    </SnacksContext.Provider>
  )
}

export default SnacksContext;
