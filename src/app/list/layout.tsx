import { Card } from "@chakra-ui/react";

export default function ListViewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Card.Root w="full">
      <Card.Body p="4">{children}</Card.Body>
    </Card.Root>
  );
}
