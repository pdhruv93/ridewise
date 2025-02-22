import { Box, Input } from "@chakra-ui/react";
import { Autocomplete } from "@react-google-maps/api";
import { RefObject } from "react";

interface AutocompleteInputProps {
  placeholder?: string;
  name: string;
  ref: RefObject<HTMLInputElement | null>;
}

export function AutocompleteInput({
  placeholder,
  ref,
  name,
}: AutocompleteInputProps) {
  return (
    <Box w="full" maxW="full">
      <Autocomplete>
        <Input
          ref={ref}
          placeholder={placeholder}
          name={name}
          maxW="full"
          w="full"
          px="2"
        />
      </Autocomplete>
    </Box>
  );
}
