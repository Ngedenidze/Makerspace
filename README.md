# 🎶 Makerspace Event & Booking Platform

Website link: makerspaceclub.com

## 🚀 Overview

This project is a dynamic event management and booking platform designed for **Makerspace Tbilisi**, catering to event organizers, DJs, and visitors. It offers a seamless user experience for:

- Booking event spaces
- Exploring upcoming events and DJ lineups
- Renting premium sound systems and other event equipment
- Registering for performances as a DJ

The platform is built using **React.js** and is fully responsive for desktop and mobile devices.

---

## 📂 Project Structure

```
src/
├── App.css
├── App.js
├── App.test.js
├── bookingsAPI.js
├── index.css
├── index.js
├── reportWebVitals.js
├── setupTests.js
├── assets/
│   ├── DJs/
│   ├── rentals/
│   ├── food/
│   ├── fonts/
│   └── images/
├── components/
│   ├── Navbar.js
│   ├── Navigation.js
│   ├── Routing.js
│   ├── pages/
│   │   ├── About.js
│   │   ├── BookingPage.js
│   │   ├── CommercialRenting.js
│   │   ├── Confirmation.js
│   │   ├── DJBooking.js
│   │   ├── DJs.js
│   │   ├── EventPage.js
│   │   ├── Events.js
│   │   ├── EventsPage.js
│   │   ├── HomePage.js
│   │   ├── Order.js
│   │   └── Rentals.js
│   ├── reusable/
│   │   ├── Background/
│   │   │   └── backgroundPoly.js
│   │   ├── ImageGrid/
│   │   │   ├── ImageGrid.css
│   │   │   └── ImageGrid.js
│   │   └── QR/
│   │       └── QRScanner.js
│   └── sections/
│       ├── aboutPages/
│       │   └── Heading.js
│       ├── eventProfile/
│       │   └── EventsGrid.js
│       ├── headingPages/
│       │   ├── About.js
│       │   ├── Heading.js
│       │   ├── Insession.js
│       │   ├── ScrollDownArrow.js
│       │   ├── SpecialsCarousel.js
│       │   └── Testimonials.js
│       ├── loginPages/
│       │   └── Login.js
│       ├── orderPages/
│       │   └── Heading.js
│       └── reservePages/
│           ├── BookingForm.js
│           └── Heading.js
```

---

## ✨ Features

### 🔥 Event Management
- **Upcoming Events**: Display of upcoming events with date, time, and performing artists.
- **Event Details**: Detailed view with event description, lineups, and venue information.
- **Event Filtering**: Events are grouped by floors such as **Main Floor** and **Space Floor**.

### 🎧 DJ Booking
- **Showcase DJ Lineup**: Displays upcoming DJs with pictures and event details.
- **DJ Registration Form**: DJs can register for performances using a custom form.

### 🎶 Rentals
- **Sound System Rentals**: Display and book high-quality sound systems and other event equipment.
- **Dynamic Image Grid**: Consistent layout for all grid items with hover effects.

### 📅 Booking System
- **Reservation Form**: Secure and user-friendly reservation form for event space bookings.
- **QR Scanner Integration**: Built-in QR scanner for event check-ins.

---

## 🛠️ Technology Stack

- **React.js**: Front-end framework for building dynamic user interfaces.
- **React Router**: For seamless navigation between pages.
- **CSS Flexbox & Grid**: Responsive design and dynamic layout.
- **Fetch API**: For asynchronous data fetching.
- **Mock Data**: Temporary data structure simulating backend API responses.

---

## 📑 Pages Overview

### 📌 About (`About.js`)
Displays information about Makerspace, its mission, and community impact.

### 📌 Booking Page (`BookingPage.js`)
- Dynamic reservation form powered by **fetchAPI**.
- Integrated **QRScanner** for event check-ins.

### 📌 Commercial Renting (`CommercialRenting.js`)
- Highlights the event venue's features for corporate and private rentals.
- "Book Now" button linking to the **Rentals** page.

