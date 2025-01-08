const NotificationCard = ({
  userProfilePic,
  offerName,
  subject,
  message,
  date,
  time,
  isRead,
  type,
  onClick,
}) => {
  return (
    <div
      className={`my-1 w-full p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow bg-opacity-10 ${
        isRead ? "bg-gray-100" : "bg-primary"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-6">
        <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
          <img
            src={userProfilePic}
            alt="User Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div>
            {type == "adminreply"?(<h3
              className={`font-semibold text-lg ${
                isRead ? "text-gray-800" : "text-primary"
              }`}
            >
              {subject}
            </h3>):(<h3
              className={`font-semibold text-lg ${
                isRead ? "text-gray-800" : "text-primary"
              }`}
            >
              {offerName}
            </h3>)}

            <p
              className={`text-sm ${
                isRead
                  ? "text-gray-600 font-sm"
                  : "text-blackishGreen font-medium"
              }`}
            >
              {message}
            </p>
          </div>
          <div className="flex gap-2">
            <p
              className={`text-sm ${isRead ? "text-gray-500" : "text-primary"}`}
            >
              {date}
            </p>
            <p
              className={`text-sm ${isRead ? "text-gray-500" : "text-primary"}`}
            >
              {time}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
