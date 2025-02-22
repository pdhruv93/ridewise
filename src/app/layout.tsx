import type { Metadata } from "next";
import { Provider } from "@/components/ui/provider";
import { Navbar } from "@/components/navbar";
import MapContainer from "@/components/maps/map-container";
import { Toaster } from "@/components/ui/toaster";
import { Box } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "ridewise",
  description: "car pooling made wisely for you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>
          <Navbar />

          <MapContainer>
            <Box px="20" py="20">
              {children}
            </Box>
          </MapContainer>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
