import {Box, Button, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import DataDropdown from "../../../DataDropdown/DataDropdown";
import useHipnos from "../../../../hooks/useHipnos";

const TabNameTypeSelect = ({tabInfo, tabTypes, onUpdateRequired}) => {
  const [widgetName, setWidgetName] = useState(tabInfo?.display_name);
  const [selectedType, setSelectedType] = useState(null);
  const [canSave, setCanSave] = useState(checkCanSave());

  const hipnos = useHipnos();

  async function updateTab(tabId, updateData) {
    try {
      await hipnos.updateTab(tabId, updateData);
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
    updateTab(tabInfo?.id, updateData).catch();
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
