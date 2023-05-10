import s from './MemoriesPage.module.css';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {axiosInstance} from "../../api/axios";

const MemoriesPage = () => {
  const { memoryId } = useParams();

  const [memory, setMemory] = useState({});

  useEffect(() => {
    async function fetchMemory(memoryId) {
      const result = await axiosInstance.get(`/hipnos/memories/${memoryId}/`);
      const memory = result?.data;
      setMemory(memory);
    }

    fetchMemory(memoryId)
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className={s.memoryWrapper}>
      <div>
        <h1>{memory.title}</h1>
        <div dangerouslySetInnerHTML={{__html: memory.html_text}} className={s.contentWrapper}></div>
      </div>
    </div>
  )
}

export default MemoriesPage;
