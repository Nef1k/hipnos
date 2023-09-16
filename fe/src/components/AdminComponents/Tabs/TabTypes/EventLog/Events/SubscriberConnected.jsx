import NotificationAddIcon from '@mui/icons-material/NotificationAdd';

const SubscriberConnected = ({event}) => {
  const eventInfo = event?.misc_data;
  const userId = eventInfo?.user_id;
  const username = eventInfo?.username;

  return (
    <div style={{display: "flex", gap: "5px"}}>
      <NotificationAddIcon style={{color: "green"}} />
      Пользователь {username} ({userId}) подписался
    </div>
  );
}

export default SubscriberConnected;
