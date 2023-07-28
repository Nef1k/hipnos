import iconEyeClosed from './icons/eye_closed.svg';
import iconEyeOpen from './icons/eye_open.svg';
import iconLockClosed from './icons/lock.svg';

const HIconBuilder = (iconSrc) => {
  return ({style, className, alt, width, height}) => {
    return (
      <img alt={alt} src={iconSrc} className={className} style={{...style, aspectRatio: "1 / 1"}} width={width} height={height} />
    );
  }
}

export const HIconEyeClosed = HIconBuilder(iconEyeClosed);
export const HIconEyeOpen = HIconBuilder(iconEyeOpen);
export const HIconLockClosed = HIconBuilder(iconLockClosed);
