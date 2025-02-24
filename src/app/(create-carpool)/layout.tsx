import { Card } from "@chakra-ui/react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Card.Root w="sm">
      <Card.Body p="4">{children}</Card.Body>
    </Card.Root>
  );
}
