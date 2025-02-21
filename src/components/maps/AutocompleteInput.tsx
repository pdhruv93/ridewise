"use client";

import { Input } from "@chakra-ui/react";
import { StandaloneSearchBox, useGoogleMap } from "@react-google-maps/api";
import { useRef } from "react";

interface AutocompleteInputProps {
  onPlaceSelect?: (address: any) => void;
}

export function AutocompleteInput({ onPlaceSelect }: AutocompleteInputProps) {
  const inputRef = useRef(null);
  const map = useGoogleMap();

  const handlePlacesChanged = () => {
    const address = inputRef.current.getPlaces();
    console.log(address);
    onPlaceSelect?.(address);
  };

  if (!map) {
    return <></>;
  }

  return (
    <StandaloneSearchBox
      onLoad={(ref) => (inputRef.current = ref)}
      onPlacesChanged={handlePlacesChanged}
    >
      <Input ref={inputRef} placeholder="Start location" />
    </StandaloneSearchBox>
  );
}
