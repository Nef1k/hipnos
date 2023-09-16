import {Box} from "@mui/material";
import {TabTypesMapping} from "../../../../tabsMapping";
import TabNameTypeSelect from "../TabNameTypeSelect/TabNameTypeSelect";
import TabDefaultInitializer from "../TabDefaultSettingsSelector/TabDefaultInitializer";

const TabDispatcher = ({tabInfo, tabTypes, onUpdateRequired}) => {

  function getInitializer(tabInfo) {
    const customInitializer = TabTypesMapping[tabInfo?.tab_type?.name]?.initWidget;
    if (!customInitializer)
      return <TabDefaultInitializer tabInfo={tabInfo} onUpdateRequired={onUpdateRequired} />
    else
      return customInitializer(tabInfo);
  }

  function buildWidget(tabInfo) {
    const widget = TabTypesMapping[tabInfo?.tab_type?.name]?.widget({tabInfo});
    return widget || <>Error while loading widget "{tabInfo?.tab_type?.name}"</>;
  }

  function getComponentForTab(tabInfo) {
    let resultComponent = null;

    if (!tabInfo?.tab_type)
      resultComponent = <TabNameTypeSelect tabInfo={tabInfo} tabTypes={tabTypes} onUpdateRequired={onUpdateRequired} />;
    else if (!tabInfo?.is_initialized)
      resultComponent = getInitializer(tabInfo);
    else
      resultComponent = buildWidget(tabInfo);

    return resultComponent
  }

  return (
    <Box
      style={{height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}
    >
      {getComponentForTab(tabInfo)}
    </Box>
  );
}

export default TabDispatcher;
