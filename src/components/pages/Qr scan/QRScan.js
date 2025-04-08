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
      console.log("Scanned raw data:", data);
      setScanResult(data);
      // Store the raw data for now.
      setQrData(data);
    }
  };

  // Submit the scanned QR data with the selected action.
  // For now, just log the raw data.
  const handleSubmit = async (isReject) => {
    if (!qrData) return;
    console.log("Submitting raw QR data:", qrData, "with isReject:", isReject);
    // Example: post the raw data if needed.
    // const response = await api.post("/QRCode/scan", { data: qrData, isReject });
    // console.log("Server response:", response.data);
    // setValidationResult(`Response: ${response.data.message}`);
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
        constraints={{ facingMode: "user" }}
        style={{ width: "500px" }}
      />
      {scanResult && <p>Scanned Data: {scanResult}</p>}
      {qrData && (
        <div>
          <button onClick={() => handleSubmit(false)}>Submit Data</button>
          <button onClick={() => handleSubmit(true)}>
            Submit Data (Reject)
          </button>
        </div>
      )}
      {validationResult && (
        <p style={{ fontWeight: "bold" }}>{validationResult}</p>
      )}
    </div>
  );
};

export default QRScan;
