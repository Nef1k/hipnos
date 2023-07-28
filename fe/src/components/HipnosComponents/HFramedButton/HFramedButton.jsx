import s from './HFramedButton.module.css';

const HFramedButton = ({children, style, className, disabled, selected, caption, onClick}) => {
  return (
    <div className={`${s.componentWrapper}`}>
      <div
        style={style}
        className={`${s.buttonWrapper} ${className} ${disabled ? s.buttonDisabled : ""}`}
      >
        <div className={selected ? s.buttonSelected : ""}></div>
        <div className={`${s.innerWrapper}`}>
          {children}
        </div>
      </div>
      {caption && <span>{caption}</span>}
    </div>
  );
}

export default HFramedButton;
