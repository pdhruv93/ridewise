"use client";

import { Box, Button } from "@chakra-ui/react";
import { useGenerateRoute } from "@/components/maps/useGenerateRoute";
import { DirectionsRenderer } from "@react-google-maps/api";

interface ActionButtonsProps {
  carpoolStartLocation: string;
  carpoolEndLocation: string;
  requestStartLocation: string;
  requestEndLocation: string;
}

export function ActionButtons({
  carpoolStartLocation,
  carpoolEndLocation,
  requestStartLocation,
  requestEndLocation,
}: ActionButtonsProps) {
  const { route: carpoolRoute, generateRoute } = useGenerateRoute();

  if (!carpoolRoute) {
    return (
      <Button
        variant="solid"
        colorPalette="black"
        px="4"
        onClick={() => generateRoute(carpoolStartLocation, carpoolEndLocation)}
      >
        Preview
      </Button>
    );
  }

  return (
    <Box>
      <DirectionsRenderer directions={carpoolRoute} />

      <Button type="submit" variant="solid" colorPalette="teal" px="4">
        Submit request
      </Button>
    </Box>
  );
}
