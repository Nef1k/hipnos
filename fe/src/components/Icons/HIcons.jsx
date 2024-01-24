import i from './HIcons.module.css';

function IconBuilder(_className) {
  return ({style, className}) => <span className={`${_className} ${i.baseIcon} ${className}`} style={style} />
}

export const HPenis = IconBuilder(i.hPenisIcon);
