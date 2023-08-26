import {Box} from "@mui/material";
import {TabTypesMapping} from "../../../../tabsMapping";
import TabNameTypeSelect from "../TabNameTypeSelect/TabNameTypeSelect";
import TabDefaultInitializer from "../TabDefaultSettingsSelector/TabDefaultInitializer";

const TabDispatcher = ({tabInfo, tabTypes, onUpdateRequired}) => {

  function getInitializer(tabInfo) {
    const customInitializer = TabTypesMapping[tabInfo?.tab_type?.name]?.initWidget;
    if (!customInitializer)
      return <TabDefaultInitializer tabInfo={tabInfo} />
    else
      return customInitializer(tabInfo);
  }

  function getComponentForTab(tabInfo) {
    let resultComponent = null;

    if (!tabInfo?.tab_type)
      resultComponent = <TabNameTypeSelect tabInfo={tabInfo} tabTypes={tabTypes} onUpdateRequired={onUpdateRequired} />;
    else if (!tabInfo?.is_initialized)
      resultComponent = getInitializer(tabInfo);
    else
      resultComponent = TabTypesMapping[tabInfo?.tab_type?.name].widget({tabInfo});

    return resultComponent
  }

  return (
    <Box style={{height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
      {getComponentForTab(tabInfo)}
    </Box>
  );
}

export default TabDispatcher;
