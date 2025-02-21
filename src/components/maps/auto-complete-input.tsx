"use client";

import { Box, Input } from "@chakra-ui/react";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { Ref, useRef } from "react";
import { type Place } from "./types";

interface AutocompleteInputProps {
  placeholder?: string;
  onPlaceSelect?: (address: Place) => void;
}

export function AutocompleteInput({
  placeholder,
  onPlaceSelect,
}: AutocompleteInputProps) {
  const inputRef = useRef<google.maps.places.SearchBox | null>(null);

  const handlePlacesChanged = () => {
    const addresses = inputRef.current?.getPlaces();
    const place = addresses?.at(0);

    if (place) {
      onPlaceSelect?.({
        placeId: place.place_id || "",
        placeName: place.name || "",
        fullAddress: place.formatted_address || "",
        vicinity: place.vicinity || "",
        geometry: {
          lat: place.geometry?.location?.lat() || 0,
          lng: place.geometry?.location?.lng() || 0,
        },
      });
    }
  };

  return (
    <Box w="full" maxW="full">
      <StandaloneSearchBox
        onLoad={(ref) => (inputRef.current = ref)}
        onPlacesChanged={handlePlacesChanged}
      >
        <Input
          ref={inputRef as Ref<HTMLInputElement> | undefined}
          placeholder={placeholder}
          maxW="full"
          w="full"
          px="2"
        />
      </StandaloneSearchBox>
    </Box>
  );
}
