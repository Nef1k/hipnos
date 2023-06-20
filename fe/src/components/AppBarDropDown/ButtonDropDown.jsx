import {Button, Menu, MenuItem} from "@mui/material";
import {KeyboardArrowDown} from "@mui/icons-material";
import {useState} from "react";

const ButtonDropDown = ({items, selectedKey, emptyLabel, onSelectedChange, getItemCaption, getItemKey}) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const isOpened = Boolean(menuAnchorEl);
  const currentItem = _getCurrentItem();

  const handleMenuOpen = (event) => {
    if (!items || !items?.length) return;

    setMenuAnchorEl(event.target);
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  }

  const handleItemClick = (event, item) => {
    onSelectedChange && onSelectedChange(item);
    handleMenuClose();
  }

  function _getItemByKey (key) {
    const filtered = items.filter((item) => {
      const itemId = _getItemKey(item);
      return itemId === key;
    });
    if (!filtered) return null;
    return filtered[0];
  }

  function _getCurrentItem () {
    return _getItemByKey(selectedKey)
  }

  function _getItemCaption(item) {
    if (!item) {
      return _getItemKey(item);
    }

    const gettedCaption = Boolean(getItemCaption) ? getItemCaption(item) : null;

    return gettedCaption || item.toString();
  }

  function _getItemKey(item) {
    if (!item) {
      return null;
    }

    const gettedKey = Boolean(getItemKey) ? getItemKey(item) : null;

    return gettedKey || item.hasOwnProperty("id") ? item.id : null;
  }

  function _getCurrentCaption () {
    return _getItemCaption(currentItem) || emptyLabel;
  }
  function _getCurrentKey() {
    return _getItemKey(currentItem);
  }

  return (
    <>
      <Button
        variant="outlined"
        color="inherit"
        endIcon={<KeyboardArrowDown />}
        disableElevation
        aria-haspopup="true"
        onClick={isOpened ? handleMenuClose : handleMenuOpen}
      >
        {_getCurrentCaption()}
      </Button>
      <Menu
        open={isOpened}
        anchorEl={menuAnchorEl}
        onClose={handleMenuClose}
      >
        {items?.map((item) => {
          return (
            <MenuItem
              key={_getItemKey(item)}
              onClick={(event) => {handleItemClick(event, item)}}
            >
              {_getItemCaption(item)}
            </MenuItem>
          )
        })}
      </Menu>
    </>
  );
}

export default ButtonDropDown;
