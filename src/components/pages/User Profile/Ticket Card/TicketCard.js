// src/components/Profile/TicketCard.js (example path)
import React, { useState, useEffect, useCallback } from 'react'; // Added useCallback
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import api from '../../authPage/utils/AxiosInstance'; // Adjusted path assuming it's relative to Profile folder
import defaultEventImage from './../../../../assets/default_cover.webp'; // Your default image
import Loader from '../../../reusable/Loader/Loader'; // Adjusted path
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
  const monthName = t(`months.${monthKeys[monthIndex]}`, monthKeys[monthIndex].charAt(0).toUpperCase() + monthKeys[monthIndex].slice(1));
  return `${monthName} ${day}, ${year}`;
};

const TicketCard = ({ ticket }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.split('-')[0];

  const [eventDetails, setEventDetails] = useState(null);
  const [isLoadingEvent, setIsLoadingEvent] = useState(true);
  const [eventError, setEventError] = useState(null);

  // State for QR Code Modal
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const { id: ticketId, basket, qrCodeUrl } = ticket;
  const eventId = basket?.eventId;
  const ticketPrice = basket?.price;

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
      setIsLoadingEvent(false);
      setEventError(t('error.missing_event_id', 'Event ID missing for this ticket.'));
    }
  }, [eventId, t]);

  const displayPrice = (price) => {
    if (price === null || price === undefined || isNaN(Number(price))) {
      return t('price_unavailable', 'N/A');
    }
    try {
      return new Intl.NumberFormat(currentLang === 'ka' ? 'ka-GE' : (i18n.language || 'en-US'), {
        style: 'currency',
        currency: 'GEL', // Assuming price from basket is always GEL.
      }).format(Number(price));
    } catch (e) {
      return `${Number(price).toFixed(2)} GEL (format err)`;
    }
  };

  const eventName = eventDetails ? (currentLang === 'ka' ? eventDetails.name : eventDetails.nameLat) : t('loading_event_name', 'Loading event...');
  const eventImage = eventDetails?.eventPhotoUrl || defaultEventImage;

  const openQrModal = useCallback(() => {
    if (qrCodeUrl) {
      setIsQrModalOpen(true);
    }
  }, [qrCodeUrl]);

  const closeQrModal = useCallback(() => {
    setIsQrModalOpen(false);
  }, []);

  // Effect for closing modal with Escape key
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


  return (
    <>
      <div className={`ticket-card ${ticket.isUsedTicket ? 'used' : 'valid'}`}>
        {isLoadingEvent && !eventDetails && (
          <div className="ticket-card-loader"><Loader size="small" /></div>
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
              {eventDetails.startDate && <p className="ticket-event-date">{formatDate(eventDetails.startDate, t)}</p>}
              <Link to={`/events/${eventId}`} className="ticket-event-link">
                {t('view_event', 'View Event Details')}
              </Link>
            </div>
          </div>
        )}

        <div className="ticket-card-body">
          <p><strong>{t('ticket_id', 'Ticket ID')}:</strong> {ticketId}</p>
          {ticketPrice !== undefined && (
            <p><strong>{t('price_paid', 'Price')}:</strong> {displayPrice(ticketPrice)}</p>
          )}
        </div>

        {qrCodeUrl && (
          <div className="ticket-card-footer">
            <h4>{t('your_qr_code', 'Your QR Code')}</h4>
            <img 
              src={qrCodeUrl} 
              alt={t('ticket_qr_code_alt', 'Ticket QR Code')} 
              className="ticket-qr-code clickable" // Added 'clickable'
              onClick={openQrModal}
              onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && openQrModal()} // Accessibility for keyboard
              tabIndex={0} // Make it focusable
              role="button" // Indicate it's interactive
            />
            <p className="qr-instruct">{t('qr_instruct', 'Present this for entry.')}</p>
          </div>
        )}
         {!qrCodeUrl && !isLoadingEvent && !eventError && (
           <div className="ticket-card-footer no-qr">
              <p>{t('qr_not_available', 'QR Code not available for this ticket.')}</p>
           </div>
         )}
      </div>

      {/* QR Code Modal */}
      {isQrModalOpen && qrCodeUrl && (
        <div className="qr-modal-overlay" onClick={closeQrModal} role="dialog" aria-modal="true" aria-labelledby="qrModalTitle">
          <div className="qr-modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 id="qrModalTitle" className="sr-only">{t('enlarged_qr_code_title', 'Enlarged QR Code')}</h3>
            <img src={qrCodeUrl} alt={t('enlarged_qr_code_alt', 'Enlarged Ticket QR Code')} className="qr-modal-image" />
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