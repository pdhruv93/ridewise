"use client";

import { Box, Button } from "@chakra-ui/react";
import RequestForm from "./request-form";
import { useShowRoute } from "@/components/maps/useShowRoute";

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
  const { areRoutesGenerated, showRoute } = useShowRoute();
  const wayPoints: google.maps.DirectionsWaypoint[] = [
    { location: requestStartLocation, stopover: true },
    { location: requestEndLocation, stopover: true },
  ];

  if (!areRoutesGenerated) {
    return (
      <Button
        variant="solid"
        colorPalette="black"
        px="4"
        onClick={() =>
          showRoute(carpoolStartLocation, carpoolEndLocation, wayPoints)
        }
      >
        Preview
      </Button>
    );
  }

  return (
    <Box>
      <RequestForm
        carpoolId={carpoolId}
        requestStartLocation={requestStartLocation}
        requestEndLocation={requestEndLocation}
      />
    </Box>
  );
}
