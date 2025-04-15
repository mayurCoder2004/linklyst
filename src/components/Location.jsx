import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const OPENCAGE_API_KEY = import.meta.env.VITE_REACT_APP_OPENCAGE_API_KEY;

export default function Location({ stats = [] }) {
  const [citiesData, setCitiesData] = useState([]);

  useEffect(() => {
    if (!stats || !Array.isArray(stats) || stats.length === 0) {
      console.warn("Stats is empty or invalid:", stats);
      return;
    }

    console.log("Received stats:", stats);

    const cityCount = stats.reduce((acc, item) => {
      const city = item.city?.trim().toLowerCase();
      if (!city) return acc;
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {});

    const formatted = Object.entries(cityCount)
      .map(([city, count]) => ({
        city: city.charAt(0).toUpperCase() + city.slice(1),
        count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    setCitiesData(formatted);
  }, [stats]);

  // Append current user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}`
          );

          const components = response.data?.results?.[0]?.components;
          const city =
            components?.city ||
            components?.town ||
            components?.village ||
            components?.state;

          if (city) {
            const formattedCity =
              city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

            setCitiesData((prev) => {
              const exists = prev.find(
                (entry) =>
                  entry.city.toLowerCase() === formattedCity.toLowerCase()
              );

              if (exists) {
                return prev.map((entry) =>
                  entry.city.toLowerCase() === formattedCity.toLowerCase()
                    ? { ...entry, count: entry.count + 1 }
                    : entry
                );
              } else {
                return [...prev, { city: formattedCity, count: 1 }];
              }
            });
          }
        } catch (error) {
          console.error("Error with reverse geocoding:", error);
        }
      },
      (err) => {
        console.warn("Geolocation error:", err);
      }
    );
  }, []);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart width={700} height={300} data={citiesData}>
          <XAxis dataKey="city" />
          <YAxis allowDecimals={false} />
          <Tooltip labelStyle={{ color: "green" }} />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
