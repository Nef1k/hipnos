import {useParams} from "react-router-dom";

const MemoriesPage = () => {
  const { memoryId } = useParams();
  return (
    <div>
      <h3>Memories Page</h3>
      <p>Memory #{memoryId}</p>
    </div>
  )
}

export default MemoriesPage;
