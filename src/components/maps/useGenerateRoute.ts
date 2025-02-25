import { toaster } from "@/components/ui/toaster";
import { useState } from "react";

export function useGenerateRoute() {
  const [route, setRoute] = useState<google.maps.DirectionsResult | undefined>(
    undefined
  );

  const generateRoute = async (
    startLocation: string | undefined,
    endLocation: string | undefined,
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
        waypoints,
        optimizeWaypoints: true,
      });

      if (results.routes.length) {
        setRoute(results);
      }
    } catch {
      toaster.create({
        title: "No route found",
        type: "error",
      });
    }
  };

  return { route, generateRoute };
}
