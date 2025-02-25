import { VStack, Spinner, Text, Box, Center } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Box pos="absolute" inset="0" bg="bg/80">
      <Center h="full">
        <VStack colorPalette="teal">
          <Spinner />
          <Text>Loading...</Text>
        </VStack>
      </Center>
    </Box>
  );
}
