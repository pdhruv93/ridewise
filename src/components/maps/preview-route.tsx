"use client";

import { Box } from "@chakra-ui/react";
import { useGenerateRoute } from "./useGenerateRoute";
import { PropsWithChildren } from "react";
import { DirectionsRenderer } from "@react-google-maps/api";

interface PreviewRouteProps {
  startLocation: string | null | undefined;
  endLocation: string | null | undefined;
}

export function PreviewRoute({
  startLocation,
  endLocation,
  children,
}: PropsWithChildren<PreviewRouteProps>) {
  const { route, generateRoute } = useGenerateRoute();

  if (!startLocation || !endLocation) {
    return null;
  }

  return (
    <Box onClick={() => generateRoute(startLocation, endLocation)}>
      {children}

      <DirectionsRenderer directions={route} />
    </Box>
  );
}
