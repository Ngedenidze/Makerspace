import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      about_us: "About us",
      location: "Location",
      dj_booking: "DJ Booking",
      gallery: "Gallery",
      profile: "Profile",
      login: "Login",
      company: "Company",
      events: "Events",
      rentals: "Rentals",
      djs: "DJs",
      starting_soon: "Starting Soon",
      in_session: "In Session",
      ended: "Ended",
      main_stage: "Main Stage",
      space_stage: "Space Stage",
      default_cover_art: "Default Cover Art",
      no_stage_data_available: "No stage data available.",
      in_session_image_alt: "In Session",
      no_events_found: "No events found",
      next_up: "Next Up",
      view_more: "View More",
      coming_soon: "Coming Soon",
      past_events: "Past Events",

    }
  },
  ka: {
    translation: {
      about_us: "ჩვენს შესახებ",
      location: "ადგილი",
      dj_booking: "DJ-ები",
      gallery: "გალერეა",
      profile: "პროფილი",
      login: "შესვლა",
      company: "კომპანია",
      events: "ივენთები",
      rentals: "ქირაობა",
      djs: "DJ-ები",
      starting_soon: "იწყბება მალე",
      in_session: "მიმდინარე სესია",
      ended: "დასრულებული",
      main_stage: "მთავარი სცენა",
      space_stage: "Space სცენა",
      default_cover_art: "ნაგულისხმებული ფარი ხელოვნება",
      no_stage_data_available: "სცენის მონაცემები არ არის ხელმისაწვდომი.",
      in_session_image_alt: "გადმოყოლილი",
      no_events_found: "ივენთები არ მოიძებნა",
      next_up: "მომდევნო ივენთები",
      view_more: "ყველა ივენთი",
      coming_soon: "შემდეგი ივენთები",
      past_events: "წარსული ივენთები",

    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
