import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  ListItemButton,
  Tooltip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { FaEllipsisV } from "react-icons/fa";
import { io } from "socket.io-client";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1px solid currentColor",
      content: '""',
    },
  },
}));

const Users = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const agencyId = 2; // Replace with actual agency ID from auth system

  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.emit("subscribe", `agency_${agencyId}`);

    const fetchNotifications = async () => {
      try {
        const response = await fetch(`/api/notifications/agency/${agencyId}`);
        const data = await response.json();
        const notificationsWithDetails = await Promise.all(
          data.map(async (notification) => {
            const detailResponse = await fetch(
              `/api/notifications/agency/${agencyId}/details/${notification.notification_id}`
            );
            const details = await detailResponse.json();
            return {
              ...notification,
              bookingDetails: details.bookingDetails,
              read: false,
            };
          })
        );
        setNotifications(notificationsWithDetails);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();

    socket.on("new_notification", async (notification) => {
      try {
        // Fetch complete notification details immediately when receiving new notification
        const detailResponse = await fetch(
          `/api/notifications/agency/${agencyId}/details/${notification.notification_id}`
        );
        const details = await detailResponse.json();

        const enrichedNotification = {
          ...notification,
          bookingDetails: details.bookingDetails,
          read: false,
          date: new Date().toISOString(),
        };

        setNotifications((prev) => [enrichedNotification, ...prev]);
      } catch (error) {
        console.error("Error fetching new notification details:", error);
      }
    });

    return () => socket.disconnect();
  }, [agencyId]);

  const handleNotificationClick = async (notification) => {
    try {
      const updatedNotification = { ...notification, read: true };
      setSelectedNotification(updatedNotification);
      setIsDialogOpen(true);

      // Update notifications list to mark as read
      setNotifications((prev) =>
        prev.map((n) =>
          n.notification_id === notification.notification_id
            ? { ...n, read: true }
            : n
        )
      );

      // Optional: Delete notification after viewing
      await fetch(`/api/notifications/agency/${notification.notification_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error handling notification click:", error);
    }
  };

  const handleBookingResponse = async (content) => {
    console.log("CONTENT GIVEN", content);
    try {
      const responseContent =
        content === "rejection"
          ? "rejection"
          : selectedNotification.content === "payement_reciept"
          ? "validation"
          : "acceptation";

      console.log("RESPONSE CONTENT", responseContent);

      await fetch("/api/notifications/booking/response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: agencyId,
          receiverId: selectedNotification.sender_user_id,
          content: responseContent,
          bookingId: selectedNotification.bookingDetails.booking_id,
        }),
      });

      setNotifications((prev) =>
        prev.filter(
          (n) => n.notification_id !== selectedNotification.notification_id
        )
      );
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error responding to booking:", error);
    }
  };

  const renderNotificationContent = (notification) => {
    const isPaymentReceipt = notification.content === "payement_reciept";
    return (
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <Typography>
          {notification.customer_name} {notification.customer_surname}
        </Typography>
        <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
          {isPaymentReceipt
            ? `${notification.bookingDetails?.offer_name} - Payment Receipt`
            : `${notification.bookingDetails?.offer_name} - Booking Request`}
        </Typography>
      </Box>
    );
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRightWidth: "1px",
          borderRightColor: "divider",
        }}
      >
        <Typography variant="h6">Booking Requests</Typography>
        <Tooltip title="More">
          <IconButton sx={{ fontSize: "17px", color: "text.primary" }}>
            <FaEllipsisV />
          </IconButton>
        </Tooltip>
      </Box>

      <Box
        sx={{
          mt: 2,
          borderRightWidth: "1px",
          borderRightColor: "divider",
          height: { xs: "fit-content", sm: "60vh" },
          overflow: "auto",
        }}
        className="hide-scrollbar"
      >
        {notifications.map((notification) => (
          <ListItemButton
            key={notification.notification_id}
            onClick={() => handleNotificationClick(notification)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              bgcolor: notification.read ? "transparent" : "action.hover",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar sx={{ width: "30px", height: "30px" }} />
              </StyledBadge>
              {renderNotificationContent(notification)}
            </Box>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                {new Date(notification.date).toLocaleTimeString()}
              </Typography>
              {!notification.read && (
                <IconButton
                  sx={{
                    width: "16px",
                    height: "16px",
                    backgroundColor: "#fc424a !important",
                    color: "#fff",
                    fontSize: "10px",
                    float: "right",
                  }}
                >
                  1
                </IconButton>
              )}
            </Box>
          </ListItemButton>
        ))}
      </Box>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Booking Request Details</DialogTitle>
        <DialogContent>
          {selectedNotification && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h5">
                {selectedNotification.bookingDetails?.offer_name}
              </Typography>
              <Typography variant="h6">
                {selectedNotification.bookingDetails?.customer_name}{" "}
                {selectedNotification.bookingDetails?.customer_surname}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                Phone Number:{" "}
                {selectedNotification.bookingDetails?.customer_phone}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                Total Price: {selectedNotification.bookingDetails?.total_price}{" "}
                DA
              </Typography>

              {selectedNotification.content === "payement_reciept" && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1">Receipt Image:</Typography>
                  <img
                    src={selectedNotification.bookingDetails?.reciept_image}
                    alt="Payment Receipt"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      marginTop: "8px",
                    }}
                  />
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleBookingResponse("rejection")}
            color="error"
          >
            Reject
          </Button>
          <Button
            onClick={() => handleBookingResponse("acceptation")}
            color="primary"
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Users;
