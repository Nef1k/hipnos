import s from './Memories.module.css';
import {useEffect} from "react";

const Memories = ({items, onMemoryClick, onBlockedClick}) => {

  const memoryTypeImages = {
    [MemoryType.Text]: '/images/memory_text.png',
    [MemoryType.Audio]: '/images/memory_audio.png',
    [MemoryType.Video]: '/images/memory_video.png',
  }
  const lockedImage = '/images/blocked.png';

  const getMemoryImage = (memory) => {
    if (memory.is_locked)
      return lockedImage;

    return memoryTypeImages[memory.memory_type];
  }

  const onClick = (e, idx) => {
    const clickedItem = items[idx];
    if (onBlockedClick !== null && clickedItem.is_locked) {
      onBlockedClick(e, idx, clickedItem);
    } else if (onMemoryClick) {
      onMemoryClick(e, idx, clickedItem);
    }
  }

  return (
    <div className={s.memoriesWrapper}>
      <div className={s.memoriesContainer}>
        {items.map((item, idx) => {
          return (
            <div
              key={item.id}
              className={s.itemWrapper}
              onClick={(e) => onClick(e, idx)}
            >
              <img src={getMemoryImage(item)} alt=""/>
              <p>{item.title || "? ? ?"}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export const MemoryType = {
  Text: 0,
  Audio: 1,
  Video: 2,
}

export default Memories;
