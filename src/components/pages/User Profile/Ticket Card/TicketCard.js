// src/components/Profile/TicketCard.js
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import api from '../../authPage/utils/AxiosInstance';
import defaultEventImage from './../../../../assets/default_cover.webp';
import Loader from '../../../reusable/Loader/Loader';
import './TicketCard.css';

const formatDate = (dateString, t) => {
  if (!dateString) return t('n_a', 'N/A');
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return t('invalid_date', 'Invalid Date');
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const monthKeys = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december",
  ];
  const monthName = t(
    `months.${monthKeys[monthIndex]}`,
    monthKeys[monthIndex].charAt(0).toUpperCase() + monthKeys[monthIndex].slice(1)
  );
  return `${monthName} ${day}, ${year}`;
};

const TicketCard = ({ ticket }) => {
  // ─── 1. Destructure props and translation first ────────────────────────────────────────────
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.split('-')[0];

  // Destructure ticket fields
  const {
    id: ticketId,
    basket,
    qrCodeUrl,
    isUsedTicket,
  } = ticket;
  const eventId = basket?.eventId;
  const ticketPrice = basket?.price;

  // ─── 2. ALWAYS call all Hooks in the same order ────────────────────────────────────────────
  //   (so that React’s rules of Hooks are satisfied)

  // a) state for event details + loading + error
  const [eventDetails, setEventDetails] = useState(null);
  const [isLoadingEvent, setIsLoadingEvent] = useState(true);
  const [eventError, setEventError] = useState(null);

  // b) state for the QR‐Modal
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  // c) fetch event details when eventId changes
  useEffect(() => {
    if (eventId) {
      setIsLoadingEvent(true);
      setEventError(null);

      api.get(`/Events/${eventId}`)
        .then(response => {
          setEventDetails(response.data);
        })
        .catch(err => {
          console.error(`Error fetching event details for eventId ${eventId}:`, err);
          setEventError(t('error.fetch_event_details', 'Could not load event details.'));
        })
        .finally(() => {
          setIsLoadingEvent(false);
        });
    } else {
      // If there’s no eventId, skip fetching
      setIsLoadingEvent(false);
      setEventError(t('error.missing_event_id', 'Event ID missing for this ticket.'));
    }
  }, [eventId, t]);

  // d) callback to open QR modal (only if ticket is not used)
  const openQrModal = useCallback(() => {
    if (!isUsedTicket) {
      setIsQrModalOpen(true);
    }
  }, [isUsedTicket]);

  // e) callback to close QR modal
  const closeQrModal = useCallback(() => {
    setIsQrModalOpen(false);
  }, []);

  // f) effect to listen for Escape key when modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeQrModal();
      }
    };
    if (isQrModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isQrModalOpen, closeQrModal]);

  // ─── 3. EARLY RETURN if no QR code ─────────────────────────────────────────────────────────
  //   This must come **after** all Hooks, but **before** any JSX.
  if (!qrCodeUrl) {
    return null;
  }

  // ─── 4. render the ticket card (we know qrCodeUrl is present) ───────────────────────────────
  const displayPrice = (price) => {
    if (price === null || price === undefined || isNaN(Number(price))) {
      return t('price_unavailable', 'N/A');
    }
    try {
      return new Intl.NumberFormat(
        currentLang === 'ka' ? 'ka-GE' : (i18n.language || 'en-US'),
        {
          style: 'currency',
          currency: 'GEL',
        }
      ).format(Number(price));
    } catch (e) {
      return `${Number(price).toFixed(2)} GEL (format err)`;
    }
  };

  const eventName = eventDetails
    ? (currentLang === 'ka' ? eventDetails.name : eventDetails.nameLat)
    : t('loading_event_name', 'Loading event...');
  const eventImage = eventDetails?.eventPhotoUrl || defaultEventImage;

  return (
    <>
      <div className={`ticket-card ${isUsedTicket ? 'used' : 'valid'}`}>
        {isLoadingEvent && !eventDetails && (
          <div className="ticket-card-loader">
            <Loader size="small" />
          </div>
        )}
        {eventError && !eventDetails && (
          <div className="ticket-card-error">{eventError}</div>
        )}

        {eventDetails && (
          <div className="ticket-card-header">
            <img
              src={eventImage}
              alt={eventName}
              className="ticket-event-image"
              onError={(e) => {
                if (e.target.src !== defaultEventImage) {
                  e.target.onerror = null;
                  e.target.src = defaultEventImage;
                }
              }}
            />
            <div className="ticket-header-info">
              <h3>{eventName}</h3>
              {eventDetails.startDate && (
                <p className="ticket-event-date">
                  {formatDate(eventDetails.startDate, t)}
                </p>
              )}
              <Link to={`/events/${eventId}`} className="ticket-event-link">
                {t('view_event', 'View Event Details')}
              </Link>
            </div>
          </div>
        )}

        <div className="ticket-card-body">
          <p>
            <strong>{t('ticket_id', 'Ticket ID')}:</strong> {ticketId}
          </p>
          {ticketPrice !== undefined && (
            <p>
              <strong>{t('price_paid', 'Price')}:</strong> {displayPrice(ticketPrice)}
            </p>
          )}
        </div>

        {/* Only show the QR code area if the ticket isn’t used */}
        {!isUsedTicket && (
          <div className="ticket-card-footer">
            <h4>{t('your_qr_code', 'Your QR Code')}</h4>
            <img
              src={qrCodeUrl}
              alt={t('ticket_qr_code_alt', 'Ticket QR Code')}
              className="ticket-qr-code clickable"
              onClick={openQrModal}
              onKeyPress={(e) =>
                (e.key === 'Enter' || e.key === ' ') && openQrModal()
              }
              tabIndex={0}
              role="button"
            />
            <p className="qr-instruct">{t('qr_instruct', 'Present this for entry.')}</p>
          </div>
        )}
      </div>

      {/* QR Code Modal (only if ticket is not used) */}
      {isQrModalOpen && !isUsedTicket && (
        <div
          className="qr-modal-overlay"
          onClick={closeQrModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="qrModalTitle"
        >
          <div className="qr-modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 id="qrModalTitle" className="sr-only">
              {t('enlarged_qr_code_title', 'Enlarged QR Code')}
            </h3>
            <img
              src={qrCodeUrl}
              alt={t('enlarged_qr_code_alt', 'Enlarged Ticket QR Code')}
              className="qr-modal-image"
            />
            <button
              className="qr-modal-close-button"
              onClick={closeQrModal}
              aria-label={t('close_modal_aria_label', 'Close modal')}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TicketCard;
