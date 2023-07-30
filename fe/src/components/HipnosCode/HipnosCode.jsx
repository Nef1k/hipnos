import gs from '../../Global.module.css';
import s from './HipnosCode.module.css';
import SegmentedTextInput from "../SegmentedTextInput/SegmentedTextInput";
import {useState} from "react";

const HipnosCode = () => {
  const [text, setText] = useState("");

  const onChange = (newText) => {
    setText(newText);
  }

  return (
    <div className={`${s.mainWrapper}`}>
      <h1 style={{fontFamily: "SciFi_RUS"}}>Г.И.П.Н.О.С</h1>
      <div className={`${s.codeInputWrapper}`}>
        <SegmentedTextInput
          value={text}
          onChange={(newText) => onChange(newText)}
          segmentsCount={6}
          segmentClassName={s.segment}
          fieldWidth={1100}
        />
      </div>
    </div>
  );
}

export default HipnosCode;
