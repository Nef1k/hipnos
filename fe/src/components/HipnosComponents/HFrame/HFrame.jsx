import s from "./HFrame.module.css";
import {useRef} from "react";
import HSvg from "../HSvg/HSvg";

const HFrame = ({
  style,
  outstanding,

  header,
  content,
  footer,

  fullSize,

  strokeWidth = 3,
  borderOffset = strokeWidth,

  topLeftSizeHorizontal = 50, topLeftSizeVertical = 50,
  topRightSizeHorizontal = 30, topRightSizeVertical = 30,
  bottomRightSizeHorizontal = 40, bottomRightSizeVertical = 40,
  bottomLeftSizeHorizontal = 30, bottomLeftSizeVertical = 30,

  topRightInterlinearSpace = 7,
  thinBarWidth = 4,

  stripesCount = 3,
  stripesMaxOffset = 75,
  stripesThinnes = 0.8,

  sideLinesTopOffset = 26,  // % height offset of side lines
  sideLinesHeight = 15,  // % height of side lines
  sideLinesCount = 3,  // Number of side lines on each side
  sideLinesBaseWidth = 5,  // % width of the first line
  sideLinesWidthInc = 5, // % width of width increment for next line

  bottomLinesOffset = 17,
  bottomLinesHeight = 6.5,
  bottomLinesCount = 2,
  bottomLinesBaseWidth = 40,
  bottomLinesDec = 11,
}) => {
  const svgRef = useRef(null);

  const vbWidth = 400;
  const vbHeight = 400;

  function updateFigures(aWidth, aHeight, setFigures) {
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

    const sideLines = [...Array(sideLinesCount).keys()];
    const slOffsetVertical = vbHeight * (sideLinesTopOffset / 100);
    const slHeight = vbHeight * (sideLinesHeight / 100);
    const slIntervalVertical = slHeight / (sideLinesCount - 1);
    const slBaseWidth = vbWidth * (sideLinesBaseWidth / 100);
    const slWidthIncrement = vbWidth * (sideLinesWidthInc / 100);

    const bottomLines = [...Array(bottomLinesCount).keys()];
    const blOffsetVertical = vbHeight * (1 - bottomLinesOffset / 100);
    const blHeight = vbHeight * (bottomLinesHeight / 100);
    const blIntervalVertical = blHeight / (bottomLinesCount - 1);
    const blBaseWidth = vbWidth * (bottomLinesBaseWidth / 100);
    const blWidthDec = vbWidth * (bottomLinesDec / 100);
    const vbCenterHorizontal = vbWidth / 2;

    setFigures([
      ...bottomLines.map((idx) => (outstanding && {
        description: "Outstanding lines bottom",
        stroke: "#FF0440",
        strokeWidth: strokeWidth * 3.5,
        fill: "none",
        points: [
          [vbCenterHorizontal - (blBaseWidth - idx * blWidthDec) / 2, blOffsetVertical + idx * blIntervalVertical],
          [vbCenterHorizontal + (blBaseWidth - idx * blWidthDec) / 2, blOffsetVertical + idx * blIntervalVertical],
        ],
      })),
      ...sideLines.map((idx) => (outstanding && {
        description: "Outstanding lines left",
        stroke: "#FF0440",
        strokeWidth: strokeWidth * 3.5,
        fill: "none",
        points: [
          [borderOffsetHorizontal, slOffsetVertical + idx * slIntervalVertical],
          [borderOffsetHorizontal + slBaseWidth + idx * slWidthIncrement, slOffsetVertical + idx * slIntervalVertical]
        ],
      })),
      ...sideLines.map((idx) => (outstanding && {
        description: "Outstanding lines right",
        stroke: "#FF0440",
        strokeWidth: strokeWidth * 3,
        fill: "none",
        points: [
          [vbWidth - borderOffsetHorizontal, slOffsetVertical + idx * slIntervalVertical],
          [vbWidth - borderOffsetHorizontal - slBaseWidth - idx * slWidthIncrement, slOffsetVertical + idx * slIntervalVertical]
        ],
      })),
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

  return (
    <div style={style} className={s.frameWrapper}>
      <HSvg
        svgRef={svgRef}
        viewBox={`0 0 ${vbWidth} ${vbHeight}`}
        className={s.svgElement}
        updateFigures={updateFigures}
      />
      <div className={s.contentWrapper}>
        {!fullSize ? <>
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
              marginRight: `${3 * borderOffset}px`,
              height: "100%",
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
        </> : <>
          <div className={s.frameContentFullSize}>
            {content}
          </div>
        </>}
      </div>
    </div>
  );
}

export default HFrame;
