import {Checkbox, FormControlLabel} from "@mui/material";
import {useEffect} from "react";
import {get} from "axios";

const BooleanField = ({fieldName, field, value, onValueChanged}) => {
  const flagLabel = field?.display_name || "";

  function handleChange(newValue) {
    onValueChanged && onValueChanged(fieldName, newValue);
  }

  function getDefaultValue(field) {
    return field?.default || false;
  }

  useEffect(() => {
    handleChange(getDefaultValue(field));
  }, []);

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={value || getDefaultValue(field)}
            onChange={(e) => handleChange(e.target.checked)}
          />
        }
        label={flagLabel}
      />
    </>
  );
}

export default BooleanField;
