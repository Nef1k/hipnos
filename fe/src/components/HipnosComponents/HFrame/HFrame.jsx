import s from "./HFrame.module.css";
import {useEffect, useRef, useState} from "react";

const HFrame = ({
  style,
  children,

  strokeWidth = 2,
  borderOffset = 4,

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

  useEffect(() => {
    const aWidth = svgRef.current.clientWidth;
    const aHeight = svgRef.current.clientHeight;

    const wRatio = aWidth / vbWidth;
    const hRatio = aHeight / vbHeight;

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
          [borderOffset + atlSizeW, borderOffset],
          [vbWidth - borderOffset - atrSizeW, borderOffset],
          [vbWidth - borderOffset, borderOffset + atrSizeH],
          [vbWidth - borderOffset, vbHeight - borderOffset - abrSizeH],
          [vbWidth - borderOffset - abrSizeW, vbHeight - borderOffset],
          [borderOffset + ablSizeW, vbHeight - borderOffset],
          [borderOffset, vbHeight - borderOffset - ablSizeH],
          [borderOffset, borderOffset + atlSizeH],
          [borderOffset + atlSizeW, borderOffset],
          [borderOffset + atlSizeW + strokeWidth, borderOffset],  // Overflow to avoid cut edges
        ],
      },
      {
        description: "Red triangle in the top left corner",
        stroke: "#FF0440",
        strokeWidth: strokeWidth,
        fill: "#FF0440",
        points: [
          [borderOffset, borderOffset],
          [borderOffset + atlSizeW - normInterlinearHor - normInterlinearHor - normThinWidthHor, borderOffset],
          [borderOffset, borderOffset + atlSizeH - 2 * normInterlinearVer - normThinWidthVer],
        ],
      },
      {
        description: "Thin line between triangle and border in the top left corner",
        stroke: "#FF0440",
        strokeWidth: strokeWidth,
        fill: "#FF0440",
        points: [
          [borderOffset + atlSizeW - normInterlinearHor - normThinWidthHor, borderOffset],
          [borderOffset + atlSizeW - normInterlinearHor, borderOffset],
          [borderOffset, borderOffset + atlSizeH - normInterlinearVer],
          [borderOffset, borderOffset + atlSizeH - normInterlinearVer - normThinWidthVer],
        ]
      },
      {
        description: "Thick line in the top right corner",
        isLine: true,
        stroke: "#2AB8AF",
        strokeWidth: strokeWidth * 2.5,
        fill: "none",
        points: [
          [vbWidth - borderOffset - atrSizeW - 50, borderOffset],
          [vbWidth - borderOffset - atrSizeW, borderOffset],
          [vbWidth - borderOffset, borderOffset + atrSizeH],
          [vbWidth - borderOffset, borderOffset + atrSizeH + 60],
        ],
      },
      {
        description: "Thick line in the bottom left corner",
        isLine: true,
        stroke: "#2AB8AF",
        strokeWidth: strokeWidth * 2.5,
        fill: "none",
        points: [
          [borderOffset + ablSizeW + 50, vbHeight - borderOffset],
          [borderOffset + ablSizeW, vbHeight - borderOffset],
          [borderOffset, vbHeight - borderOffset - ablSizeH],
          [borderOffset, vbHeight - borderOffset - ablSizeH - 60],
        ],
      },
      ...(stripes.map((idx) => ({
        description: "N-th stripe in the bottom right corner",
        stroke: idx === 0 ? "#FF0440" : "#2AB8AF",
        strokeWidth: strokeWidth,
        fill: idx === 0 ? "#FF0440" : "#2AB8AF",
        points: [
          [vbWidth - borderOffset - abrSizeW + (idx)*adderHor + adderHor*stripesThinnes, vbHeight - borderOffset],
          [vbWidth - borderOffset - abrSizeW + (idx + 1)*adderHor, vbHeight - borderOffset],
          [vbWidth - borderOffset, vbHeight - borderOffset - abrSizeH + (idx + 1)*adderVer],
          [vbWidth - borderOffset, vbHeight - borderOffset - abrSizeH + (idx)*adderVer + adderVer*stripesThinnes],
        ],
      }))),
    ]);
  }, []);

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
        <div className={s.frameHeader}>Header</div>
        <div className={s.frameContent}>Content</div>
        <div className={s.frameFooter}>Footer</div>
      </div>
    </div>
  );
}

export default HFrame;
