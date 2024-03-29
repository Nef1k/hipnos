import HFrame from "../HFrame/HFrame";
import HPanelHeader from "./HPanelHeader";
import {useEffect, useState} from "react";
import HPanelContent from "./HPanelContent";
import HPanelFooter from "./HPanelFooter";

const HPanel = ({
  children,
  style,
  className,
  outstanding,
  fullSize,

  topLeftSizeHorizontal = 60, topLeftSizeVertical = 60,

  topRightInterlinearSpace = 11,
  thinBarWidth = 6,
}) => {
  const [headerElements, setHeaderElements] = useState([]);
  const [contentElements, setContentElements] = useState([]);
  const [footerElements, setFooterElements] = useState([]);

  useEffect(() => {
    let [tmpHeaders, tmpContents, tmpFooters] = [[], [], []];
    for (const childIdx in children) {
      const child = children[childIdx];
      if (child?.type === HPanelHeader) tmpHeaders.push(child);
      else if (child?.type === HPanelContent) tmpContents.push(child);
      else if (child?.type === HPanelFooter) tmpFooters.push(child);
    }
    setHeaderElements(tmpHeaders);
    setContentElements(tmpContents);
    setFooterElements(tmpFooters);
  }, [children]);

  return (
    <div style={style} className={className}>
      <HFrame
        header={headerElements}
        content={contentElements}
        footer={footerElements}
        outstanding={outstanding}
        fullSize={fullSize}

        topLeftSizeHorizontal={topLeftSizeHorizontal}
        topLeftSizeVertical={topLeftSizeVertical}

        topRightInterlinearSpace={topRightInterlinearSpace}
        thinBarWidth={thinBarWidth}
      />
    </div>
  );
}

export default HPanel;
