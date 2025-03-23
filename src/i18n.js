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
      rental_title:"Elevate Your Event at Makerspace",
      rental_info:"Unlock the potential of our dynamic two-floor venue in the heart of Tbilisi. Perfect for corporate functions or private celebrations, our space—with its dance stage, chill-out zones, and versatile bars—is designed to leave a lasting impression. Ready to make your event unforgettable?",
      rental_action:"Book Now",
      dj_booking_title: "Take the Stage at Makerspace",
      dj_booking_info: "Are you ready to showcase your talent at one of the most dynamic venues in Tbilisi? Whether you're an emerging artist or a seasoned DJ, our space—with its immersive sound system, energetic dance floor, and vibrant crowd—is the perfect platform to make your mark. Ready to electrify the night?",
      dj_booking_action: "Book Now",
      about_me_text:"Makerspace is a uniquely designed bar located in the heart of Tbilisi, offering an exciting blend of electronic music and a welcoming atmosphere. Join us on Fridays and Saturdays for unforgettable nights, where our professional DJs and friendly staff ensure you have an incredible experience. Makerspace is more than just a bar—it’s a community open to new friendships and meaningful connections. During the week, our versatile 400m² venue is available for private and corporate events. With dedicated areas including a dancing stage, chill-out rooms, a cocktail bar, and an open yard bar, it’s the perfect space for any celebration. We’re always ready to welcome you!",
      about_me_action:"Gallery",
      friday: "Friday",
      saturday: "Saturday",
      opening_hours: "Opening Hours",
      address: "Lado Gudiashvili Square, Tbilisi 0162, Georgia",
      contact: "Contact",
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
      rental_title:"მოაწყე შენი წვეულება Makerspace-ში",
      rental_info:"მოაწყე ღონისძიება თბილისის შუაგულში, ჩვენთან ულამაზეს გარემოში, შენ შეგიძლია დახურული ივენთების მოწყობა, კორპორატიული წვეულებების გამართვა და რაც მთავარია კვირის ბოლოს მეგობრებთან ერთად დაუვიწყარი გართობა. ამ ყველაფერში დაგეხმარებათ  ჩვენი ორი საცეკვაო სცენა, მრავალფეროვანი ბარი, VOID ის აუდიო სისტემა და განსატვირთი ზონები, სადაც შერწყმულია თანამედროვე ხელოვნებისა და ელექტრონული კოლაბორაციისა და ჯავშნისთვის დაგვიკავშირდით მეილზე.",
      rental_action:"დაჯავშნა",
      dj_booking_title: "გადმოყოლე სცენა Makerspace-ში",
      dj_booking_info:"მზად ხარ, რომ გამოაჩინო შენი ნიჭი, ყველაზე დინამიურ გარემოში? თუ ხარ გამოცდილი DJ,ან გსურს საზოგადოებამ შენი მუსიკა კარგად გაიცნოს, გელოდებით ჩვენს სივრცეში, სადაც დაგხვდება  საუკეთესო ხმის სისტემები, ენერგიული საცეკვაო მოედანი და უმაგრესი მსმენელი. თუ მზად ხარ, რომ შენი კვალი დატოვო, თანამედროვე ელექტრონულ მუსიკაში  შეავსე ფორმა ან მოგვწერე მეილზე.",
      dj_booking_action:"დაჯავშნა",
      about_me_text:"Makerspace არის უნიკალური დიზაინის ბარი, რომელიც მდებარეობს შუა თბილისში, სადაც დაგხვდებათ, გასაოცარი ნაზავი ელექტრონული მუსიკისა და კარგი გარემოსი. გვეწვია კვირის ბოლო დღეებში დაუვიწყარ ღამეებზე, თქვენ განწყობაზე კი ჩვენი პროფესიონალი არტისტები და თანამშრომლები იზრუნებენ. MAKERSPACE არის მეტი ვიდრე კლუბი, ეს არის საზოგადოება რომელიც ღიაა ახალი მეგობრობისა და კავშირებისთვის. აღსანიშნავია, რომ კვირის განმავლობაში ჩვენი შესანიშნავი სივრცე ქირავდება კორპორატიული და დახურული ღონისძიებებისთვის, ჩვენ შეგვიძლია როგორც ფართის გაქირავება ასევე მომსახურებისა და ტექნიკური აღჭურვილობის უზრუნველყოფა. გელოდებით ! ჩვენ ყოველთვის მზად ვარ შენ მისაღებად.",
      about_me_action:"გალერეა",
      friday: "პარასკევი",
      saturday: "შაბათი",
      opening_hours: "სამუშაო საათები",
      address: "ლადო გუდიაშვილის მოედანი, თბილისი 0162, საქართველო",
      contact: "კონტაქტი",
    },
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
