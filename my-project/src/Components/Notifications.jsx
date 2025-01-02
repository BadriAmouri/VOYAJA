import React, { useState, useEffect } from "react";
import "../Style/scrollbarnot.css";
import NavigationBar from "./NavigationBar/navigationBar";
import NotificationCard from "./Notifications/NotificationCard";
import FileUploadForm from "./Notifications/FileUploadForm";
import { useLocation } from "react-router-dom";

const userid = 5; // Update this dynamically as per your implementation

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const location = useLocation();
  const [socket, setSocket] = useState(null);

  // Fetch notifications on component mount
  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     try {
  //       const response = await fetch(
  //         `/api/getFromadminNotifications/${userid}`
  //       );
  //       const data = await response.json();
  //       setNotifications(data);
  //     } catch (error) {
  //       console.error("Error fetching notifications:", error);
  //     }
  //   };
  //   fetchNotifications();
  // }, [location]);

  // WebSocket connection
  // useEffect(() => {
  //   const ws = new WebSocket("ws://your-backend-websocket-url");

  //   ws.onopen = () => {
  //     console.log("WebSocket connected");
  //     ws.send(JSON.stringify({ type: "subscribe", userId: userid }));
  //   };

  //   ws.onmessage = (event) => {
  //     const newNotification = JSON.parse(event.data);
  //     if (newNotification.type === "notification") {
  //       setNotifications((prevNotifications) => [
  //         newNotification,
  //         ...prevNotifications,
  //       ]);
  //     }
  //   };

  //   ws.onclose = () => {
  //     console.log("WebSocket disconnected");
  //   };

  //   setSocket(ws);

  //   return () => {
  //     if (ws) ws.close();
  //   };
  // }, []);

  const handleNotificationClick = async (id) => {
    try {
      const response = await fetch(`/api/getFromadminNotificationById/${id}`);
      const notification = await response.json();

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
    const [date, timeWithMilliseconds] = dateTime.split("T");
    const time = timeWithMilliseconds.split(".")[0];
    return { formattedDate: date, formattedTime: time };
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
                  {selectedNotification.type === "adminreply"
                    ? "Admin"
                    : selectedNotification.offerName}
                </h2>
              </div>
              <FileUploadForm
                type={selectedNotification.type}
                message={selectedNotification.content}
                bookingDetails={selectedNotification.bookingDetails}
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
                const { formattedDate, formattedTime } = formatDateTime(
                  notification.date
                );

                return (
                  <NotificationCard
                    key={notification.notification_id}
                    userProfilePic={notification.client_pic}
                    offerName={notification.offerName}
                    subject={notification.subject}
                    message={notification.content}
                    date={formattedDate}
                    time={formattedTime}
                    isRead={notification.seen}
                    type={notification.type}
                    onClick={() =>
                      handleNotificationClick(notification.notification_id)
                    }
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
