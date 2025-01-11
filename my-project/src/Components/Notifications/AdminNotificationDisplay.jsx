import React from "react";

const AdminNotificationDisplay = ({ notification }) => {
  const formattedDate = new Date(notification.date).toLocaleDateString();
  const formattedTime = notification.time.split(".")[0];

  return (
    <div className="rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-4">
        {/* Notification Title and Time */}
        <div>
          <h3 className="font-semibold text-xl text-gray-800">
            {notification.subject}
          </h3>
          <div className="flex gap-2 text-sm text-gray-500 mt-1">
            <span>{formattedDate}</span>
            <span>|</span>
            <span>{formattedTime}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-4 border-t border-gray-200 pt-4">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {notification.content}
        </p>
      </div>
    </div>
  );
};

export default AdminNotificationDisplay;
