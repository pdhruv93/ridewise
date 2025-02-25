"use client";

import { useGenerateRoute } from "@/components/maps/useGenerateRoute";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { RefObject } from "react";
import NextLink from "next/link";
import { DirectionsRenderer } from "@react-google-maps/api";

interface ActionButtonsProps {
  startLocation: RefObject<HTMLInputElement | null>;
  endLocation: RefObject<HTMLInputElement | null>;
}

export function ActionButtons({
  startLocation,
  endLocation,
}: ActionButtonsProps) {
  const { originalRoute, generateRoute } = useGenerateRoute();

  if (!originalRoute) {
    return (
      <Button
        variant="solid"
        colorPalette="black"
        px="4"
        onClick={() =>
          generateRoute(
            startLocation.current?.value,
            endLocation.current?.value
          )
        }
      >
        Preview
      </Button>
    );
  }

  return (
    <Box>
      <DirectionsRenderer directions={originalRoute} />

      <ButtonGroup>
        <Button type="submit" variant="solid" colorPalette="teal" px="4">
          Create new carpool
        </Button>

        <Button variant="outline" px="4" value="request" asChild>
          <NextLink
            href={`/list?startLocation=${startLocation.current?.value}&endLocation=${endLocation.current?.value}`}
          >
            View carpools
          </NextLink>
        </Button>
      </ButtonGroup>
    </Box>
  );
}
