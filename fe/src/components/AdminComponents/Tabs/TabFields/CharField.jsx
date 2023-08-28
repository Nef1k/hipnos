import {useEffect} from "react";
import {TextField} from "@mui/material";

const CharField = ({fieldName, field, value, onValueChanged}) => {
  function handleChange(newValue) {
    onValueChanged && onValueChanged(fieldName, newValue);
  }

  function getDefaultValue(field) {
    return field?.default || "";
  }

  useEffect(() => {
    handleChange(getDefaultValue(field));
  }, []);

  return (
    <>
      <TextField
        fullWidth
        value={value || getDefaultValue(field)}
        label={field?.display_name}
        onChange={(e) => handleChange(e.target.value)}
      />
    </>
  );
}

export default CharField;
