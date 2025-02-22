"use client";

import React, { PropsWithChildren } from "react";
import { GoogleMap, type Libraries, LoadScript } from "@react-google-maps/api";
import { Box } from "@chakra-ui/react";

const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
};

const libraries: Libraries = ["places"];

function MapContainer({ children }: PropsWithChildren) {
  return (
    <Box pos="absolute" left="0" top="0" w="100%" h="100%">
      <LoadScript
        id="google-map-script"
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
        libraries={libraries}
      >
        <GoogleMap
          center={defaultCenter}
          zoom={15}
          options={{
            mapId: "7f80e35ae3a6097a",
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            // gestureHandling: "none",
          }}
          mapContainerStyle={{ width: "100%", height: "100%", zIndex: 0 }}
        >
          {children}
        </GoogleMap>
      </LoadScript>
    </Box>
  );
}

export default React.memo(MapContainer);
