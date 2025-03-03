import { GridItem, SimpleGrid } from "@chakra-ui/react/grid";
import { Text } from "@chakra-ui/react/typography";
import { Icon } from "@chakra-ui/react/icon";
import { MdArrowForward } from "react-icons/md";

interface RouteDetailsProps {
  startLocation: string | null;
  endLocation: string | null;
}

export function RouteDetails({
  startLocation,
  endLocation,
}: RouteDetailsProps) {
  return (
    <SimpleGrid columns={5}>
      <GridItem colSpan={2}>
        <Text>{startLocation}</Text>
      </GridItem>

      <GridItem colSpan={1}>
        <Icon alignSelf="center" w="100%">
          <MdArrowForward size="30" />
        </Icon>
      </GridItem>

      <GridItem colSpan={2}>
        <Text>{endLocation}</Text>
      </GridItem>
    </SimpleGrid>
  );
}
