import { SimpleGrid } from "@chakra-ui/react";

export default function RootLayout({
  carpoolsList,
  createNew,
}: Readonly<{
  children: React.ReactNode;
  carpoolsList: React.ReactNode;
  createNew: React.ReactNode;
}>) {
  return (
    <SimpleGrid minChildWidth="md">
      {carpoolsList}
      {createNew}
    </SimpleGrid>
  );
}
