import s from './HInputFrame.module.css';
import HSvg from "../HSvg/HSvg";

const HInputFrame = ({
  className,
  style,

  children,

  strokeWidth = 3,

  blCornerVerticalSize = 40,  // % height of bottom left corner
  trCornerVerticalSize = 40,  // % height of top right corner

  pixelBorderSpacing = 2,
  pixelTopLeftCornerWidth = 15,
  pixelTopLeftCornerHeight = 15,
}) => {
  const [vbWidth, vbHeight] = [400, 400];

  const borderOffset = strokeWidth / 2;

  function updateFigures(aWidth, aHeight, setFigures) {
    const pixelsPerPointH = aWidth / vbWidth;
    const pixelsPerPointV = aHeight / vbHeight;

    const boHorizontal = (borderOffset) / pixelsPerPointH;
    const boVertical = (borderOffset) / pixelsPerPointV;

    const blCornerHeight = vbHeight * (blCornerVerticalSize / 100);
    const blCornerWidth = blCornerHeight * pixelsPerPointV / pixelsPerPointH;
    const trCornerHeight = vbHeight * (trCornerVerticalSize / 100);
    const trCornerWidth = trCornerHeight * pixelsPerPointV / pixelsPerPointH;

    const hBorderSpacing = pixelBorderSpacing / pixelsPerPointH;
    const vBorderSpacing = pixelBorderSpacing / pixelsPerPointV;
    const tlCornerWidth = pixelTopLeftCornerWidth / pixelsPerPointH;
    const tlCornerHeight = pixelTopLeftCornerHeight / pixelsPerPointV;

    setFigures([
      {
        description: "Bottom left corner",
        stroke: "#2AB8AF",
        strokeWidth: strokeWidth,
        fill: "none",
        isLine: true,
        points: [
          [boHorizontal, vbHeight - boVertical - blCornerHeight],
          [boHorizontal, vbHeight - boVertical],
          [boHorizontal + blCornerWidth, vbHeight - boVertical],
        ],
      },
      {
        description: "Top right corner",
        stroke: "#FF0440",
        strokeWidth: strokeWidth,
        fill: "none",
        isLine: true,
        points: [
          [vbWidth - boHorizontal - trCornerWidth, boVertical],
          [vbWidth - boHorizontal, boVertical],
          [vbWidth - boHorizontal, boVertical + trCornerHeight],
        ],
      },
      {
        description: "Main border",
        stroke: "#004166",
        strokeWidth: strokeWidth,
        fill: "#004166",
        fillOpacity: "0.2",
        points: [
          [boHorizontal + 2*boHorizontal + hBorderSpacing + tlCornerWidth, boVertical + 2*boVertical + vBorderSpacing],
          [vbWidth - boHorizontal - 2*boHorizontal - hBorderSpacing, boVertical + 2*boVertical + vBorderSpacing],
          [vbWidth - boHorizontal - 2*boHorizontal - hBorderSpacing, vbHeight - boVertical - 2*boVertical - vBorderSpacing - tlCornerHeight],
          [vbWidth - boHorizontal - 2*boHorizontal - hBorderSpacing - tlCornerWidth, vbHeight - boVertical - 2*boVertical - vBorderSpacing],
          [boHorizontal + 2*boHorizontal + hBorderSpacing, vbHeight - boVertical - 2*boVertical - vBorderSpacing],
          [boHorizontal + 2*boHorizontal + hBorderSpacing, boVertical + 2*boVertical + vBorderSpacing + tlCornerHeight],
        ],
      },
    ]);
  }

  return (
    <div className={`${s.svgWrapper} ${className}`} style={style}>
      <HSvg
        className={s.svgElement}
        viewBox={`0 0 ${vbWidth} ${vbHeight}`}
        updateFigures={updateFigures}
      />
      <div
        className={s.contentWrapper}
        style={{
          margin: `${4*borderOffset + pixelBorderSpacing}px ${4*borderOffset + pixelBorderSpacing}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default HInputFrame;
