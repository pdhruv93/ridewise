"use client";

import { PreviewRoute } from "@/components/maps/preview-route";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useState } from "react";

interface ActionButtonsProps {
  startLocation: string | undefined | null;
  endLocation: string | undefined | null;
}

export function ActionButtons({
  startLocation,
  endLocation,
}: ActionButtonsProps) {
  const [isRouteGenerated, setIsRouteGenerated] = useState(false);

  if (!isRouteGenerated) {
    return (
      <PreviewRoute
        startLocation={startLocation}
        endLocation={endLocation}
        onRouteGenerated={() => setIsRouteGenerated(true)}
      >
        <Button variant="solid" colorPalette="black" px="4">
          Preview
        </Button>
      </PreviewRoute>
    );
  }

  return (
    <ButtonGroup>
      <Button type="submit" variant="solid" colorPalette="teal" px="4">
        Create new carpool
      </Button>

      <Button type="submit" variant="solid" colorPalette="teal" px="4">
        Request carpool
      </Button>
    </ButtonGroup>
  );
}
