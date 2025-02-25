import type { Metadata } from "next";
import { Provider } from "@/components/ui/provider";
import { Navbar } from "@/components/navbar/navbar";
import MapContainer from "@/components/maps/map-container";
import { Toaster } from "@/components/ui/toaster";

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

          <MapContainer>{children}</MapContainer>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
