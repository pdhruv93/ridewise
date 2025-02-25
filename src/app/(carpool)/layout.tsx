import { Box, Card } from "@chakra-ui/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box px="20" py="20">
      <Card.Root w="sm">
        <Card.Body p="4">{children}</Card.Body>
      </Card.Root>
    </Box>
  );
}
