import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';

const SubscriberDisconnected = ({event}) => {
  const eventInfo = event?.misc_data;
  const userId = eventInfo?.user_id;
  const username = eventInfo?.username;

  return (
    <div style={{display: "flex", gap: "5px"}}>
      <NotificationsOffIcon style={{color: "red"}} />
      Пользователь {username} ({userId}) отписался
    </div>
  );
}

export default SubscriberDisconnected;
