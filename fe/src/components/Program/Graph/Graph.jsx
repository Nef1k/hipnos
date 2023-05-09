import s from './Graph.module.css';
import {useEffect, useRef, useState} from "react";

const Graph = ({currentProgram}) => {

  const linesWrapperRef = useRef();
  const srcWordRef = useRef();
  const wordsWrapperRef = useRef();

  const [graphDisplayData, setGraphDisplayData] = useState({
    boxSize: {width: 0, height: 0},
    paths: [],
  });

  useEffect(() => {
    const boxSize = getElementBoxSize(linesWrapperRef.current);
    const wordHeights = getChildrenHeights(wordsWrapperRef.current);
    setGraphDisplayData({
      boxSize: boxSize,
      paths: getPaths(
        boxSize,
        currentProgram.sourceWords.length,
        wordHeights,
        0.1,
        0.4,
        0,
        15,
        5,
        20
      ),
    })
  }, [currentProgram]);

  const getElementBoxSize = (elem) => {
    const box = elem?.getBoundingClientRect() || {width: 0, height: 0};
    return {
      width: box.width,
      height: box.height,
    }
  }

  const getChildrenHeights = (elem) => {
    const children = elem.children;
    const heights = Array(children.length);

    for (let i = 0; i < children.length; i++) {
      const box = getElementBoxSize(children[i]);
      heights[i] = box.height;
    }

    return heights;
  }

  const pathToSVG = (path) => {
    return (
      `M ${path.startPoint.x} ${path.startPoint.y} ` +
      `L ${path.curve.p1.x} ${path.curve.p1.y} ` +
      `C ${path.curve.p2.x},${path.curve.p2.y} ` +
      `${path.curve.p3.x},${path.curve.p3.y} ` +
      `${path.curve.p4.x},${path.curve.p4.y}`
    );
  }

  const getNthCenter = (n, sizes) => {
    const prevSizes = sizes.slice(0, n);
    const currentSize = sizes[n];

    const prevSizesSum = prevSizes.reduce((partSum, a) => partSum + a, 0);
    return prevSizesSum + currentSize / 2;
  }

  const getPaths = (
    boxSize,
    wordsNumber,
    wordHeights,
    linearPercentage,
    leftCurvaturePercentage,
    curvatureLinearPercentage,
    leftOffset,
    rightOffset,
    targetHeight
  ) => {
    let paths = Array(wordsNumber);
    let maxI = paths.length;
    for (let i = 0; i < maxI; i++) {
      const boxHeight = boxSize.height;
      const boxWidth = boxSize.width;

      const srcX = leftOffset;
      const srcY = getNthCenter(i, wordHeights);

      const linearWidth = boxWidth * linearPercentage;
      const linearEndX = srcX + linearWidth;

      const targetI = -0.5*maxI + i + 0.5;
      const targetSpacing = targetHeight / maxI;
      const targetX = boxWidth - rightOffset;
      const targetY = boxHeight / 2 + targetI * targetSpacing;

      const aux1Width = boxWidth * leftCurvaturePercentage;
      const aux1X = linearEndX + aux1Width;

      const aux2Width = boxWidth * curvatureLinearPercentage;
      const aux2X = aux1X + aux2Width;

      paths[i] = {
        startPoint: {x: leftOffset, y: srcY},
        curve: {
          p1: {x: linearEndX, y: srcY},
          p2: {x: aux1X, y: srcY},
          p3: {x: aux2X, y: targetY},
          p4: {x: targetX, y: targetY},
        },
      }
    }
    return paths;
  }

  return (
    <div className={s.graphWrapper}>
      <div ref={wordsWrapperRef} className={s.srcWordsWrapper}>
        {currentProgram.sourceWords.map((word, idx) => {
          return (
            <div ref={idx === 0 ? srcWordRef : null} key={idx}>{word || "? ? ?"}</div>
          );
        })}
      </div>
      <div ref={linesWrapperRef} className={s.linesWrapper}>
        <svg width={graphDisplayData.boxSize.width} style={{height: "100%"}}>
          {graphDisplayData.paths.map((path) => {
            return (
              <>
                <path d={pathToSVG(path)} stroke="black" strokeWidth={3} fill="transparent" />
              </>
            )
          })}
        </svg>
      </div>
      <div className={s.dstWordWrapper}>{currentProgram.dstWord || "? ? ?"}</div>
    </div>
  )
}

export default Graph;
