import { AbsoluteCenter, Center, Heading, VStack } from "@chakra-ui/react";

import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";

export default function NotFound() {
  return (
    <AbsoluteCenter w="full">
      <Center h="100px" w="full">
        <VStack bgColor="black" p="2" w="full">
          <Heading size="3xl">
            The resource you requested does not exists or you dont have enoght
            permissions to access it.
          </Heading>

          <ChakraLink asChild>
            <NextLink href="/">Go back</NextLink>
          </ChakraLink>
        </VStack>
      </Center>
    </AbsoluteCenter>
  );
}
