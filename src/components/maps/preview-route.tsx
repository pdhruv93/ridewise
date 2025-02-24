"use client";

import { Box } from "@chakra-ui/react";
import { DirectionsRenderer } from "@react-google-maps/api";
import { PropsWithChildren, RefObject, useState } from "react";
import { toaster } from "@/components/ui/toaster";

interface PreviewRouteProps {
  startLocation: string | RefObject<HTMLInputElement | null>;
  endLocation: string | RefObject<HTMLInputElement | null>;
  onRouteGenerated?: (route: google.maps.DirectionsResult) => void;
}

export function PreviewRoute({
  startLocation,
  endLocation,
  onRouteGenerated,
  children,
}: PropsWithChildren<PreviewRouteProps>) {
  const [route, setRoute] = useState<google.maps.DirectionsResult | undefined>(
    undefined
  );

  const generateRoute = async () => {
    const startLoc =
      typeof startLocation == "string"
        ? startLocation
        : startLocation?.current?.value;
    const endLoc =
      typeof endLocation == "string"
        ? endLocation
        : endLocation?.current?.value;

    if (!startLoc || !endLoc) {
      return;
    }

    try {
      const directionService = new google.maps.DirectionsService();

      const results = await directionService.route({
        origin: startLoc,
        destination: endLoc,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: false,
      });

      if (results.routes.length) {
        onRouteGenerated?.(results);

        console.log(":::", results);
        setRoute(results);
      }
    } catch {
      toaster.create({
        title: "No route found",
        type: "error",
      });
    }
  };

  return (
    <Box onClick={generateRoute}>
      {children}

      <DirectionsRenderer directions={route} />
    </Box>
  );
}
