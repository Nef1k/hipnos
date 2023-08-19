import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useEffect, useState} from "react";

const DataDropdown = ({label, items, defaultValue, noValueText, getItemValue, getItemDisplay, onValueChange, style}) => {
  const [currentValue, setCurrentValue] = useState(defaultValue);
  const noValueCaption = noValueText || "-";

  const _getItemDisplay = (item) => {
    if (!item) {
      return noValueCaption;
    }
    return !!getItemDisplay ? getItemDisplay(item) : item?.toString();
  }

  const _getItemValue = (item) => {
    if (!item) {
      return "";
    }

    const value = !!getItemValue ? getItemValue(item) : _getDefaultItemValue(item);

    return value;
  }

  const _getDefaultItemValue = (item) => {
    return item?.hasOwnProperty("id") ? item.id : "";
  }

  const handleValueChange = (e) => {
    const newRawValue = e.target.value;

    const newItemArray = items?.filter((item) => _getItemValue(item) === newRawValue);
    const newItem = !!newItemArray ? newItemArray[0] : null;

    setCurrentValue(newItem);
    onValueChange && onValueChange(newItem || null);
  }

  useEffect(() => {
    setCurrentValue(defaultValue);
  }, [defaultValue]);

  return (
    <FormControl sx={style}>
      {!!label && <InputLabel>{label}</InputLabel>}
      <Select
        label={label}
        fullWidth
        value={_getItemValue(currentValue) || ""}
        onChange={handleValueChange}
      >
        <MenuItem value="">{noValueCaption}</MenuItem>
        {items.map((item) => {
          return (
            <MenuItem key={_getItemValue(item)} value={_getItemValue(item)}>
              {_getItemDisplay(item)}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default DataDropdown;
