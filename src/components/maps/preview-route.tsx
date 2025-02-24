import { Box } from "@chakra-ui/react";
import { useGenerateRoute } from "./useGenerateRoute";
import { PropsWithChildren } from "react";
import { DirectionsRenderer } from "@react-google-maps/api";

interface PreviewRouteProps {
  startLocation: string | undefined;
  endLocation: string | undefined;
}

export function PreviewRoute({
  startLocation,
  endLocation,
  children,
}: PropsWithChildren<PreviewRouteProps>) {
  const { route, generateRoute } = useGenerateRoute();

  return (
    <Box onClick={() => generateRoute(startLocation, endLocation)}>
      {children}

      <DirectionsRenderer directions={route} />
    </Box>
  );
}
