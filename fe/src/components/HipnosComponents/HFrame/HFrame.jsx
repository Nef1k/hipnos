import s from "./HFrame.module.css";
import {useEffect, useRef, useState} from "react";

const HFrame = ({
  style,

  header,
  content,
  footer,

  strokeWidth = 2,
  borderOffset = strokeWidth,

  topLeftSizeHorizontal = 50, topLeftSizeVertical = 50,
  topRightSizeHorizontal = 30, topRightSizeVertical = 30,
  bottomRightSizeHorizontal = 40, bottomRightSizeVertical = 40,
  bottomLeftSizeHorizontal = 30, bottomLeftSizeVertical = 30,

  topRightInterlinearSpace = 7,
  thinBarWidth = 0.5,

  stripesCount = 3,
  stripesMaxOffset = 75,
  stripesThinnes = 0.8,
}) => {
  const svgRef = useRef(null);

  const [figures, setFigures] = useState([]);
  const [figuresStr, setFiguresStr] = useState([]);

  const vbWidth = 400;
  const vbHeight = 400;

  function updateFigures(aWidth, aHeight) {
    const pixelsPerPointsH = aWidth / vbWidth;
    const pixelsPerPointsV = aHeight / vbHeight;

    const wRatio = pixelsPerPointsH;
    const hRatio = pixelsPerPointsV;

    const borderOffsetHorizontal = (borderOffset + 1) / pixelsPerPointsH;
    const borderOffsetVertical = (borderOffset + 1) / pixelsPerPointsV;

    const [atlSizeW, atlSizeH] = [topLeftSizeHorizontal / wRatio, topLeftSizeVertical / hRatio];
    const [atrSizeW, atrSizeH] = [topRightSizeHorizontal / wRatio, topRightSizeVertical / hRatio];
    const [abrSizeW, abrSizeH] = [bottomRightSizeHorizontal / wRatio, bottomRightSizeVertical / hRatio];
    const [ablSizeW, ablSizeH] = [bottomLeftSizeHorizontal / wRatio, bottomLeftSizeVertical / hRatio];

    const tlwRatio = (topLeftSizeVertical / topLeftSizeHorizontal * wRatio);
    const tlhRatio = hRatio;
    const normInterlinearHor = topRightInterlinearSpace / tlwRatio;
    const normInterlinearVer = topRightInterlinearSpace / hRatio;
    const normThinWidthHor = thinBarWidth / tlwRatio;
    const normThinWidthVer = thinBarWidth / tlhRatio;

    const stripes = [...Array(stripesCount).keys()];
    const horFrac = 11 + stripesMaxOffset / (stripesCount);
    const adderHor = (abrSizeW * stripesMaxOffset) * horFrac / 10000;
    const adderVer = (abrSizeH * stripesMaxOffset) * horFrac / 10000;

    setFigures([
      {
        description: "Main border",
        stroke: "#2AB8AF",
        strokeWidth: strokeWidth,
        fill: "#2184A3",
        fillOpacity: 0.09,
        points: [
          [borderOffsetHorizontal + atlSizeW, borderOffsetVertical],
          [vbWidth - borderOffsetHorizontal - atrSizeW, borderOffsetVertical],
          [vbWidth - borderOffsetHorizontal, borderOffsetVertical + atrSizeH],
          [vbWidth - borderOffsetHorizontal, vbHeight - borderOffsetVertical - abrSizeH],
          [vbWidth - borderOffsetHorizontal - abrSizeW, vbHeight - borderOffsetVertical],
          [borderOffsetHorizontal + ablSizeW, vbHeight - borderOffsetVertical],
          [borderOffsetHorizontal, vbHeight - borderOffsetVertical - ablSizeH],
          [borderOffsetHorizontal, borderOffsetVertical + atlSizeH],
          [borderOffsetHorizontal + atlSizeW, borderOffsetVertical],
          [borderOffsetHorizontal + atlSizeW + strokeWidth, borderOffsetVertical],  // Overflow to avoid cut edges
        ],
      },
      {
        description: "Red triangle in the top left corner",
        stroke: "#FF0440",
        strokeWidth: strokeWidth,
        fill: "#FF0440",
        points: [
          [borderOffsetHorizontal, borderOffsetVertical],
          [borderOffsetHorizontal + atlSizeW - normInterlinearHor - normInterlinearHor - normThinWidthHor, borderOffsetVertical],
          [borderOffsetHorizontal, borderOffsetVertical + atlSizeH - 2 * normInterlinearVer - normThinWidthVer],
        ],
      },
      {
        description: "Thin line between triangle and border in the top left corner",
        stroke: "#FF0440",
        strokeWidth: strokeWidth,
        fill: "#FF0440",
        points: [
          [borderOffsetHorizontal + atlSizeW - normInterlinearHor - normThinWidthHor, borderOffsetVertical],
          [borderOffsetHorizontal + atlSizeW - normInterlinearHor, borderOffsetVertical],
          [borderOffsetHorizontal, borderOffsetVertical + atlSizeH - normInterlinearVer],
          [borderOffsetHorizontal, borderOffsetVertical + atlSizeH - normInterlinearVer - normThinWidthVer],
        ]
      },
      {
        description: "Thick line in the top right corner",
        isLine: true,
        stroke: "#2AB8AF",
        strokeWidth: strokeWidth * 2.5,
        fill: "none",
        points: [
          [vbWidth - borderOffsetHorizontal - atrSizeW - 50, borderOffsetVertical],
          [vbWidth - borderOffsetHorizontal - atrSizeW, borderOffsetVertical],
          [vbWidth - borderOffsetHorizontal, borderOffsetVertical + atrSizeH],
          [vbWidth - borderOffsetHorizontal, borderOffsetVertical + atrSizeH + 60],
        ],
      },
      {
        description: "Thick line in the bottom left corner",
        isLine: true,
        stroke: "#2AB8AF",
        strokeWidth: strokeWidth * 2.5,
        fill: "none",
        points: [
          [borderOffsetHorizontal + ablSizeW + 50, vbHeight - borderOffsetVertical],
          [borderOffsetHorizontal + ablSizeW, vbHeight - borderOffsetVertical],
          [borderOffsetHorizontal, vbHeight - borderOffsetVertical - ablSizeH],
          [borderOffsetHorizontal, vbHeight - borderOffsetVertical - ablSizeH - 60],
        ],
      },
      ...(stripes.map((idx) => ({
        description: "N-th stripe in the bottom right corner",
        stroke: idx === 0 ? "#FF0440" : "#2AB8AF",
        strokeWidth: strokeWidth,
        fill: idx === 0 ? "#FF0440" : "#2AB8AF",
        points: [
          [vbWidth - borderOffsetHorizontal - abrSizeW + (idx) * adderHor + adderHor * stripesThinnes, vbHeight - borderOffsetVertical],
          [vbWidth - borderOffsetHorizontal - abrSizeW + (idx + 1) * adderHor, vbHeight - borderOffsetVertical],
          [vbWidth - borderOffsetHorizontal, vbHeight - borderOffsetVertical - abrSizeH + (idx + 1) * adderVer],
          [vbWidth - borderOffsetHorizontal, vbHeight - borderOffsetVertical - abrSizeH + (idx) * adderVer + adderVer * stripesThinnes],
        ],
      }))),
    ]);
  }

  useEffect(() => {setTimeout(() => {
    const rect = svgRef.current.getBoundingClientRect();
    updateFigures(rect.width, rect.height);
  }, 10)}, []);

  useEffect(() => {
    setFiguresStr(figures.map((figure) => ({
      ...figure,
      points: figure.points.join(" "),
    })));
  }, [figures]);

  return (
    <div style={style} className={s.frameWrapper}>
      <svg
        version="1.2"
        xmlns="http://www.w3.org/2000/svg"
        ref={svgRef}
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox={`0 0 ${vbWidth} ${vbHeight}`}
        className={s.svgElement}
      >
        {figuresStr.map((figure, idx) => {
          return ((!figure.isLine) || false ?
              <polygon
                key={idx}
                points={figure.points}
                fill={figure.fill}
                fillOpacity={figure.fillOpacity || 1}
                stroke={figure.stroke}
                strokeWidth={`${figure.strokeWidth}px`}
                vectorEffect="non-scaling-stroke"
              />
              :
              <polyline
                key={idx}
                points={figure.points}
                fill={figure.fill}
                fillOpacity={figure.fillOpacity || 1}
                stroke={figure.stroke}
                strokeWidth={`${figure.strokeWidth}px`}
                vectorEffect="non-scaling-stroke"
              />
          );
        })}
      </svg>
      <div className={s.contentWrapper}>
        <div
          className={s.frameHeader}
          style={{
            marginLeft: `${topLeftSizeHorizontal + 4}px`,
            marginTop: `${2 * borderOffset}px`,
            marginRight: `${topRightSizeHorizontal + 5}px`,

            maxHeight: `${topLeftSizeVertical - borderOffset}px`,
            height: `${topLeftSizeVertical - borderOffset}px`,

            display: "flex",
            alignItems: "center",
          }}
        >
          {header}
        </div>
        <div
          className={s.frameContent}
          style={{
            marginLeft: `${3 * borderOffset}px`,
            marginRight: `${3 * borderOffset}px`
          }}
        >
          {content}
        </div>
        <div
          className={s.frameFooter}
          style={{
            marginLeft: `${2 * borderOffset + bottomLeftSizeHorizontal}px`,
            marginRight: `${2 * borderOffset + bottomRightSizeHorizontal}px`,
            marginBottom: `${3 * borderOffset}px`,
            height: `${bottomLeftSizeVertical}px`,
          }}
        >
          {footer}
        </div>
      </div>
    </div>
  );
}

export default HFrame;
