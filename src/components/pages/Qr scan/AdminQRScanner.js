// src/components/AdminQRScanner.js
import React, { useState, useEffect, useRef } from "react";
import jsQR from "jsqr";
import api from "../authPage/utils/AxiosInstance";
import "./QRScan.css"; // Contains your CSS
import i18n from "../../../i18n";

const AdminQRScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [scanning, setScanning] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [ticketId, setTicketId] = useState(null);
  const [error, setError] = useState(null);
  const [decision, setDecision] = useState(null); // "accepted" or "rejected"
  const [selectedDecision, setSelectedDecision] = useState("accepted"); // Defaults to accepted

  const t = i18n.t; // Translation function
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const requestRef = useRef(null);

  // Helper to initialize video stream.
  const initVideo = async () => {
    try {
      if (videoRef.current && videoRef.current.srcObject) {
        // Stop any existing stream
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Error accessing camera");
      setScanning(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    cancelAnimationFrame(requestRef.current);
  };

  // Start video on mount, and clean up on unmount or page unload
  useEffect(() => {
    initVideo();

    const handleBeforeUnload = () => stopCamera();
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      stopCamera();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Helper: Extract Ticket ID from raw QR data string.
  const extractTicketId = (dataObj) => {
    console.log("Extracting Ticket ID from dataObj:", dataObj);
    let tId = 0;
    if (dataObj && dataObj.raw) {
      const match = dataObj.raw.match(/Ticket\s*ID\s*:\s*(\d+)/i);
      if (match) {
        tId = parseInt(match[1], 10);
      }
    }
    console.log("Extracted Ticket ID:", tId);
    return tId;
  };

  // Helper: Extract User ID from raw QR data string.
  const extractUserId = (dataObj) => {
    console.log("Extracting User ID from dataObj:", dataObj);
    let uId = 0;
    if (dataObj && dataObj.raw) {
      const match = dataObj.raw.match(/User\s*ID\s*:\s*(\d+)/i);
      if (match) {
        uId = parseInt(match[1], 10);
      }
    }
    return uId;
  };

  // Fetch user info from GET /users/GetUserbyId/{id}.
  const fetchUserInfo = async (userId) => {
    try {
      const response = await api.get(`/users/GetUserbyId/${userId}`);
      console.log("User info:", response.data);
      setUserInfo(response.data);
    } catch (err) {
      console.error("Error fetching user info:", err);
      setError("Error fetching user information");
    }
  };

  // Function to handle sending the decision via API.
  // We now inspect the server’s error payload to display "Invalid or tampered QR code!" when appropriate.
  const sendDecision = async (ticketIdArg, isReject) => {
    if (!ticketIdArg) {
      setError("Ticket ID not found");
      return;
    }
    console.log("Sending decision for ticketId:", ticketIdArg);
    try {
      const response = await api.post("/QRCode/scan", {
        isReject,
        ticketId: ticketIdArg,
      });
      console.log("Decision response:", response.data);
      setDecision(isReject ? "rejected" : "accepted");
    } catch (err) {
      console.error("Error sending decision:", err);
      // Check if the server responded with the specific “Invalid or tampered QR code!” message
      const serverMessage = err?.response?.data?.message;
      if (serverMessage === "Invalid or tampered QR code!") {
        setError(serverMessage);
      } else {
        setError("Error sending decision");
      }
    }
  };

  // Scanning loop: continuously capture frames to scan for a QR code.
  useEffect(() => {
    const scan = () => {
      if (videoRef.current && canvasRef.current && scanning) {
        const video = videoRef.current;
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          const canvas = canvasRef.current;
          const context = canvas.getContext("2d");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code) {
            console.log("QR Code found:", code);
            setScanResult(code.data);
            console.log("Raw QR data:", code.data);

            let parsedData;
            try {
              parsedData = JSON.parse(code.data);
              console.log("Parsed QR data:", parsedData);
            } catch (e) {
              parsedData = { raw: code.data };
            }
            setScannedData(parsedData);
            setScanning(false); // stop the loop for now

            // Extract and fetch user info:
            const extractedUserId = extractUserId({ raw: code.data });
            if (extractedUserId) {
              fetchUserInfo(extractedUserId);
            } else {
              setError("Could not extract User ID from QR code");
            }

            // Extract Ticket ID locally (so we can pass it immediately to sendDecision)
            const extractedTicketId = extractTicketId({ raw: code.data });
            setTicketId(extractedTicketId);

            // Immediately attempt to send decision. If it fails with “Invalid or tampered…”
            // the catch block in sendDecision will setError appropriately.
            sendDecision(extractedTicketId, selectedDecision === "rejected");

            return; // stop scanning once code is found
          }
        }
      }
      requestRef.current = requestAnimationFrame(scan);
    };

    if (scanning) {
      requestRef.current = requestAnimationFrame(scan);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [scanning, selectedDecision]);

  // Reset state, reinitialize video, and restart scanning.
  const handleScanAgain = async () => {
    stopCamera();
    setScanResult(null);
    setScannedData(null);
    setUserInfo(null);
    setError(null);
    setDecision(null);
    setScanning(true);
    await initVideo();
  };

  return (
    <div className="QRprofile-container">
      <h2 className="QRprofile-header">{t("QRscan.ticket_qr_scanner")}</h2>

      {/* Decision selection UI always visible */}
      <div className="decision-selection" style={{ marginBottom: "20px", textAlign: "center" }}>
        <span className="decision-label">{t("QRscan.select_decision")}:</span>
        <div className="decision-buttons">
        <button
          onClick={() => setSelectedDecision("accepted")}
          className={selectedDecision === "accepted" ? "active-decision" : ""}
          style={{ marginRight: "10px" }}
        >
          {t("QRscan.accept")}
        </button>
        <button
          onClick={() => setSelectedDecision("rejected")}
          className={selectedDecision === "rejected" ? "active-decision" : ""}
        >
          {t("QRscan.reject")}
        </button>
        </div>
      </div>

      {scanResult === null ? (
        <div className="scanner-container">
          <video ref={videoRef} style={{ width: "300px", border: "1px solid #ccc" }} />
          {/* Hidden canvas used only for frame processing */}
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <p>{t("QRscan.scanning_for_qr_code")}</p>
        </div>
      ) : (
        <div className="QRprofile-details">
          {/* If an error was set, show it immediately */}
          {error ? (
            <div className="qr-error-message">{error}</div>
          ) : userInfo ? (
            <div className="QRprofile-info">
              <p><strong>{t("first_name")}:</strong> {userInfo.firstName}</p>
              <p><strong>{t("last_name")}:</strong> {userInfo.lastName}</p>
              <p>
                <strong>{t("date_of_birth")}:</strong> {new Date(userInfo.birthdate).toLocaleDateString()}
              </p>
            </div>
          ) : (
            // No error and no userInfo yet → fetching
            <p>{t("QRscan.fetching_user_info")}</p>
          )}

          {/* Only show “Accepted/Rejected” once decision was successful and no error */}
          {!error && decision && (
            <div
              className={`verification-statusQR ${
                decision === "accepted" ? "verified" : "rejected"
              }`}
            >
              {decision === "accepted" ? t("QRscan.accepted") : t("QRscan.rejected")}
            </div>
          )}

          <button className="scan-again-btn" onClick={handleScanAgain}>
            {t("QRscan.scan_again")}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminQRScanner;
