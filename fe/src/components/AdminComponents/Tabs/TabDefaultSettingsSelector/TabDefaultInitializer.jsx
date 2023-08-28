import {useEffect, useState} from "react";
import useHipnos from "../../../../hooks/useHipnos";
import AutoFields from "./AutoFields";
import {Box, Button} from "@mui/material";

const TabDefaultInitializer = ({tabInfo, onUpdateRequired}) => {
  const hipnos = useHipnos();
  const fields = tabInfo?.tab_type?.fields;
  const [settings, setSettings] = useState({});

  function hasRequiredFields(tabFields) {
    if (!tabFields) return false;

    const fieldsList = Object.keys(tabFields);
    const requiredFields = fieldsList.filter((fieldName) => {
      const field = tabFields[fieldName];
      return field.required;
    });

    return requiredFields.length > 0;
  }

  async function autoInitialize() {
    await hipnos.updateTab(tabInfo.id, {is_initialized: true});
    onUpdateRequired && onUpdateRequired(tabInfo);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await hipnos.updateTab(tabInfo.id, {widget_state: settings, is_initialized: true});
    onUpdateRequired && onUpdateRequired(tabInfo);
  }

  async function handleCancellation() {
    await hipnos.updateTab(tabInfo.id, {is_initialized: false, tab_type_id: null});
    onUpdateRequired && onUpdateRequired(tabInfo);
  }

  useEffect(() => {
    if (!hasRequiredFields(fields)){
      autoInitialize().catch();
    }
  }, []);

  return (
    <Box
      component="form"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        rowGap: "15px"
      }}
      onSubmit={handleSubmit}
    >
      <AutoFields fields={fields} values={settings} onValuesChanged={setSettings}/>
      <Box style={{display: "flex"}}>
        <Button variant="contained" type="submit">Инициализировать</Button>
        <Button
          variant="contained"
          color="inherit"
          style={{marginLeft: "10px"}}
          onClick={handleCancellation}
        >
          Отмена
        </Button>
      </Box>
    </Box>
  );
}

export default TabDefaultInitializer;
