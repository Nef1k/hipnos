import CreditScoreIcon from '@mui/icons-material/CreditScore';

const PhraseUnlocked = ({event}) => {
  const eventData = event?.misc_data;
  const phrase = eventData?.phrase_name;

  return (
    <div style={{display: "flex", gap: "5px"}}>
      <CreditScoreIcon style={{color: "green", fontSize: "16pt"}} />
      Принята фраза "{phrase}"
    </div>
  );
}

export default PhraseUnlocked;
