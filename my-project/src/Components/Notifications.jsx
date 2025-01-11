import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import NotificationCard from "./Notifications/NotificationCard";
import FileUploadForm from "./Notifications/FileUploadForm";
import "../Style/scrollbarnot.css";
import { useAppContext } from "../contexts/AppContext";

const messageDict = {
  acceptation: {
    title: "Request Approved",
    description:
      "Your request has been approved. Please upload your payment receipt to proceed with the booking confirmation.",
  },
  rejection: {
    title: "Request Rejected",
    description:
      "Unfortunately, your booking request has been rejected. Please contact the agency for more details.",
  },
  validation: {
    title: "Booking Confirmed",
    description:
      "Your booking has been successfully made after receiving your payment. Thank you for choosing our agency.",
  },
};

const Notifications = () => {
  const { isLoggedIn, setIsLoggedIn, clientID, setClientID } = useAppContext();
  //console.log("CLIENT ID -----> " + clientID);
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [agencyID, setAgencyID] = useState(null);
  //const clientID = 2;

  // const fetchAdminNotifications = async () => {
  //   try {
  //     const response = await fetch(
  //       `/api/getFromadminNotifications/${clientID}`
  //     ); // Adjust URL as needed
  //     const data = await response.json();
  //     return data; // Assuming the response contains the notifications array
  //   } catch (error) {
  //     console.error("Error fetching notifications:", error);
  //   }
  // };

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      transports: ["websocket"],
    });

    socket.on("connect_error", (err) => {
      console.error("Connection Error:", err.message);
    });

    socket.emit("subscribe", clientID);

    const fetchNotifications = async () => {
      try {
        // Fetch user notifications
        const userResponse = await fetch(`/api/notifications/user/${clientID}`);
        if (!userResponse.ok)
          throw new Error("Failed to fetch user notifications");
        const userNotifications = await userResponse.json();

        // Fetch admin notifications
        const adminResponse = await fetch(
          `/api/getFromadminNotifications/${clientID}`
        );
        if (!adminResponse.ok)
          throw new Error("Failed to fetch admin notifications");
        const adminNotifications = await adminResponse.json();

        // Combine both notifications
        const combinedNotifications = [
          ...userNotifications,
          ...adminNotifications,
        ].map((notif) => ({
          ...notif,
          id: notif.notification_id,
        }));

        // Sort notifications by date (descending order)
        combinedNotifications.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setNotifications(combinedNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();

    socket.on("new_notification", (newNotification) => {
      setNotifications((prev) => [newNotification, ...prev]);
    });

    return () => socket.disconnect();
  }, [clientID]);

  const handleNotificationClick = async (id) => {
    try {
      const response = await fetch(
        `/api/notifications/user/${clientID}/details/${id}`
      );
      if (!response.ok) throw new Error("Failed to fetch notification details");
      const notificationDetails = await response.json();
      console.log(notificationDetails);

      await fetch(`/api/notifications/markAsRead/${id}`, {
        method: "PATCH",
      });

      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, seen: true } : notif
        )
      );

      setSelectedNotification(notificationDetails);
      setAgencyID(notificationDetails.notification.sender_agency_id);
    } catch (error) {
      console.error("Error fetching notification details:", error);
    }
  };

  const handleBack = () => {
    setSelectedNotification(null);
  };

  if (selectedNotification) {
    return (
      <div className="flex flex-col h-screen p-6">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="font-bold text-3xl mb-2">Notifications</h1>
          <div className="h-[4px] bg-primary rounded-lg mb-4"></div>
          <div className="flex items-center gap-4 mb-2">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Notifications
            </button>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-gray-50 rounded-lg p-6 mx-40 my-5">
          <FileUploadForm
            type={selectedNotification.notification.content}
            message={
              messageDict[selectedNotification.notification.content].description
            }
            bookingDetails={selectedNotification.bookingDetails}
            subject={
              selectedNotification.subject || selectedNotification.content
            }
            agencyID={agencyID}
          />
        </div>
      </div>
    );
  }
  console.log("NOTIFICATIONS: ", notifications);

  return (
    <div className="flex flex-col h-screen p-6">
      <div className="mb-6">
        <h1 className="font-bold text-3xl mb-2">Notifications</h1>
        <div className="h-[4px] bg-primary rounded-lg"></div>
      </div>

      <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar px-40 py-5">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <NotificationCard
              title={messageDict[notification.content].title}
              message={messageDict[notification.content].description}
              date={new Date(notification.date).toLocaleDateString()}
              time={new Date(notification.date).toLocaleTimeString()}
              isRead={notification.seen}
              onClick={() => handleNotificationClick(notification.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
