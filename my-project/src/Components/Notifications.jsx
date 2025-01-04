import FileUploadForm from "./Notifications/FileUploadForm";
import NotificationCard from "./Notifications/NotificationCard";
import NavigationBar from "./NavigationBar/navigationBar";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../Style/scrollbarnot.css";
// Function to fetch notifications data
const userid =5; //must be dynamic based on badri's implementation
const fetchNotifications = async () => {
  try {
    const response = await fetch(`/api/getFromadminNotifications/${userid}`); // Adjust URL as needed
    const data = await response.json();
    return data; // Assuming the response contains the notifications array
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
};

// Function to fetch details of a specific notification
/* const fetchNotificationById = async (id) => {
  try {
    const response = await fetch(`/api/getFromadminNotificationById/${id}`); // Adjust URL as needed
    const data = await response.json();
    return data; // Assuming the response contains the specific notification details
  } catch (error) {
    console.error("Error fetching notification details:", error);
  }
}; */

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const location = useLocation();

  // Fetch notifications on mount
  useEffect(() => {
    const getNotifications = async () => {
      const notificationsData = await fetchNotifications();
      setNotifications(notificationsData);
    };
    getNotifications();
  }, [location]);

  const handleNotificationClick = async (id) => {
    try {
      const response = await fetch(`/api/getFromadminNotificationById/${id}`);
      const notification = await response.json();
  
      // Update the notifications state
      setNotifications((prevNotifications) =>
        prevNotifications.map((n) =>
          n.notification_id === id ? { ...n, seen: true } : n
        )
      );
  
      setSelectedNotification(notification);
    } catch (error) {
      console.error("Error fetching notification details:", error);
    }
  };

  const handleBackToNotifications = () => {
    setSelectedNotification(null);
  };

  const formatDateTime = (dateTime) => {
    // Split the ISO date-time string into date and time parts
    const [date, timeWithMilliseconds] = dateTime.split('T');
    const time = timeWithMilliseconds.split('.')[0]; // Get time without milliseconds
    
    return { formattedDate: date, formattedTime: time };
  };
  
  
  
  

  return (
    <div>
      <NavigationBar isHome={false} isLoggedIn={true} />
      <div className="mt-[65px] px-80 py-8">
        {selectedNotification ? (
          // Show details of the selected notification
          <div>
            <button
              onClick={handleBackToNotifications}
              className="text-primary underline mb-4"
            >
              Back to Notifications
            </button>
            <div className="p-4 border rounded shadow">
              <div className="flex items-center gap-4">
                <img
                  src={selectedNotification.client_pic}
                  alt="User Profile"
                  className="w-16 h-16 rounded-full mb-4"
                />
                {selectedNotification.type === "adminreply" ? (
                  <h2 className="font-bold text-xl mb-2">Admin</h2>
                ) : (
                  <h2 className="font-bold text-xl mb-2">
                    {selectedNotification.offerName}
                  </h2>
                )}
              </div>

              <FileUploadForm
                type={selectedNotification.type}
                message={selectedNotification.content}
                bookingDetails={selectedNotification.bookingDetails}
                subject={selectedNotification.subject} //added this for the contact us message

              />
            </div>
          </div>
        ) : (
          // Show list of notifications
          <div>
            <h1 className="font-bold text-2xl my-2">Notifications</h1>
            <div className="h-[4px] bg-primary rounded-lg mb-4"></div>
            <div className="flex flex-col gap-0 overflow-y-auto h-screen no-scrollbar">
              {notifications.map((notification) => {
                const { formattedDate, formattedTime } = formatDateTime(notification.date);

                return (
                  <NotificationCard
                    key={notification.notification_id}
                    userProfilePic={notification.client_pic}
                    offerName={notification.offerName}
                    subject={notification.subject} // Use subject here
                    message={notification.content}
                    date={formattedDate} // Use formatted date
                    time={formattedTime} // Use formatted time
                    isRead={notification.seen}
                    type={notification.type}
                    onClick={() => handleNotificationClick(notification.notification_id)}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
