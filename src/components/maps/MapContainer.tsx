"use client";

import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import "./MyComponent.module.css";
import { Box, Skeleton } from "@chakra-ui/react";

function MapContainer() {
  const [currentLocation, setCurrentLocation] = useState({
    lat: -3.745,
    lng: -38.523,
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) =>
        setCurrentLocation({ lat: coords.latitude, lng: coords.longitude })
      );
    }
  }, []);

  if (!isLoaded) {
    return <Skeleton height="full" variant="shine" />;
  }

  return (
    <Box pos="absolute" left="0" top="0" w="100%" h="100%">
      <GoogleMap
        center={currentLocation}
        zoom={15}
        options={{
          mapId: "7f80e35ae3a6097a",
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          gestureHandling: "none",
        }}
        mapContainerStyle={{ width: "100%", height: "100%", zIndex: 0 }}
      />
    </Box>
  );
}

export default React.memo(MapContainer);
