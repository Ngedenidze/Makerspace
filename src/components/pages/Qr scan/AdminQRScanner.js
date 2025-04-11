import React, { useState, useEffect, useRef } from "react";
import jsQR from "jsqr";
import api from "../../sections/authPage/utils/AxiosInstance"; // Adjust path as needed
import "./QRScan.css"; // Contains your CSS

const AdminQRScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [scanning, setScanning] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [ticketId, setTicketId] = useState(null);
  const [error, setError] = useState(null);
  const [decision, setDecision] = useState(null); // Final decision ("accepted" or "rejected")
  const [selectedDecision, setSelectedDecision] = useState("accepted"); // Pre-scan selection

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const requestRef = useRef(null);

  // Helper to initialize video stream.
  const initVideo = async () => {
    try {
      if (videoRef.current && videoRef.current.srcObject) {
        const oldStream = videoRef.current.srcObject;
        oldStream.getTracks().forEach((track) => track.stop());
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
    }
  };

  // Start video on mount.
  useEffect(() => {
    initVideo();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach((track) => track.stop());
      }
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Helper: Extract Ticket ID from raw data string.
  // Example: "Ticket ID: 5, Event: string, User ID: 2"
  const extractTicketId = (dataObj) => {
    console.log("Extracting Ticket ID from dataObj:", dataObj);
    let ticketId = 0;
    if (dataObj && dataObj.raw) {
      const match = dataObj.raw.match(/Ticket\s*ID\s*:\s*(\d+)/i);
      if (match) {
        ticketId = parseInt(match[1], 10);
      }
    }
    console.log("Extracted Ticket ID:", ticketId);
    return ticketId;
  };

  // Helper: Extract User ID from raw data string.
  const extractUserId = (dataObj) => {
    console.log("Extracting User ID from dataObj:", dataObj);
    let userId = 0;
    if (dataObj && dataObj.raw) {
      const match = dataObj.raw.match(/User\s*ID\s*:\s*(\d+)/i);
      if (match) {
        userId = parseInt(match[1], 10);
      }
    }
    return userId;
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
            try {
              const parsedData = JSON.parse(code.data);
              console.log("Parsed QR data:", parsedData);
              setScannedData(parsedData);
            } catch (e) {
              // If the QR data is not valid JSON, store it as raw.
              setScannedData({ raw: code.data });
            }
            setScanning(false);
            
            // Extract User ID and fetch user info.
            const userId = extractUserId({ raw: code.data });
            if (userId) {
              fetchUserInfo(userId);
            } else {
              setError("Could not extract User ID from QR code");
            }
            const ticketId = extractTicketId({ raw: code.data });
            setTicketId(ticketId);
            
            // Automatically send decision using the pre-selected value.
            sendDecision(selectedDecision === "rejected");
            return; // Stop scanning once code is found.
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

  // Function to handle sending the decision via API.
  const sendDecision = async (isReject) => {
    if (!ticketId) {
      setError("Ticket ID not found");
      return;
    }
    console.log("Sending decision for ticketId:", ticketId);
    try {
      const response = await api.post("/QRCode/scan", { isReject, ticketId });
      console.log("Decision response:", response.data);
      setDecision(isReject ? "rejected" : "accepted");
    } catch (error) {
      console.error("Error sending decision:", error);
      setError("Error sending decision");
    }
  };

  // Reset state, reinitialize video, and restart scanning.
  const handleScanAgain = async () => {
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
      <h2 className="QRprofile-header">User Info QR Scanner</h2>
      
      {/* Decision selection UI always visible (before and during scanning) */}
      <div className="decision-selection" style={{ marginBottom: "20px", textAlign: "center" }}>
        <span style={{ marginRight: "10px" }}>Select Decision:</span>
        <button
          onClick={() => setSelectedDecision("accepted")}
          className={selectedDecision === "accepted" ? "active-decision" : ""}
          style={{ marginRight: "10px" }}
        >
          Accept
        </button>
        <button
          onClick={() => setSelectedDecision("rejected")}
          className={selectedDecision === "rejected" ? "active-decision" : ""}
        >
          Reject
        </button>
      </div>
      
      {scanResult === null ? (
        <div className="scanner-container">
          <video ref={videoRef} style={{ width: "300px", border: "1px solid #ccc" }} />
          {/* Hidden canvas used only for frame processing */}
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <p>Scanning for QR code...</p>
        </div>
      ) : (
        <div className="QRprofile-details">
          {userInfo ? (
            <div className="QRprofile-info">
              <p><strong>First Name:</strong> {userInfo.firstName}</p>
              <p><strong>Last Name:</strong> {userInfo.lastName}</p>
              <p>
                <strong>Date of Birth:</strong>{" "}
                {new Date(userInfo.birthdate).toLocaleDateString()}
              </p>
            </div>
          ) : (
            <p>Fetching user information...</p>
          )}
          {/* Display final decision after scan and request */}
          {decision ? (
            <div className={`verification-statusQR ${decision === "accepted" ? "verified" : "rejected"}`}>
              {decision === "accepted" ? "Accepted" : "Rejected"}
            </div>
          ) : (
            <p>Processing decision...</p>
          )}
          <button className="scan-again-btn" onClick={handleScanAgain}>
            Scan Again
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminQRScanner;
