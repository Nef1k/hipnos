import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const PhraseActionTriggered = ({event}) => {
  const eventData = event?.misc_data;
  const actionName = eventData?.action_name;
  const args = _buildArgs(eventData);
  const result = eventData?.result;

  function _buildArgs(eventData) {
    const result = [];
    const args_ = eventData?.args || [];
    const kwargs = eventData?.kwargs || {};
    for (let i in args_) {
      result.push([i.toString(), args_[i]]);
    }
    for (let argName in kwargs) {
      result.push([argName.toString(), kwargs[argName]]);
    }

    return result;
  }

  return (
    <div style={{display: "flex", gap: "5px"}}>
      <PlayCircleOutlineIcon style={{color: "orange", fontSize: "16pt"}} />
      <div>
        Выполнено фразовое действие "{actionName}"
        {args.length > 0 && <>

          <h4>Аргументы</h4>
          <ul>
            {args.map(([argName, argValue], idx) => (
              <li key={idx}>{argName}: {argValue}</li>
            ))}
          </ul>
          <h4>Результат: {result}</h4>
        </>}
      </div>
    </div>
  );
}

export default PhraseActionTriggered;
