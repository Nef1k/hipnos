import s from './KeyInput.module.css';
import {useState} from "react";

const KeyInput = ({onKeySubmitted}) => {

  const [key, setKey] = useState("");

  let enterFired = false;

  const handlePhraseSubmit = () => {
    if (onKeySubmitted) {
      onKeySubmitted(key);
    }
    setKey("");
  }

  const handleSubmitBtnClick = (e) => {
    handlePhraseSubmit();
  }

  const handleEnter = () => {
    handlePhraseSubmit();
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (!enterFired) {
        handleEnter();
      }
      enterFired = true
    }
  }

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      enterFired = false;
    }
  }

  return (
    <div className={s.keyFormWrapper}>
      <input
        type="text"
        placeholder="Введите код"
        value={key}
        onChange={(e) => {setKey(e.target.value)}}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      />
      <button onClick={handleSubmitBtnClick}>БДЫЩ</button>
    </div>
  )
}

export default KeyInput;
