"use client";

import { CreateCarpoolForm } from "@/components/create-carpool/create-carpool-form";
import { Heading, VStack } from "@chakra-ui/react";
import { DirectionsRenderer, useGoogleMap } from "@react-google-maps/api";
import { useEffect, useState } from "react";

export default function CreateCarpoolCard() {
  const [route, setRoute] = useState<google.maps.DirectionsResult | undefined>(
    undefined
  );
  const map = useGoogleMap();

  useEffect(() => {
    // set user's current location on map
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        map?.setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  return (
    <VStack align="start" gap="6">
      <Heading>Create new carpool</Heading>
      <CreateCarpoolForm onCarpoolCreated={setRoute} />

      <DirectionsRenderer directions={route} />
    </VStack>
  );
}
