import React, { useState } from "react";
import { QrReader } from "@blackbox-vision/react-qr-reader";
import axios from "axios";

const QRScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [validationResult, setValidationResult] = useState(null);
  
  const apiBaseUrl = process.env.REACT_APP_API_URL;

  const API_URL = `${apiBaseUrl}/api/QRCode/scan`;

  const handleScan = async (data) => {
    if (data) {
      setScanResult(data);

      try {
        const qrData = JSON.parse(data);
        const response = await axios.post(API_URL, {
          ticketId: qrData.ticketId,
          secret: qrData.secret,
        });

        setValidationResult(`✅ Valid Ticket: ${response.data.message}`);
      } catch (error) {
        setValidationResult("❌ Invalid Ticket!");
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
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
      {validationResult && (
        <p style={{ fontWeight: "bold" }}>{validationResult}</p>
      )}
    </div>
  );
};

export default QRScanner;
