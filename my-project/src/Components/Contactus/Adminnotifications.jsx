import React, { useState, useEffect } from "react";
import NotificationCard from "../Notifications/NotificationCard";
import NavigationBar from "../NavigationBar/navigationBar";
import Adminmessage from "./Admingmessagepage";
import { useLocation } from "react-router-dom";
import "../../Style/Searchpagestyle.css";

const Adminnotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const location = useLocation();
// Fetch notifications from the backend
const fetchNotifications = async () => {
    try {
      const response = await fetch("/api/admin/notifications");
      const data = await response.json();
      setNotifications(data); // Update state with the latest notifications
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Use `useEffect` to fetch notifications when the component mounts or location changes
  useEffect(() => {
    fetchNotifications();
  }, [location]);

  const handleNotificationClick = async (id) => {
    try {
      const response = await fetch(`/api/admin/notifications/${id}`);
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

  return (
    <div>
      <NavigationBar isHome={false} isLoggedIn={true} />
      <div className="mt-[65px] px-80 py-8">
        {selectedNotification ? (
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
                <h2 className="font-bold text-xl mb-2">
                  {selectedNotification.client_first_name+" "+selectedNotification.client_last_name}
                </h2>
              </div>
             {  console.log(`The selected message is: ${selectedNotification.content}`)}
             {  console.log(`The selected id is: ${selectedNotification.sender_user_id}`)}
              <Adminmessage
                id={selectedNotification.sender_user_id}
                content={selectedNotification.content}
                subject={selectedNotification.subject}
              />
            </div>
          </div>
        ) : (
          <div>
            <h1 className="font-bold text-2xl my-2">Notifications</h1>
            <div className="h-[4px] bg-primary rounded-lg mb-4"></div>
            <div className="flex flex-col gap-0 overflow-y-auto h-screen no-scrollbar">
            {notifications.map((notification) => {
  // Parse the date and time
  const fullDate = new Date(notification.date);
  const formattedDate = fullDate.toISOString().split("T")[0]; // Extracts YYYY-MM-DD
  const formattedTime = fullDate.toTimeString().slice(0, 5); // Extracts HH:mm
  console.log(`The message is: ${notification.content}`);



  return (
    <NotificationCard
      key={notification.notification_id}
      userProfilePic={notification.client_pic}
      offerName={notification.subject}
      message={notification.content}
      date={formattedDate} // Pass formatted date
      time={formattedTime} // Pass formatted time
      isRead={notification.seen}
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

export default Adminnotifications;
