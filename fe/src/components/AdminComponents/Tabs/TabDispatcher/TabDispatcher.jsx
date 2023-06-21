import {Box} from "@mui/material";

const TabDispatcher = ({tabInfo}) => {
  return (
    <Box>
      {JSON.stringify(tabInfo?.widget_args)}
    </Box>
  );
}

export default TabDispatcher;
