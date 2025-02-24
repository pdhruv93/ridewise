"use client";

import { Box, Button } from "@chakra-ui/react";
import { useGenerateRoute } from "@/components/maps/useGenerateRoute";
import { DirectionsRenderer } from "@react-google-maps/api";

interface ActionButtonsProps {
  startLocation: string;
  endLocation: string;
}

export function ActionButtons({
  startLocation,
  endLocation,
}: ActionButtonsProps) {
  const { route, generateRoute } = useGenerateRoute();

  if (!route) {
    return (
      <Button
        variant="solid"
        colorPalette="black"
        px="4"
        onClick={() => generateRoute(startLocation, endLocation)}
      >
        Preview
      </Button>
    );
  }

  return (
    <Box>
      <DirectionsRenderer directions={route} />

      <Button type="submit" variant="solid" colorPalette="teal" px="4">
        Submit request
      </Button>
    </Box>
  );
}
