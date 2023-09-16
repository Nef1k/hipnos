import {Paper} from "@mui/material";

const WidgetPanel = ({children, style}) => {
  return (
    <Paper
      square
      style={{
        padding: "10px 15px",
        marginBottom: "2px",
        alignItems: "center",
        ...style}}
    >
      {children}
    </Paper>
  )
}

export default WidgetPanel;
