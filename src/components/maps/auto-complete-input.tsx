import { Box, Input } from "@chakra-ui/react";
import { Autocomplete } from "@react-google-maps/api";
import { RefObject } from "react";
import { type Place } from "./types";

interface AutocompleteInputProps {
  placeholder?: string;
  ref: RefObject<HTMLInputElement | null>;
  onPlaceSelect?: (address: Place) => void;
}

export function AutocompleteInput({
  placeholder,
  ref,
}: AutocompleteInputProps) {
  return (
    <Box w="full" maxW="full">
      <Autocomplete>
        <Input
          ref={ref}
          placeholder={placeholder}
          maxW="full"
          w="full"
          px="2"
        />
      </Autocomplete>
    </Box>
  );
}
