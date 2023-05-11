import s from './Program.module.css';
import Graph from "./Graph/Graph";
import KeyInput from "./KeyInput/KeyInput";
import {useEffect} from "react";

const Program = ({currentProgram, onPhraseSubmit}) => {

  const handleKey = (phrase) => {
    if (onPhraseSubmit){
      onPhraseSubmit(phrase);
    }
  }

  useEffect(() => {
    // console.log(currentProgram);
  }, [currentProgram]);

  const symbol1 = currentProgram?.code_part ? currentProgram.code_part[0] : '';
  const symbol2 = currentProgram?.code_part ? currentProgram.code_part[1] : '';

  return (
    <div className={s.programWrapper}>
      <h3>Активна подпрограмма "{currentProgram?.title}"</h3>
      <div className={s.contentWrapper}>
        <div className={s.wordsGraphWrapper}>
          <div className={s.graphWrapper}>
            <Graph
              currentProgram={currentProgram}
            />
          </div>
          <div className={s.twoSymbolsWrapper}>
            <div className={s.symbol1}>{symbol1}</div>
            <div className={s.symbol2}>{symbol2}</div>
          </div>
        </div>
        <div className={s.keyInputWrapper}>
          <KeyInput
            onKeySubmitted={handleKey}
          />
        </div>
      </div>
    </div>
  );
}

export default Program;
