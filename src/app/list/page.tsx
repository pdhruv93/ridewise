import CarpoolsListCard from "@/components/carpools-list/carpools-list";
import SearchBar from "@/components/carpools-list/search-bar";
import { VStack } from "@chakra-ui/react";
import { Suspense } from "react";

export default function CarpoolsList() {
  return (
    <VStack align="start" w="full" gap="4">
      <SearchBar placeholder="Start typing some location..." />

      <Suspense>
        <CarpoolsListCard />
      </Suspense>
    </VStack>
  );
}
