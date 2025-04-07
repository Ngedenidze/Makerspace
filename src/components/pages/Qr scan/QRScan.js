import React, { useState } from "react";
import { QrReader } from "@blackbox-vision/react-qr-reader";
import api from "../../sections/authPage/utils/AxiosInstance";

const QRScan = () => {
  const [scanResult, setScanResult] = useState(null);
  const [validationResult, setValidationResult] = useState(null);
  const [qrData, setQrData] = useState(null);

  // Handle a QR code scan.
  const handleScan = (data) => {
    if (data) {
      console.log("Scanned data received:", data);
      setScanResult(data);
      try {
        // Parse the scanned QR code data.
        const parsedData = JSON.parse(data);
        console.log("Parsed QR data:", parsedData);
        setQrData(parsedData);
      } catch (error) {
        console.error("Invalid QR data", error);
        setValidationResult("❌ Invalid QR Code Format!");
      }
    }
  };

  // Submit the scanned QR data with the selected action.
  const handleSubmit = async (isReject) => {
    if (!qrData) return;
    console.log("Submitting QR data:", qrData, "with isReject:", isReject);
    try {
      // Post the scanned data along with the isReject flag.
      const response = await api.post("/QRCode/scan", {
        ticketId: qrData.ticketId,
        secret: qrData.secret,
        isReject: isReject,
      });
      console.log("Server response:", response.data);
      setValidationResult(`✅ Valid Ticket: ${response.data.message}`);
    } catch (error) {
      console.error("Error processing QR code", error);
      setValidationResult("❌ Invalid Ticket!");
    }
  };

  const handleError = (err) => {
    console.error("QR Reader error:", err);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>🎟 Scan Ticket QR Code</h2>
      <QrReader
        onResult={(result, error) => {
          if (result) handleScan(result.text);
          if (error) handleError(error);
        }}
        constraints={{ facingMode: "environment" }}
        style={{ width: "300px" }}
      />
      {scanResult && <p>Scanned Data: {scanResult}</p>}
      {qrData && (
        <div>
          <button onClick={() => handleSubmit(false)}>Accept Ticket</button>
          <button onClick={() => handleSubmit(true)}>Reject Ticket</button>
        </div>
      )}
      {validationResult && (
        <p style={{ fontWeight: "bold" }}>{validationResult}</p>
      )}
    </div>
   );
};

export default QRScan;
