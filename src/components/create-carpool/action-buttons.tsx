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

  if (!areRoutesGenerated) {
    return (
      <Button
        variant="solid"
        colorPalette="black"
        px="4"
        onClick={() =>
          showRoute(startLocation.current?.value, endLocation.current?.value)
        }
      >
        Preview
      </Button>
    );
  }

  return (
    <ButtonGroup>
      <Button type="submit" variant="solid" colorPalette="teal" px="4">
        Create new carpool
      </Button>

      <Button variant="outline" px="4" value="request" asChild>
        <NextLink
          href={`/list/available_carpools?startLocation=${startLocation.current?.value}&endLocation=${endLocation.current?.value}`}
        >
          Join carpool
        </NextLink>
      </Button>
    </ButtonGroup>
  );
}
