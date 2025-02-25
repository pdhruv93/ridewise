"use client";

import { Box } from "@chakra-ui/react";
import { useGenerateRoute } from "./useGenerateRoute";
import { PropsWithChildren } from "react";
import { DirectionsRenderer } from "@react-google-maps/api";

interface PreviewRouteProps {
  startLocation: string | null | undefined;
  endLocation: string | null | undefined;
  waypoints?: google.maps.DirectionsWaypoint[];
  hideTriggerAfterRoutePreview?: boolean;
}

export function PreviewRoute({
  startLocation,
  endLocation,
  waypoints = [],
  hideTriggerAfterRoutePreview = true,
  children,
}: PropsWithChildren<PreviewRouteProps>) {
  const { originalRoute, routeWithWayPoints, generateRoute } =
    useGenerateRoute();

  return (
    <Box onClick={() => generateRoute(startLocation, endLocation, waypoints)}>
      {originalRoute && hideTriggerAfterRoutePreview ? null : children}

      <DirectionsRenderer directions={originalRoute} />

      {routeWithWayPoints ? (
        <DirectionsRenderer directions={routeWithWayPoints} />
      ) : null}
    </Box>
  );
}
