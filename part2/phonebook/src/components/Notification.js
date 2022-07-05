const Notification = ({ message }) => {
  if (message === null) {
    return null;
  } else {
    return <div className={message.type}>{message.message}</div>;
  }
};

export default Notification;
