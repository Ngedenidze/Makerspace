import React, { useState, useEffect, useRef } from "react";
import jsQR from "jsqr";
import api from "../../sections/authPage/utils/AxiosInstance"; // Adjust path as needed
import "./QRScan.css"; // Contains your CSS

const AdminQRScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [scanning, setScanning] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [decision, setDecision] = useState(null); // "accepted" or "rejected"

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const requestRef = useRef(null);

  // Helper to initialize video stream.
  const initVideo = async () => {
    try {
      // If a stream already exists, stop its tracks
      if (videoRef.current && videoRef.current.srcObject) {
        const oldStream = videoRef.current.srcObject;
        oldStream.getTracks().forEach(track => track.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
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

    // Cleanup function: stop video stream and cancel scanning.
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach((track) => track.stop());
      }
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

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
            try {
              const parsedData = JSON.parse(code.data);
              setScannedData(parsedData);
            } catch (e) {
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
  }, [scanning]);

  // Helper: Extract User ID from a string like "Ticket ID: 4, Event: string, User ID: 2"
  const extractUserId = (dataObj) => {
    let userId = 0;
    if (dataObj.raw) {
      const match = dataObj.raw.match(/User\s*ID\s*:\s*(\d+)/i);
      if (match) {
        userId = parseInt(match[1], 10);
      }
    }
    return userId;
  };

  // Fetch user info from GET /users/{id}.
  const fetchUserInfo = async (userId) => {
    try {
      // const response = await api.get(`/users/${userId}`);
       const response = await api.get(`/users/me`); 
      console.log("User info:", response.data);
      setUserInfo(response.data);
    } catch (err) {
      console.error("Error fetching user info:", err);
      setError("Error fetching user information");
    }
  };

  // Handlers for admin decision.
  const handleAccept = () => {
    setDecision("accepted");
  };

  const handleReject = () => {
    setDecision("rejected");
  };

  // Reset state, reinitialize video, and restart scanning.
  const handleScanAgain = async () => {
    setScanResult(null);
    setScannedData(null);
    setUserInfo(null);
    setError(null);
    setDecision(null);
    setScanning(true);
    await initVideo(); // Restart the video stream.
  };

  return (
    <div className="QRprofile-container">
      <h2 className="QRprofile-header">User Info QR Scanner</h2>
    
      {scanResult === null ? (
        <div className="scanner-container">
          <video ref={videoRef} style={{ width: "300px", border: "1px solid #ccc" }} />
          {/* Hidden canvas for frame processing */}
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <p>Scanning for QR code...</p>
        </div>
      ) : (
        <div className="QRprofile-details">
         
          {userInfo ? (
            <div className="QRprofile-info">
              <p><strong>First Name:</strong> {userInfo.firstName}</p>
              <p><strong>Last Name:</strong> {userInfo.lastName}</p>
              <p><strong>Date of Birth:</strong> {new Date(userInfo.birthdate).toLocaleDateString()}</p>
            </div>
          ) : (
            <p>Fetching user information...</p>
          )}
          {decision ? (
            <div className={`verification-statusQR ${decision === "accepted" ? "verified" : "rejected"}`}>
              {decision === "accepted" ? "Accepted" : "Rejected"}
            </div>
          ) : (
            <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px" }}>
              <button className="accept-btn" onClick={handleAccept}>Accept</button>
              <button className="reject-btn" onClick={handleReject}>Reject</button>
            </div>
          )}
          <button className="scan-again-btn" onClick={handleScanAgain}>Scan Again</button>
        </div>
      )}
    </div>
  );
};

export default AdminQRScanner;
