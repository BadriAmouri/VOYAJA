import React, { useState } from "react";
import "../../Style/EditPassword.css";
import { useAppContext } from "../../contexts/AppContext";

const EditPassword = () => {
  const id = 21;  // Set the user ID statically for testing purposes
  const {clientID, setClientID} = useAppContext();


  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Visibility state for each password field
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isCheckingPassword, setIsCheckingPassword] = useState(false);
  const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState(false);

  // Function to validate current password when "Validate" button is clicked
  const validateCurrentPassword = async () => {
    setIsCheckingPassword(true);
    setErrorMessage(""); // Reset previous error messages

    try {
      const response = await fetch(`/client/check-password/${clientID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsCurrentPasswordValid(true); // Current password is valid
        setErrorMessage("");
      } else {
        setIsCurrentPasswordValid(false); // Invalid current password
        setErrorMessage(data.message || "Invalid current password.");
      }
    } catch (error) {
      setIsCurrentPasswordValid(false);
      setErrorMessage("An error occurred while validating the password.");
    } finally {
      setIsCheckingPassword(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`client/${clientID}/update-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Password updated successfully!");
        setErrorMessage("");

        // Clear input fields after success
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        setIsCurrentPasswordValid(false);

        // Hide the success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage(""); // Clear the success message
        }, 3000);
      } else {
        setErrorMessage(data.message || "Failed to update password.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while updating the password.");
    }
  };

  const handleForgotPassword = () => {
    alert("Redirecting to Forgot Password...");
    
  };

  return (
    <div className="them_pass-container">
      <h2 className="them_pass-title">Change Password</h2>
      <form onSubmit={handlePasswordSubmit} className="them_pass-form">
        <div className="them_pass-item">
          <label htmlFor="current-password" className="them_pass-label">
            Current Password:
          </label>
          <div className="them_pass-input-container">
            <input
              type={showCurrentPassword ? "text" : "password"}
              id="current-password"
              className="them_pass-input"
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
                setIsCurrentPasswordValid(false); // Reset validation state
              }}
              required
            />
            <span
              className="them_pass-eye"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>
        </div>

        
        {!isCurrentPasswordValid && (
          <button
            type="button"
            className="them_pass-btn validate-btn"
            onClick={validateCurrentPassword} 
          >
            submit
          </button>
        )}

        {isCheckingPassword && <p className="them_pass-loading">Checking password...</p>}

        {isCurrentPasswordValid && (
          <>
            <div className="them_pass-item">
              <label htmlFor="new-password" className="them_pass-label">
                New Password:
              </label>
              <div className="them_pass-input-container">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="new-password"
                  className="them_pass-input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <span
                  className="them_pass-eye"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? "👁️" : "👁️‍🗨️"}
                </span>
              </div>
            </div>

            <div className="them_pass-item">
              <label htmlFor="confirm-password" className="them_pass-label">
                Confirm New Password:
              </label>
              <div className="them_pass-input-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  className="them_pass-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span
                  className="them_pass-eye"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </span>
              </div>
            </div>
          </>
        )}

        {!isCurrentPasswordValid && (
          <div className="them_pass-forgot">
            <button
              type="button"
              className="them_pass-forgot-btn"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>
          </div>
        )}

        {errorMessage && <p className="them_pass-error">{errorMessage}</p>}
        {successMessage && <p className="them_pass-success">{successMessage}</p>}

        {isCurrentPasswordValid && (
          <div className="them_pass-buttons">
            <button type="submit" className="them_pass-btn save-btn">
              Update Password
            </button>
            <button
              type="button"
              className="them_pass-btn cancel-btn"
              onClick={() => {
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                setErrorMessage("");
                setIsCurrentPasswordValid(false);
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default EditPassword;
