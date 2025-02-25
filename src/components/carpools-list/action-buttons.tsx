"use client";

import { Box, Button } from "@chakra-ui/react";
import { useGenerateRoute } from "@/components/maps/useGenerateRoute";
import { DirectionsRenderer } from "@react-google-maps/api";
import RequestForm from "./request-form";

interface ActionButtonsProps {
  carpoolId: string;
  carpoolStartLocation: string;
  carpoolEndLocation: string;
  requestStartLocation: string;
  requestEndLocation: string;
}

export function ActionButtons({
  carpoolId,
  carpoolStartLocation,
  carpoolEndLocation,
  requestStartLocation,
  requestEndLocation,
}: ActionButtonsProps) {
  const { originalRoute, routeWithWayPoints, generateRoute } =
    useGenerateRoute();
  const wayPoints: google.maps.DirectionsWaypoint[] = [
    { location: requestStartLocation, stopover: true },
    { location: requestEndLocation, stopover: true },
  ];

  if (!originalRoute) {
    return (
      <Button
        variant="solid"
        colorPalette="black"
        px="4"
        onClick={() =>
          generateRoute(carpoolStartLocation, carpoolEndLocation, wayPoints)
        }
      >
        Preview
      </Button>
    );
  }

  return (
    <Box>
      <DirectionsRenderer directions={originalRoute} />
      <DirectionsRenderer directions={routeWithWayPoints} />

      <RequestForm
        carpoolId={carpoolId}
        requestStartLocation={requestStartLocation}
        requestEndLocation={requestEndLocation}
      />
    </Box>
  );
}
