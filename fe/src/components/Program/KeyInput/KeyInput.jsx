import s from './KeyInput.module.css';
import {useState} from "react";

const KeyInput = ({onKeySubmitted}) => {

  const [key, setKey] = useState("");

  const handleSubmitClick = (e) => {
    if (onKeySubmitted) {
      onKeySubmitted(key);
    }
    setKey("");
  }

  return (
    <div className={s.keyFormWrapper}>
      <input
        type="text"
        placeholder="Введите код"
        value={key}
        onChange={(e) => {setKey(e.target.value)}}
      />
      <button
        onClick={handleSubmitClick}
      >
        БДЫЩ
      </button>
    </div>
  )
}

export default KeyInput;
