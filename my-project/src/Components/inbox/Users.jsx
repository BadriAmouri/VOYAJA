import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import pdfIcon from "../../assets/pdf.png";
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
import { useAppContext } from "../../contexts/AppContext";

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
  const { agencyID } = useAppContext();
  //const agencyID = 14;
  const bufferToBase64 = (buffer) => {
    const binary = buffer.reduce(
      (acc, byte) => acc + String.fromCharCode(byte),
      ""
    );
    return btoa(binary);
  };
  const downloadImage = (imageUrl, fileName) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenDocument = (pdfDataUrl) => {
    const newTab = window.open();
    newTab.document.write(`
      <html>
        <body>
          <embed src="${pdfDataUrl}" width="100%" height="100%" type="application/pdf" />
        </body>
      </html>
    `);
    newTab.document.close();
  };

  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.emit("subscribe", `agency_${agencyID}`);

    const fetchNotifications = async () => {
      try {
        const response = await fetch(`/api/notifications/agency/${agencyID}`);
        const data = await response.json();
        const notificationsWithDetails = await Promise.all(
          data.map(async (notification) => {
            const detailResponse = await fetch(
              `/api/notifications/agency/${agencyID}/details/${notification.notification_id}`
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
        console.log(notificationsWithDetails);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();

    socket.on("new_notification", async (notification) => {
      try {
        const detailResponse = await fetch(
          `/api/notifications/agency/${agencyID}/details/${notification.notification_id}`
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
  }, [agencyID]);

  const handleNotificationClick = async (notification) => {
    try {
      const updatedNotification = { ...notification, read: true };
      setSelectedNotification(updatedNotification);
      setIsDialogOpen(true);

      setNotifications((prev) =>
        prev.map((n) =>
          n.notification_id === notification.notification_id
            ? { ...n, read: true }
            : n
        )
      );
      console.log(notification);
      if (notification.content === "payement_reciept") {
        // Get receipt from the backend with proper MIME type info
        try {
          const receiptResponse = await fetch(
            `/api/notifications/receipt/${notification.bookingDetails.booking_id}`
          );
          const receiptData = await receiptResponse.json();

          // Create blob and object URL based on MIME type
          const byteArray = new Uint8Array(receiptData.data.data);
          const blob = new Blob([byteArray], { type: receiptData.mimetype });
          const fileUrl = URL.createObjectURL(blob);

          setSelectedNotification((prev) => ({
            ...prev,
            bookingDetails: {
              ...prev.bookingDetails,
              reciept_image: fileUrl,
              reciept_mimetype: receiptData.mimetype,
              reciept_filename: receiptData.filename,
            },
          }));
        } catch (error) {
          console.error("Error fetching receipt:", error);
        }
      }
      // ... rest of existing code for passport handling stays the same ...
    } catch (error) {
      console.error("Error handling notification click:", error);
    }
  };

  const handleBookingResponse = async (content) => {
    try {
      const responseContent =
        content === "rejection"
          ? "rejection"
          : selectedNotification.content === "payement_reciept"
          ? "validation"
          : "acceptation";

      console.log("CONTENT BEING SENT:", responseContent);
      console.log(
        "SELECTED NOTIF SENDER ID:",
        selectedNotification.sender_user_id
      );
      await fetch("/api/notifications/booking/response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: agencyID,
          receiverId: selectedNotification.sender_user_id,
          content: responseContent,
          bookingId: selectedNotification.bookingDetails.booking_id,
        }),
      });
      console.log("----> ", {
        senderId: agencyID,
        receiverId: selectedNotification.sender_user_id,
        content: responseContent,
        bookingId: selectedNotification.bookingDetails.booking_id,
      });

      setNotifications((prev) =>
        prev.filter(
          (n) => n.notification_id !== selectedNotification.notification_id
        )
      );
      setIsDialogOpen(false);
      await fetch(
        `/api/notifications/agency/${selectedNotification.notification_id}`,
        { method: "DELETE" }
      );
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
              {/* Offer Details */}
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {selectedNotification.bookingDetails?.offer_name}
              </Typography>
              <Typography variant="h6" sx={{ color: "text.secondary" }}>
                {selectedNotification.bookingDetails?.customer_name}{" "}
                {selectedNotification.bookingDetails?.customer_surname}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                Phone Number:{" "}
                {selectedNotification.bookingDetails?.customer_phone}
              </Typography>

              {/* Price Breakdown */}
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: "background.default",
                  borderRadius: 1,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Price Breakdown
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  Base Price:{" "}
                  <strong>
                    {selectedNotification.bookingDetails?.base_price} DA
                  </strong>
                </Typography>
                {selectedNotification.bookingDetails?.priceBreakdown
                  ?.optionsAdded?.length > 0 && (
                  <Box sx={{ mt: 1 }}>
                    <Typography>Selected Options:</Typography>
                    <ul style={{ paddingLeft: "20px" }}>
                      {selectedNotification.bookingDetails.priceBreakdown.optionsAdded.map(
                        (option, index) => (
                          <li key={index}>
                            {option.name} - {option.price} DA
                          </li>
                        )
                      )}
                    </ul>
                  </Box>
                )}
                <Typography sx={{ mt: 1 }}>
                  Total:{" "}
                  <strong>
                    {selectedNotification.bookingDetails?.total_price} DA
                  </strong>
                </Typography>
              </Box>

              {/* Passport Image */}
              {/* {selectedNotification.content === "request" && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1">Passport(s):</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 1 }}
                    onClick={() =>
                      handleDownloadPDF(
                        `/api/documents/passport/${selectedNotification.bookingDetails.booking_id}`,
                        "passport"
                      )
                    }
                  >
                    Download Passport
                  </Button>
                </Box>
              )}

              {selectedNotification.content === "payement_reciept" && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1">Receipt Image:</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 1 }}
                    onClick={() =>
                      handleDownloadPDF(
                        `/api/documents/receipt/${selectedNotification.bookingDetails.booking_id}`,
                        "receipt"
                      )
                    }
                  >
                    Download Receipt
                  </Button> */}
              {selectedNotification.content === "request" && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1">Passport(s):</Typography>
                  <Button
                    className="flex flex-col items-center gap-2 text-black-500 hover:underline"
                    onClick={() =>
                      handleOpenDocument(
                        `data:application/pdf;base64,${bufferToBase64(
                          selectedNotification.bookingDetails.passports_images
                            .data
                        )}`
                      )
                    }
                  >
                    <img
                      src={pdfIcon}
                      alt="Passports"
                      style={{ width: "20px", height: "20px" }}
                    />
                    Passport(s)
                  </Button>
                </Box>
              )}

              {selectedNotification.content === "payement_reciept" && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1">Receipt Image:</Typography>
                  <Button
                    className="flex flex-col items-center gap-2 text-black-500 hover:underline"
                    onClick={() =>
                      handleOpenDocument(
                        `data:application/pdf;base64,${bufferToBase64(
                          selectedNotification.bookingDetails.reciept_image.data
                        )}`
                      )
                    }
                  >
                    <img
                      src={pdfIcon}
                      alt="Payment Receipt"
                      style={{ width: "20px", height: "20px" }}
                    />
                    Payment Receipt
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleBookingResponse("acceptation")}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleBookingResponse("rejection")}
          >
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Users;
