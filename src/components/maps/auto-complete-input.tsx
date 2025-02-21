"use client";

import { Input } from "@chakra-ui/react";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { useRef } from "react";

interface AutocompleteInputProps {
  onPlaceSelect?: (address: any) => void;
}

export function AutocompleteInput({ onPlaceSelect }: AutocompleteInputProps) {
  const inputRef = useRef(null);

  const handlePlacesChanged = () => {
    const address = inputRef.current.getPlaces();
    console.log(address);
    onPlaceSelect?.(address);
  };

  return (
    <StandaloneSearchBox
      onLoad={(ref) => (inputRef.current = ref)}
      onPlacesChanged={handlePlacesChanged}
    >
      <Input ref={inputRef} placeholder="Start location" w="full" px="2" />
    </StandaloneSearchBox>
  );
}
