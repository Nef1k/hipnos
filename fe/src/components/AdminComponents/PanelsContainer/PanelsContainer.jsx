import "rc-dock/dist/rc-dock.css";
import {DockLayout} from "rc-dock";

const PanelsContainer = ({layout, dockRef, onLayoutChange}) => {
  return (
    <div style={{position: "relative", height: "100%", width: "100%"}}>
      <DockLayout
        defaultLayout={layout}
        ref={dockRef}
        onLayoutChange={onLayoutChange}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      />
    </div>
  )
}

export default PanelsContainer;
