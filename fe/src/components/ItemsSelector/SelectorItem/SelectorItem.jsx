import s from './SelectorItem.module.css';

const SelectorItem = ({title, imgUrl, isActive}) => {
  return (
    <div className={`${s.itemWrapper} ${isActive ? s.activeWrapper : ""}`}>
      <img
        src={imgUrl}
        alt={title}
        className={s.itemImage}
      />
      <p className={s.itemTitle}>
        {title}
      </p>
    </div>
  );
}

export default SelectorItem;
