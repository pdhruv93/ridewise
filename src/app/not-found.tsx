import { Heading } from "@chakra-ui/react/typography";
import { VStack } from "@chakra-ui/react/stack";

import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";

export default function NotFound() {
  return (
    <VStack align="start" gap="4">
      <Heading size="xl">
        The resource you requested does not exists or you dont have enough
        permissions to access it.
      </Heading>

      <ChakraLink asChild>
        <NextLink href="/">Go back</NextLink>
      </ChakraLink>
    </VStack>
  );
}
