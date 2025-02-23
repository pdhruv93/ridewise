import SearchBar from "@/components/carpools-list/search-bar";
import { VStack } from "@chakra-ui/react";

export default function CarpoolsList() {
  return (
    <VStack align="start" w="full">
      <SearchBar placeholder="Start typing some location..." />
    </VStack>
  );
}
