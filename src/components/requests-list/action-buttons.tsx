"use client";

import { Button } from "@chakra-ui/react";
import { useShowRoute } from "@/components/maps/useShowRoute";

interface ActionButtonsProps {
  carpoolId: string;
  carpoolStartLocation: string | null;
  carpoolEndLocation: string | null;
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
    <Button variant="solid" colorPalette="fg.error" px="4">
      Preview
    </Button>
  );
}
