import {DateTimePicker} from "@mui/x-date-pickers";
import {useEffect} from "react";
import dayjs from "dayjs";

const DateTimeField = ({fieldName, field, value, onValueChanged}) => {
  function handleChange(newValue) {
    const serialized = Boolean(newValue) ? newValue.toISOString() : getDefaultValue(field);
    onValueChanged && onValueChanged(fieldName, serialized);
  }

  function getDefaultValue(field) {
    return field?.default || null;
  }

  function getCurrentValue() {
    return value ? dayjs(value) : getDefaultValue(field);
  }

  useEffect(() => {
    handleChange(getDefaultValue(field));
  }, []);

  return (
    <>
      <DateTimePicker
        sx={{width: "100%"}}
        label={field?.display_name}
        value={getCurrentValue()}
        onChange={(newDate) => {handleChange(newDate)}}
      />
    </>
  );
}

export default DateTimeField;
