import KeyboardIcon from '@mui/icons-material/Keyboard';

const PhraseSubmitted = ({event}) => {
  const eventInfo = event?.misc_data;
  const phrase = eventInfo?.phrase;

  return (
    <div style={{display: "flex", gap: "5px"}}>
      <KeyboardIcon style={{color: "gray", fontSize: "16pt"}} />
      Введена фраза "{phrase}"
    </div>
  );
}

export default PhraseSubmitted;
