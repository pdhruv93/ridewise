"use client";

import React, { PropsWithChildren } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import "./MyComponent.module.css";
import { Box, Container } from "@chakra-ui/react";

const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
};

export function MapContainer({ children }: PropsWithChildren) {
  return (
    <Box pos="absolute" left="0" top="0" w="100%" h="100%">
      <LoadScript
        id="google-map-script"
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
        libraries={["places"]}
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
            gestureHandling: "none",
          }}
          mapContainerStyle={{ width: "100%", height: "100%", zIndex: 0 }}
        >
          <Container
            pos="relative"
            px="20"
            py="15"
            w="full"
            maxW="full"
            h="full"
          >
            {children}
          </Container>
        </GoogleMap>
      </LoadScript>
    </Box>
  );
}
