import FileUploadForm from "./Notifications/FileUploadForm";
import NotificationCard from "./Notifications/NotificationCard";
import NavigationBar from "./NavigationBar/navigationBar";
import React, { useState } from "react";

const notificationsData = [
  {
    id: 1,
    type: "acceptation",
    userProfilePic:
      "https://upload.wikimedia.org/wikipedia/commons/4/48/Globe_icon.svg",
    offerName: "Winter Wonderland Package",
    message:
      "Your request has been approved. Please proceed with the payment to confirm your booking.",
    bookingDetails: {
      destination: "Paris, France",
      goDate: "2024-12-20",
      returnDate: "2024-12-27",
      priceBreakdown: {
        basePrice: 1200,
        optionsAdded: [
          { name: "Additional Baggage", price: 50 },
          { name: "Meal Upgrade", price: 20 },
        ],
        totalPrice: 1270,
      },
    },
    date: "2024-12-11",
    time: "10:00 AM",
    isRead: false,
  },
  {
    id: 2,
    type: "rejection",
    userProfilePic:
      "https://upload.wikimedia.org/wikipedia/commons/8/8c/Airplane_takeoff_icon.svg",
    offerName: "Summer Escape Special",
    message:
      "Unfortunately, your request could not be approved. Please contact us for further details.",
    bookingDetails: {},
    date: "2024-12-09",
    time: "3:45 PM",
    isRead: true,
  },
  {
    id: 3,
    type: "confirmation",
    userProfilePic:
      "https://upload.wikimedia.org/wikipedia/commons/a/a0/Cruise_icon.svg",
    offerName: "New Year Gala Package",
    message:
      "Your booking has been successfully confirmed. Thank you for choosing us!",
    bookingDetails: {},
    date: "2024-12-08",
    time: "8:30 AM",
    isRead: false,
  },
];

const Notifications = () => {
  const [notifications] = useState(notificationsData);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleNotificationClick = (id) => {
    const notification = notifications.find((notif) => notif.id === id);
    setSelectedNotification(notification);
  };

  const handleBackToNotifications = () => {
    setSelectedNotification(null);
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
              <div className=" flex items-center gap-4">
                <img
                  src={selectedNotification.userProfilePic}
                  alt="User Profile"
                  className="w-16 h-16 rounded-full mb-4"
                />
                <h2 className="font-bold text-xl mb-2">
                  {selectedNotification.offerName}
                </h2>
              </div>

              <FileUploadForm
                type={selectedNotification.type}
                message={selectedNotification.message}
                bookingDetails={selectedNotification.bookingDetails}
              />
            </div>
          </div>
        ) : (
          // Show list of notifications
          <div>
            <h1 className="font-bold text-2xl my-2">Notifications</h1>
            <div className="h-[4px] bg-primary rounded-lg mb-4"></div>
            <div className="flex flex-col gap-0 overflow-y-auto h-screen">
              {notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  userProfilePic={notification.userProfilePic}
                  offerName={notification.offerName}
                  message={notification.message}
                  date={notification.date}
                  time={notification.time}
                  isRead={notification.isRead}
                  onClick={() => handleNotificationClick(notification.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
