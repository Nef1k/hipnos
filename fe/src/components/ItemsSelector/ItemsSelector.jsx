import s from './ItemsSelector.module.css';
import SelectorItem from "./SelectorItem/SelectorItem";
import {useEffect, useState} from "react";
import {HIconEyeClosed, HIconEyeOpen, HIconLockClosed} from "../HipnosComponents/HIcons/HIcons";

const ItemsSelector = ({items, initialActiveIdx, onActiveChange}) => {
  const itemWidth = 70;
  const stateImageUrls = {
    [ItemState.Finished]: <HIconEyeOpen width={itemWidth} />,
    [ItemState.InProgress]: <HIconEyeClosed width={itemWidth} />,
    [ItemState.Locked]: <HIconLockClosed width={itemWidth} />,
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
              active={idx === activeIdx}
              title={item.title}
              disabled={getItemState(item) === ItemState.Locked}
              icon={stateImageUrls[getItemState(item)]}
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
