import React from 'react';
// If you put the CSS in App.css, you don't need a separate import here,
// assuming App.css is imported globally in your App.js or index.js.
// If you created a Loader.css, you'd import it: import './Loader.css';
import './Loader.css'; // Adjust the path as necessary
const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;