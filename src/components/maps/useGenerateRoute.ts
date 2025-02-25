import { toaster } from "@/components/ui/toaster";
import { useState } from "react";

export function useGenerateRoute() {
  const [originalRoute, setOriginalRoute] = useState<
    google.maps.DirectionsResult | undefined
  >(undefined);
  const [routeWithWayPoints, setRouteWithWayPoints] = useState<
    google.maps.DirectionsResult | undefined
  >(undefined);

  const generateRoute = async (
    startLocation: string | null | undefined,
    endLocation: string | null | undefined,
    waypoints?: google.maps.DirectionsWaypoint[]
  ) => {
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
        setOriginalRoute(results);
      }

      if (waypoints?.length) {
        const results = await directionService.route({
          origin: startLocation,
          destination: endLocation,
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: false,
          waypoints,
          optimizeWaypoints: true,
        });

        if (results.routes.length) {
          setRouteWithWayPoints(results);
        }
      }
    } catch {
      toaster.create({
        title: "No route found",
        type: "error",
      });
    }
  };

  return { originalRoute, routeWithWayPoints, generateRoute };
}
