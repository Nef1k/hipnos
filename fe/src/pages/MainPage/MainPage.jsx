import gs from '../../Global.module.css';
import s from './MainPage.module.css';
import HipnosCode from "../../components/HipnosCode/HipnosCode";
import ItemsSelector, {ItemState} from "../../components/ItemsSelector/ItemsSelector";
import {useEffect, useState} from "react";
import Memories, {MemoryType} from "../../components/Memories/Memories";
import {useNavigate} from "react-router-dom";
import Program from "../../components/Program/Program";
import {axiosInstance} from "../../api/axios";
import useNotifications from "../../hooks/useNotifications";

const MainPage = () => {
  const [memories, setMemories] = useState([]);
  const [programItems, setProgramItems] = useState([]);
  const [activeProgramIdx, setActiveProgramIdx] = useState(0);

  const navigate = useNavigate();

  const onMemoryClick = (e, idx, memory) => {
    navigate(`/memories/${memory.id}`);
  }
  const onBlockedMemoryClick = (e, idx, memory) => {
  }

  const handlePhraseSubmit = (phrase) => {
    submitPhrase(phrase)
      .catch((e) => {
        console.log(e)
      })
  }

  async function fetchMemories() {
    const result = await axiosInstance.get('/hipnos/memories/');
    const memories = result.data;
    setMemories(memories);
  }

  async function fetchPrograms() {
    const result = await axiosInstance.get('/hipnos/programs/');
    const programs = result.data;
    setProgramItems(programs);
  }

  async function submitPhrase(phrase) {
    const result = await axiosInstance.post('/hipnos/programs/phrase/', {
      phrase: phrase
    });

    if (result.status === 200) {
      refreshData();
    } else {
      throw new Error(`Error while submitting pharse ${phrase}`);
    }
  }

  function refreshData() {
    fetchMemories()
      .catch((e) => {
        console.error(e);
      });
    fetchPrograms()
      .catch((e) => {
        console.error(e);
      });
  }

  function handleMemoriesNotifications(payload) {
    fetchMemories()
      .catch((e) => {
        console.error(e);
      });
  }

  function handleProgramsNotifications(payload) {
    fetchPrograms()
      .catch((e) => {
        console.error(e);
      });
  }

  function handlePhraseNotifications(payload) {
    fetchPrograms()
      .catch((e) => {
        console.error(e);
      });
  }

  const {subscribe, unsubscribe} = useNotifications();

  useEffect(() => {
    subscribe({
      "memories": handleMemoriesNotifications,
      "programs": handleProgramsNotifications,
      "phrases": handlePhraseNotifications,
    })
    refreshData();
    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <div className={gs.grid}>
      <div className={`${gs.row} ${gs.h7} ${s.firstRow}`}>
        <div className={`${gs.cell} ${gs.w10} ${s.hipnosCodeWrapper}`}>
          <HipnosCode/>
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
            onPhraseSubmit={handlePhraseSubmit}
          />
        </div>
      </div>
    </div>
  )
}

export default MainPage;
