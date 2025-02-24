import { toaster } from "@/components/ui/toaster";

export function useGenerateRoute() {
  const generateRoute = async (startLocation: string, endLocation: string) => {
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
        return results;
      }
    } catch {
      toaster.create({
        title: "No route found",
        type: "error",
      });
    }
  };

  return { generateRoute };
}
