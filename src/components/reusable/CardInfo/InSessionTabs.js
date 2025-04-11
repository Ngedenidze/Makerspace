import React, { useState, useEffect } from "react";
import localImage from "../../../../assets/art-cover.jpg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function InsessionTabs({ eventsData }) {
  const { t } = useTranslation();
  const [stages, setStages] = useState([]);
  const [eventID, setEventID] = useState("");
  const [eventStatus, setEventStatus] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!eventsData || eventsData.length === 0) return;
    const now = new Date();

    // Find the first upcoming event
    const upcomingEvent = eventsData
      .filter((event) => new Date(event.endDate) > now)
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))[0];

    if (upcomingEvent) {
      const start = new Date(upcomingEvent.startDate);
      const end = new Date(upcomingEvent.endDate);

      if (now < start) {
        setEventStatus(t("starting_soon"));
      } else if (now >= start && now <= end) {
        setEventStatus(t("in_session"));
      } else {
        setEventStatus(t("ended"));
      }

      const mainStage = {
        id: "main",
        title: t("main_stage"),
        events: upcomingEvent.lineUps
          .filter((lineUp) => lineUp.floor === 1)
          .map((lineUp) => ({
            startTime: new Date(lineUp.startTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            djName: lineUp.artistName,
          })),
      };

      const spaceStage = {
        id: "space",
        title: t("space_stage"),
        events: upcomingEvent.lineUps
          .filter((lineUp) => lineUp.floor === 2)
          .map((lineUp) => ({
            startTime: new Date(lineUp.startTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            djName: lineUp.artistName,
          })),
      };

      setStages([mainStage, spaceStage]);
      setEventID(upcomingEvent.id);
      setImage(upcomingEvent.eventPhotoUrl || localImage);
    }
  }, [eventsData, t]);

  useEffect(() => {
    if (!eventsData || stages.length === 0) {
      setError(true);
    } else {
      setError(false);
    }
  }, [eventsData, stages]);

  return (
    <section className="in-session">
      <div className="in-session-box">
        {error ? (
          <section className="default-image">
            <div className="image-wrapper">
              <img
                src="https://myphotostorage.blob.core.windows.net/mymakerphotos/bf080f0e-a1fb-430c-998d-cc336ace2fcd.jpg"
                alt={t("default_cover_art")}
                loading="lazy"
              />
            </div>
            <div className="text-overlay">
              <img
                src="https://myphotostorage.blob.core.windows.net/mymakerphotos/3a1c4464-b245-4ad5-ad09-a2b01fbbbe6b.png"
                alt={t("default_cover_art")}
                loading="lazy"
              />
            </div>
          </section>
        ) : stages.length === 0 ? (
          <p>{t("no_stage_data_available")}</p>
        ) : (
          <>
            <article className="in-session-text">
              <h1>{eventStatus}</h1>
              <div className="in-session-stages">
                {stages.map((stage) => (
                  <div className="stage" key={stage.id}>
                    <h2>{stage.title}</h2>
                    {stage.events?.map((evt, evtIndex) => (
                      <Link
                        key={`${stage.id}-${evtIndex}`}
                        to={`/Events/${eventID}`}
                        className="in-session-timestamps"
                      >
                        <h3>
                          <span className="djStartTime">{evt.startTime} </span>
                          <span className="djName">{evt.djName} </span>
                        </h3>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </article>
            <section className="in-session-image">
              <img src={image} alt={t("in_session_image_alt")} loading="lazy" />
            </section>
          </>
        )}
      </div>
    </section>
  );
}
