import { SimpleGrid } from "@chakra-ui/react";

export default function RootLayout({
  carpoolsList,
  createCarpool,
}: Readonly<{
  children: React.ReactNode;
  carpoolsList: React.ReactNode;
  createCarpool: React.ReactNode;
}>) {
  return (
    <SimpleGrid minChildWidth="md" maxW="full">
      {carpoolsList}
      {createCarpool}
    </SimpleGrid>
  );
}
