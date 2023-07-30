import {useEffect, useState} from "react";

const useSVGFigures = (initialFigures) => {
  const [figures, setFigures] = useState(initialFigures);
  const [svgElements, setSVGElements] = useState([]);

  useEffect(() => {
    setSVGElements(figures.map((figure, idx) => {
      if (!figure) return null;

      const points = figure.points;
      return ((!figure.isLine) || false ?
        <polygon
          key={idx}
          points={points}
          fill={figure.fill}
          fillOpacity={figure.fillOpacity || 1}
          stroke={figure.stroke}
          strokeWidth={`${figure.strokeWidth}px`}
          vectorEffect="non-scaling-stroke"
        />
        :
        <polyline
          key={idx}
          points={points}
          fill={figure.fill}
          fillOpacity={figure.fillOpacity || 1}
          stroke={figure.stroke}
          strokeWidth={`${figure.strokeWidth}px`}
          vectorEffect="non-scaling-stroke"
        />
      );
    }));
  }, [figures]);

  return [svgElements, setFigures];
}

export default useSVGFigures;
