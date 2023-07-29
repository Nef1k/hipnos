import s from './SelectorItem.module.css';
import HFramedButton from "../../HipnosComponents/HFramedButton/HFramedButton";
import {HIconBuilder} from "../../HipnosComponents/HIcons/HIcons";

const SelectorItem = ({title, icon, active, disabled}) => {
  return (
    <div>
      <HFramedButton
        caption={title}
        disabled={disabled}
        selected={active}
      >
        {icon}
      </HFramedButton>
    </div>
    // <div className={`${s.itemWrapper} ${active ? s.activeWrapper : ""}`}>
    //   <img
    //     src={imgUrl}
    //     alt={title}
    //     className={s.itemImage}
    //   />
    //   <p className={s.itemTitle}>
    //     {title}
    //   </p>
    // </div>
  );
}

export default SelectorItem;
