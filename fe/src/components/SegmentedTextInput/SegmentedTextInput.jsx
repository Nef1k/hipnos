import s from './SegmentedTextInput.module.css';
import React, {useRef} from "react";

const SegmentedTextInput = ({value, segmentsCount, segmentClassName, fieldWidth, disabled, onChange}) => {

  const textArray = [...value];

  const segmentRawRefs = Array(segmentsCount);
  for (let i = 0; i < segmentsCount; i++) {
    segmentRawRefs[i] = React.createRef();
  }
  const segmentRefs = useRef(segmentRawRefs);

  const focusSegment = (idx) => {
    segmentRefs.current[idx].current.focus()
  }

  const onFocus = (e, segmentIdx) => {
    let focusIdx = segmentIdx;
    if (segmentIdx > value.length) {
      focusIdx = value.length + 1;
    }

    if (focusIdx !== segmentIdx) {
      focusSegment(focusIdx);
    }
  }

  const onKeyDown = (e, segmentIdx) => {
    if (disabled) return;

    const inputableCharacters = '0123456789';
    let newText = null;
    let focusIdx = null;

    if (e.key === "Backspace") {
      newText = value.slice(0, segmentIdx) + value.slice(segmentIdx + 1, segmentsCount);
      focusIdx = segmentIdx - 1;
    }

    if ((inputableCharacters.indexOf(e.key) >= 0) && (value.length < segmentsCount)) {
      newText = value.slice(0, segmentIdx) + e.key + value.slice(segmentIdx, segmentsCount);
      focusIdx = segmentIdx + 1;
    }

    if (e.key === "ArrowLeft") {
      focusIdx = segmentIdx - 1;
    }

    if (e.key === "ArrowRight") {
      focusIdx = segmentIdx + 1;
    }

    if (focusIdx < 0) focusIdx = 0;
    if (focusIdx >= segmentsCount) focusIdx = segmentsCount - 1;

    if (newText !== null) {
      if (onChange !== null) {
        onChange(newText);
      }
    }
    if (focusIdx !== null) focusSegment(focusIdx);
  }

  return (
    <div className={s.segmentWrapper} style={{width: fieldWidth}}>
      {[...Array(segmentsCount)].map((_, idx) => {
        const safeSymbol = (idx >= 0) && (idx < value.length) ? textArray[idx] : '';
        return (
          <input
            key={idx}
            readOnly
            ref={segmentRefs.current[idx]}
            value={safeSymbol}
            className={`${s.baseSegment} ${segmentClassName}`}
            onKeyDown={(e) => {onKeyDown(e, idx)}}
            onFocus={(e) => {onFocus(e, idx)}}
          />
        );
      })}
    </div>
  )
}

export default SegmentedTextInput;
