import { VStack } from "@chakra-ui/react/stack";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <VStack
      gap="4"
      maxH="50vh"
      overflowY="scroll"
      scrollbar="hidden"
      scrollBehavior="smooth"
      align="start"
    >
      {children}
    </VStack>
  );
}
