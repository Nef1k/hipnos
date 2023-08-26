import {Box, Button, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import DataDropdown from "../../../DataDropdown/DataDropdown";

const TabNameTypeSelect = ({tabInfo, tabTypes, onUpdateRequired}) => {
  const [widgetName, setWidgetName] = useState(tabInfo?.display_name);
  const [selectedType, setSelectedType] = useState(null);
  const [canSave, setCanSave] = useState(checkCanSave());

  const axiosPrivate = useAxiosPrivate();

  async function saveTab(tabId, updateData) {
    try {
      await axiosPrivate.patch(`synergy/tabs/${tabId}/`, updateData);
      onUpdateRequired && onUpdateRequired(tabInfo);
    }
    catch (e) {
      console.log(e);
    }
  }

  function checkCanSave() {
    return Boolean(widgetName) && Boolean(selectedType);
  }

  function handleSave(e) {
    e.preventDefault();

    if (!canSave) {
      return;
    }

    const updateData = {
      "display_name": widgetName,
      "tab_type_id": selectedType?.id,
    }
    saveTab(tabInfo?.id, updateData).catch();
  }

  useEffect(() => {
    setCanSave(checkCanSave());
  }, [widgetName, selectedType]);

  return (
    <Box
      style={{display: "flex", flexDirection: "column"}}
      component="form"
      onSubmit={handleSave}
    >
      <TextField
        style={{width: "200px"}}
        label="Название виджета"
        value={widgetName}
        onChange={(e) => setWidgetName(e.target.value)}
      />
      <DataDropdown
        style={{width: "200px", marginTop: "20px"}}
        label="Тип виджета"
        items={tabTypes}
        getItemDisplay={(tabType) => tabType.display_name}
        onValueChange={setSelectedType}
      />
      <Button
        style={{width: "200px", marginTop: "20px"}}
        type="submit"
        variant="contained"
        disabled={!canSave}
      >
        Сохранить
      </Button>
    </Box>
  );
}

export default TabNameTypeSelect;
