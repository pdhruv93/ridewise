"use client";

import { Box, Input } from "@chakra-ui/react";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { Ref, useRef } from "react";

interface AutocompleteInputProps {
  placeholder?: string;
  onPlaceSelect?: (
    address: google.maps.places.PlaceResult[] | undefined
  ) => void;
}

export function AutocompleteInput({
  placeholder,
  onPlaceSelect,
}: AutocompleteInputProps) {
  const inputRef = useRef<google.maps.places.SearchBox | null>(null);

  const handlePlacesChanged = () => {
    const address = inputRef.current?.getPlaces();
    onPlaceSelect?.(address);
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
