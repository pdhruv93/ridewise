"use client";

import { PreviewRoute } from "@/components/maps/preview-route";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { RefObject, useState } from "react";
import NextLink from "next/link";

interface ActionButtonsProps {
  startLocation: RefObject<HTMLInputElement | null>;
  endLocation: RefObject<HTMLInputElement | null>;
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
      <Button
        type="submit"
        variant="solid"
        colorPalette="teal"
        px="4"
        value="create"
      >
        Create new carpool
      </Button>

      <Button
        type="submit"
        variant="solid"
        colorPalette="teal"
        px="4"
        value="request"
        asChild
      >
        <NextLink
          href={`/list?startLocation=${startLocation.current?.value}&endLocation=${endLocation.current?.value}`}
        >
          View carpools
        </NextLink>
      </Button>
    </ButtonGroup>
  );
}
