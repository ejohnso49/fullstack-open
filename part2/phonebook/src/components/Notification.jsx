const Notification = ({ message, errorState }) => {
  if (!message) {
    return null;
  }

  const className = errorState === true ? 'notification-error' : 'notification-status';

  return (
    <div className={className}>
      {message}
    </div>
  );
};

export default Notification;
