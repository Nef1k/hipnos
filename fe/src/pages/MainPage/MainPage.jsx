import gs from '../../Global.module.css';
import s from './MainPage.module.css';
import HipnosCode from "../../components/HipnosCode/HipnosCode";
import ItemsSelector, {ItemState} from "../../components/ItemsSelector/ItemsSelector";
import {useState} from "react";
import Memories, {MemoryType} from "../../components/Memories/Memories";
import {useNavigate} from "react-router-dom";
import Program from "../../components/Program/Program";

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
  const initialMemories = [
    {
      id: 1,
      title: "memory 1",
      link: "/memories/1",
      locked: false,
      type: MemoryType.Text,
    },
    {
      id: 2,
      title: "memory 2",
      link: "/memories/2",
      locked: true,
      type: MemoryType.Text,
    },
    {
      id: 3,
      title: "memory 3",
      link: "/memories/3",
      locked: true,
      type: MemoryType.Audio,
    },
    {
      id: 4,
      title: "memory 4",
      link: "/memories/4",
      locked: true,
      type: MemoryType.Audio,
    },
    {
      id: 5,
      title: "memory 5",
      link: "/memories/5",
      locked: true,
      type: MemoryType.Audio,
    },
    {
      id: 6,
      title: "memory 6",
      link: "/memories/6",
      locked: false,
      type: MemoryType.Text,
    },
    {
      id: 7,
      title: "memory 7",
      link: "/memories/7",
      locked: false,
      type: MemoryType.Video,
    },
    {
      id: 8,
      title: "memory 8",
      link: "/memories/8",
      locked: false,
      type: MemoryType.Video,
    },
    {
      id: 9,
      title: "memory 9",
      link: "/memories/9",
      locked: false,
      type: MemoryType.Audio,
    },
    {
      id: 10,
      title: "memory 9",
      link: "/memories/10",
      locked: false,
      type: MemoryType.Audio,
    },
    {
      id: 11,
      title: "memory 9",
      link: "/memories/11",
      locked: false,
      type: MemoryType.Audio,
    },
    {
      id: 12,
      title: "memory 9",
      link: "/memories/12",
      locked: false,
      type: MemoryType.Text,
    },
    {
      id: 13,
      title: "memory 9",
      link: "/memories/13",
      locked: false,
      type: MemoryType.Text,
    },
    {
      id: 14,
      title: "memory 9",
      link: "/memories/14",
      locked: false,
      type: MemoryType.Text,
    },
    {
      id: 15,
      title: "memory 9",
      link: "/memories/15",
      locked: false,
      type: MemoryType.Text,
    },
    {
      id: 16,
      title: "memory 9",
      link: "/memories/16",
      locked: false,
      type: MemoryType.Text,
    },
    {
      id: 17,
      title: "memory 9",
      link: "/memories/17",
      locked: false,
      type: MemoryType.Text,
    },
    {
      id: 18,
      title: "memory 9",
      link: "/memories/18",
      locked: false,
      type: MemoryType.Text,
    },
  ];

  const [memories, setMemories] = useState(initialMemories);
  const [programItems, setProgramItems] = useState(initialPrograms);
  const [activeProgramIdx, setActiveProgramIdx] = useState(0);

  const navigate = useNavigate();

  const onMemoryClick = (e, idx, memory) => {
    navigate(memory.link);
  }
  const onBlockedMemoryClick = (e, idx, memory) => {}

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
