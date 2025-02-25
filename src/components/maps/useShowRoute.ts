import { toaster } from "@/components/ui/toaster";
import { useGoogleMap } from "@react-google-maps/api";
import { useState } from "react";

export function useShowRoute() {
  const map = useGoogleMap();
  const [areRoutesGenerated, setAreRoutesGenerated] = useState(false);

  const showRoute = async (
    startLocation: string | null | undefined,
    endLocation: string | null | undefined,
    waypoints?: google.maps.DirectionsWaypoint[]
  ) => {
    if (!startLocation || !endLocation) {
      return;
    }

    const directionService = new google.maps.DirectionsService();
    const originalRouteRenderer = new google.maps.DirectionsRenderer();
    const withWaypointsRouteRenderer = new google.maps.DirectionsRenderer({
      polylineOptions: { strokeColor: "#000000" },
    });

    originalRouteRenderer.setMap(map);
    withWaypointsRouteRenderer.setMap(map);

    try {
      const results = await directionService.route({
        origin: startLocation,
        destination: endLocation,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: false,
      });

      if (results.routes.length) {
        originalRouteRenderer.setDirections(results);
      }

      // Show Route with waypoints
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
          withWaypointsRouteRenderer.setDirections(results);
        }
      }

      setAreRoutesGenerated(true);
    } catch {
      toaster.create({
        title: "No route found",
        type: "error",
      });
    }
  };

  return { areRoutesGenerated, showRoute };
}
