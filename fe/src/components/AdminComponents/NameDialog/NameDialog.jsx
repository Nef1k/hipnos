import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField} from "@mui/material";
import {useState} from "react";

const nameRegexp = RegExp("^[a-zA-Z][a-zA-Z0-9_]*$");

const NameDialog = ({caption, open, onNameEntered, onClosed}) => {
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [nameError, setNameError] = useState(false);

  function _isNameValid(name) {
    return nameRegexp.test(name);
  }

  function _resetForm() {
    setName("");
    setNameError(false);

    setDisplayName("");
  }

  const handleDialogClose = () => {
    onClosed && onClosed();
    _resetForm();
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onNameEntered && onNameEntered(name, displayName);
    handleDialogClose();
  }

  const handleNameChange = (e) => {
    const newName = e.target.value;

    setName(newName);
    setNameError(!_isNameValid(newName));
  }

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
    >
      <Box component="form" onSubmit={handleFormSubmit}>
        <DialogTitle>{caption}</DialogTitle>
        <Divider/>
        <DialogContent>
          <TextField
            label="Системное имя"
            fullWidth
            value={name}
            required={true}
            error={nameError}
            onChange={handleNameChange}
          />
          <TextField
            sx={{marginTop: "10px"}}
            label="Отображаемое имя"
            fullWidth
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </DialogContent>
        <Divider/>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
          >Отмена</Button>
          <Button
            variant="contained"
            type="submit"
            disabled={!_isNameValid(name)}
          >Создать</Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default NameDialog;
