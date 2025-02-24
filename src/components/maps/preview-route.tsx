"use client";

import { Box } from "@chakra-ui/react";
import { DirectionsRenderer } from "@react-google-maps/api";
import { PropsWithChildren, useState } from "react";
import { toaster } from "@/components/ui/toaster";

interface PreviewRouteProps {
  startLocation: string | null | undefined;
  endLocation: string | null | undefined;
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
    if (!startLocation || !endLocation) {
      return;
    }

    try {
      const directionService = new google.maps.DirectionsService();

      const results = await directionService.route({
        origin: startLocation,
        destination: endLocation,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: false,
      });

      if (results.routes.length) {
        onRouteGenerated?.(results);
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
