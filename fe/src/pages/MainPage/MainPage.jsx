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
import HPanel from "../../components/HipnosComponents/HPanel/HPanel";
import HPanelContent from "../../components/HipnosComponents/HPanel/HPanelContent";
import HPanelHeader from "../../components/HipnosComponents/HPanel/HPanelHeader";

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
    <div className={`${gs.grid} ${s.pageWrapper} ${gs.fullHeight}`} style={{padding: "10px"}}>
      <div className={`${gs.row} ${gs.h7} ${s.firstRow}`}>
        <HPanel
          className={`${gs.cell} ${gs.w10} ${s.hipnosCodeWrapper}`}
          outstanding
          fullSize
          topLeftSizeHorizontal={100}
          topLeftSizeVertical={100}
          topRightInterlinearSpace={15}
          thinBarWidth={10}
        >
          <HPanelHeader style={{height: "100%", width: "100%"}}></HPanelHeader>
          <HPanelContent style={{overflow: "hidden", width: "100%", height: "100%", marginTop: "80px"}}>
            <HipnosCode/>
          </HPanelContent>
        </HPanel>
        <HPanel className={`${gs.cell} ${gs.w2}`} style={{paddingLeft: "10px"}} fullSize>
          <HPanelHeader></HPanelHeader>
          <HPanelContent style={{height: "100%"}}>
            <ItemsSelector
              items={programItems}
              onActiveChange={(e, idx, newProgram) => setActiveProgramIdx(idx)}
            />
          </HPanelContent>
        </HPanel>
      </div>
      <div className={`${gs.row} ${gs.h5}`} style={{paddingTop: "10px"}}>
          <HPanel className={`${gs.cell} ${gs.w5} ${s.memoriesWrapper}`}>
            {/*<HPanelHeader><h2>Доступные воспоминания</h2></HPanelHeader>*/}
            <HPanelContent style={{height: "100%"}}>
              <Memories
                items={memories}
                onMemoryClick={onMemoryClick}
                onBlockedClick={onBlockedMemoryClick}
              />
            </HPanelContent>
          </HPanel>
          <HPanel className={`${gs.cell} ${gs.w7}`} style={{paddingLeft: "10px"}}>
            {/*<HPanelHeader>*/}
            {/*  <h2>Активна подпрограмма "{programItems[activeProgramIdx]?.title}"</h2>*/}
            {/*</HPanelHeader>*/}
            <HPanelContent>
              <Program
                currentProgram={programItems[activeProgramIdx]}
                onPhraseSubmit={handlePhraseSubmit}
              />
            </HPanelContent>
          </HPanel>
      </div>
    </div>
  )
}

export default MainPage;
