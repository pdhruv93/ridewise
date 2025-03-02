"use client";

import { Button } from "@/components/ui/button";
import { useShowRoute } from "@/components/maps/useShowRoute";
import DeleteForm from "./delete-form";

interface ActionButtonsProps {
  requestId: string;
  carpoolStartLocation: string | null;
  carpoolEndLocation: string | null;
  requestStartLocation: string;
  requestEndLocation: string;
}

export function ActionButtons({
  requestId,
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

  if (!requestId) {
    return null;
  }

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

  return <DeleteForm requestId={requestId} />;
}
