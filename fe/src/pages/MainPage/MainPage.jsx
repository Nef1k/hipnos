import gs from '../../Global.module.css';
import s from './MainPage.module.css';
import HipnosCode from "../../components/HipnosCode/HipnosCode";
import ItemsSelector, {ItemState} from "../../components/ItemsSelector/ItemsSelector";
import {useEffect, useState} from "react";
import Memories, {MemoryType} from "../../components/Memories/Memories";
import {useNavigate} from "react-router-dom";
import Program from "../../components/Program/Program";
import {axiosInstance} from "../../api/axios";

const MainPage = () => {
  const initialPrograms = [
    {
      id: 1,
      title: "Морфей",
      state: ItemState.Finished,
      dstWord: "Космос",
      sourceWords: [
        "Пустота",
        "Большой Взрыв",
        "Горизонт Событий",
      ]
    },
    {
      id: 2,
      title: "Фантас",
      state: ItemState.InProgress,
      dstWord: null,
      sourceWords: [
        "dlkasdf",
        null,
        "fwqe3r5",
        "t1gf354"
      ],
    },
    {
      id: 3,
      title: "Фобетор",
      state: ItemState.Locked,
      dstWord: null,
      sourceWords: [],
    }
  ];

  const [memories, setMemories] = useState([]);
  const [programItems, setProgramItems] = useState(initialPrograms);
  const [activeProgramIdx, setActiveProgramIdx] = useState(0);

  const navigate = useNavigate();

  const onMemoryClick = (e, idx, memory) => {
    navigate(`/memories/${memory.id}`);
  }
  const onBlockedMemoryClick = (e, idx, memory) => {}

  useEffect(() => {
    async function fetchMemories() {
      const result = await axiosInstance.get('/hipnos/memories/');
      const memories = result.data;
      setMemories(memories);
    }

    fetchMemories()
      .catch((e) => {console.error(e);});
  }, []);

  return (
    <div className={gs.grid}>
      <div className={`${gs.row} ${gs.h7} ${s.firstRow}`}>
        <div className={`${gs.cell} ${gs.w10} ${s.hipnosCodeWrapper}`}>
          <HipnosCode />
        </div>
        <div className={`${gs.cell} ${gs.w2}`}>
          <ItemsSelector
            items={programItems}
            onActiveChange={(e, idx, newProgram) => setActiveProgramIdx(idx)}
          />
        </div>
      </div>
      <div className={`${gs.row} ${gs.h5}`}>
        <div className={`${gs.cell} ${gs.w5} ${s.memoriesWrapper}`}>
          <Memories
            items={memories}
            onMemoryClick={onMemoryClick}
            onBlockedClick={onBlockedMemoryClick}
          />
        </div>
        <div className={`${gs.cell} ${gs.w7}`}>
          <Program
            currentProgram={programItems[activeProgramIdx]}
          />
        </div>
      </div>
    </div>
  )
}

export default MainPage;
