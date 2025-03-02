import { VStack } from "@chakra-ui/react/stack";
import { Spinner } from "@chakra-ui/react/spinner";
import { Text } from "@chakra-ui/react/typography";
import { Box } from "@chakra-ui/react/box";
import { Center } from "@chakra-ui/react/center";

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
