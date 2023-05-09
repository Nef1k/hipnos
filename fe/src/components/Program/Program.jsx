import s from './Program.module.css';
import Graph from "./Graph/Graph";
import KeyInput from "./KeyInput/KeyInput";

const Program = ({currentProgram}) => {

  const handleKey = (key) => {
    console.log(`Handling key "${key}"`);
  }

  return (
    <div className={s.programWrapper}>
      <h3>Активна подпрограмма "{currentProgram.title}"</h3>
      <div className={s.contentWrapper}>
        <div className={s.wordsGraphWrapper}>
          <div className={s.graphWrapper}>
            <Graph
              currentProgram={currentProgram}
            />
          </div>
          <div className={s.twoSymbolsWrapper}>
            <div className={s.symbol1}>1</div>
            <div className={s.symbol2}>2</div>
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
