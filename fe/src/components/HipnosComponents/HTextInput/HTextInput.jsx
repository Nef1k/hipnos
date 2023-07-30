import s from "./HTextInput.module.css";
import HInputFrame from "../HInputFrame/HInputFrame";

const HTextInput = ({
  id,
  name,
  disabled,
  readOnly,
  style,
  className,
  wrapperStyle,
  wrapperClassName,
  placeholder,
  value,
  innerRef,
  strokeWidth = 5,
  borderSpacing = 4,
  onKeyDown,
  onChange,onFocus
}) => {
  const aId = id || Math.random().toString();

  return (
    <div className={wrapperClassName} style={wrapperStyle}>
      <label htmlFor={id}>
        <HInputFrame strokeWidth={strokeWidth} pixelBorderSpacing={borderSpacing}>
          <input
            id={aId}
            ref={innerRef}
            name={name}
            disabled={disabled}
            readOnly={readOnly}
            placeholder={placeholder}
            className={`${className} ${s.inputElement}`}
            style={style}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
          />
        </HInputFrame>
      </label>
    </div>
  );
}

export default HTextInput;
