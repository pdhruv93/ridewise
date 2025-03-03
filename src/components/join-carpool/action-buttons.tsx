"use client";

import { Button } from "@/components/ui/button";
import RequestForm from "./request-form";
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

  if (!carpoolStartLocation || !carpoolEndLocation) {
    return null;
  }

  if (!areRoutesGenerated) {
    return (
      <Button
        variant="solid"
        colorPalette="black"
        onClick={() =>
          showRoute(carpoolStartLocation, carpoolEndLocation, wayPoints)
        }
      >
        Preview
      </Button>
    );
  }

  return (
    <RequestForm
      carpoolId={carpoolId}
      requestStartLocation={requestStartLocation}
      requestEndLocation={requestEndLocation}
    />
  );
}
