import React, { useEffect, useState } from "react";

const CountryCodeSelect = ({ value, onChange }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/codes")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error && data.data) {
          setCountries(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching country codes:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading countries...</p>;
  }

  return (
    <select value={value} onChange={onChange}>
      <option value="">Select a country</option>
      {countries.map((country, index) => (
        <option key={index} value={country.dial_code}>
          {country.name} ({country.dial_code})
        </option>
      ))}
    </select>
  );
};

export default CountryCodeSelect;
