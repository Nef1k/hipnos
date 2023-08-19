import {Box} from "@mui/material";
import {TabTypesMapping} from "../../../../tabsMapping";
import TabNameTypeSelect from "../TabNameTypeSelect/TabNameTypeSelect";
import TabDefaultInitializer from "../TabDefaultSettingsSelector/TabDefaultInitializer";

const TabDispatcher = ({tabInfo, tabTypes}) => {

  function getInitializer(tabInfo) {
    const customInitializer = TabTypesMapping[tabInfo?.tab_type?.name].initWidget(tabInfo);
    return customInitializer || <TabDefaultInitializer tabInfo={tabInfo} />
  }

  function getComponentForTab(tabInfo) {
    if (!tabInfo?.tab_type)
      return <TabNameTypeSelect tabInfo={tabInfo} tabTypes={tabTypes} />;
    else if (!tabInfo?.is_initialized)
      return getInitializer(tabInfo);
    else
      return TabTypesMapping[tabInfo?.tab_type?.name].widget(tabInfo);
  }

  return (
    <Box style={{height: "100%"}}>
      {getComponentForTab(tabInfo)}
    </Box>
  );
}

export default TabDispatcher;
