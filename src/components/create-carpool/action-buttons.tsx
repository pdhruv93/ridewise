"use client";

import { useShowRoute } from "@/components/maps/useShowRoute";
import { RefObject } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@chakra-ui/react/button";
import NextLink from "next/link";

interface ActionButtonsProps {
  startLocation: RefObject<HTMLInputElement | null>;
  endLocation: RefObject<HTMLInputElement | null>;
}

export function ActionButtons({
  startLocation,
  endLocation,
}: ActionButtonsProps) {
  const { areRoutesGenerated, showRoute } = useShowRoute();
  const startLocationValue = startLocation.current?.value;
  const endLocationValue = endLocation.current?.value;

  if (!areRoutesGenerated) {
    return (
      <Button
        variant="solid"
        colorPalette="black"
        onClick={() => showRoute(startLocationValue, endLocationValue)}
      >
        Preview
      </Button>
    );
  }

  if (!startLocationValue || !endLocationValue) {
    return null;
  }

  return (
    <ButtonGroup>
      <Button type="submit" variant="solid" colorPalette="teal" px="4">
        Create new carpool
      </Button>

      <Button variant="outline" px="4" value="request" asChild>
        <NextLink
          href={`/list/available_carpools?startLocation=${encodeURIComponent(
            startLocationValue
          )}&endLocation=${encodeURIComponent(endLocationValue)}`}
        >
          Join carpool
        </NextLink>
      </Button>
    </ButtonGroup>
  );
}