### 📌 Confirmation (`Confirmation.js`)
- Displays a confirmation message post-booking.
- Links to browse the menu, order online, or go back to the homepage.

### 📌 DJ Booking (`DJBooking.js`)
- Specially designed for DJs to register for performances.
- Promotes Makerspace as the ideal venue for emerging and established DJs.

### 📌 DJs (`DJs.js`)
- Lists all registered DJs with a grid of images.
- Registration form for DJs to submit their details.

### 📌 Event Page (`EventPage.js`)
- Detailed view of each event, including:
  - Event name, description, and cover image.
  - **Grouped Lineups** by floor:
    - **Main Floor**
    - **Space Floor**

### 📌 Events (`Events.js`)
- Displays a grid of upcoming events.
- Each event slice includes:
  - Event name
  - Artist lineup
  - Date and time

### 📌 Events Page (`EventsPage.js`)
- Similar to **Events.js** but optimized for a detailed overview.
- Grouped lineups and date formatting.

### 📌 Home Page (`HomePage.js`)
- Central hub featuring:
  - Ongoing events (`Specials`)
  - DJ booking section
  - Commercial renting highlights
  - About Makerspace

### 📌 Order (`Order.js`)
- Online ordering integration.
- Linked to external ordering systems.

### 📌 Rentals (`Rentals.js`)
- Showcases premium sound systems and event equipment.
- Dynamic **ImageGrid** layout with hover effects.
- Contact form for rental inquiries.

---

## 🎨 Styling & Design

- **Flexbox & Grid Layouts**: Ensures consistent and responsive design.
- **Clip Path Effects**: Dynamic clipping for diagonal cuts on images.
- **Hover Effects**: Scale and shadow effects for interactive UI.
- **Mobile Responsiveness**: Media queries for optimal viewing on all devices.

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/makerspace-event-platform.git
   cd makerspace-event-platform
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm start
   ```

4. **Build for production:**
   ```sh
   npm run build
   ```

---

## 🚧 Deployment

### ⚡ GitHub Pages
To deploy on **GitHub Pages**:
1. Ensure `homepage` field is added in `package.json`:
    ```json
    "homepage": "https://your-username.github.io/makerspace-event-platform"
    ```
2. Install the `gh-pages` package:
    ```sh
    npm install gh-pages --save-dev
    ```
3. Add deployment scripts in `package.json`:
    ```json
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
    ```
4. Deploy the site:
    ```sh
    npm run deploy
    ```

---

## 🌍 Custom Domain

- Add a `CNAME` file in the `public` directory with your custom domain:
    ```
    www.your-custom-domain.com
    ```
- Configure DNS settings with your domain provider to point to GitHub Pages.

---

## 🤝 Contribution

1. **Fork the repository** and **clone it** locally.
2. Create a new branch for your feature:
    ```sh
    git checkout -b feature-name
    ```
3. **Commit your changes**:
    ```sh
    git commit -m "Add new feature"
    ```
4. **Push to the branch**:
    ```sh
    git push origin feature-name
    ```
5. Open a **Pull Request** and describe your changes.

---

## 🧑‍💻 Authors

- Nika Gedenidze - *Lead Developer & Designer*

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 📞 Contact

- **Email**: [ngedenidze@outlook.com](mailto:ngedenidze@outlook.com)
- **Website**: [ngedenidzen.github.io](https://ngedenidze.github.io)
- **LinkedIn**: [Nika Gedenidze](https://www.linkedin.com/in/ngedenidze)

---

## 📈 Future Enhancements

- Integration with a backend CMS for event management.
- Payment gateway integration for rentals and bookings.
- User authentication and profile management.
- Multilingual support for international users.

---

## 🌟 Acknowledgments

- **Makerspace Tbilisi** for providing the platform and inspiration.
- **React Community** for continuous support and amazing libraries.

---

**Ready to host unforgettable events and showcase your talent? Welcome to Makerspace Tbilisi!**
