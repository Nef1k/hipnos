import useSVGFigures from "../../../hooks/useSVGFigures";
import {useEffect, useRef, useState} from "react";

const HSvg = ({
  version = "1.2",
  xmlns = "http://www.w3.org/2000/svg",
  svgRef,
  width = "100%",
  height = "100%",
  preserveAspectRatio = "none",
  viewBox,
  className,
  style,
  updateFigures,
  drawTimeout = 10,
}) => {
  const [figures, setRawFigures] = useState([]);
  const [svgElements, setFigures] = useSVGFigures([]);

  const ownRef = useRef();
  const ref = svgRef || ownRef;

  useEffect(() => {
    setTimeout(() => {
      const rect = ref.current.getBoundingClientRect();
      updateFigures && updateFigures(rect.width, rect.height, setRawFigures);
    }, drawTimeout);
  }, []);

  useEffect(() => {
    setFigures(figures);
  }, [figures]);

  return (
    <>
      <svg
        version={version}
        xmlns={xmlns}
        ref={ref}
        width={width}
        height={height}
        preserveAspectRatio={preserveAspectRatio}
        viewBox={viewBox}
        className={className}
        style={style}
      >
        {svgElements}
      </svg>
    </>
  );
}

export default HSvg;
