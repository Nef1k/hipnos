import s from './ItemsSelector.module.css';
import SelectorItem from "./SelectorItem/SelectorItem";
import {useEffect, useState} from "react";

const ItemsSelector = ({items, initialActiveIdx, onActiveChange}) => {
  const stateImageUrls = {
    [ItemState.Finished]: "/images/eye_open_no_border.png",
    [ItemState.InProgress]: "/images/eye_closed_no_border.png",
    [ItemState.Locked]: "/images/blocked_no_border.png",
  }

  const getItemState = (item) => {
    return item.state;
  }

  const onItemClick = (e, idx) => {
    const newActiveItem = items[idx];
    if (newActiveItem.state === ItemState.Locked) return;
    setActiveIdx(idx);
    if (onActiveChange) {
      onActiveChange(e, idx, newActiveItem);
    }
  }

  const [activeIdx, setActiveIdx] = useState(initialActiveIdx || 0);

  return (
    <div className={s.itemsWrapper}>
      {items.map((item, idx) => {
        return (
          <div className={s.itemWrapper} onClick={(e) => onItemClick(e, idx)}>
            <SelectorItem
              key={idx}
              isActive={idx === activeIdx}
              title={item.title}
              imgUrl={stateImageUrls[getItemState(item)]}
            />
          </div>
        );
      })}
    </div>
  )
}

export const ItemState = {
  Locked: 0,
  InProgress: 1,
  Finished: 2,
}

export default ItemsSelector;
