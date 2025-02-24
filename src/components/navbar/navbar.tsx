import { Button, Container, Heading, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { Login } from "@/components/login";
import { Suspense } from "react";
import { MdAdd } from "react-icons/md";

export function Navbar() {
  return (
    <Container
      w="full"
      maxW="full"
      bgColor="black"
      px="20"
      py="2"
      zIndex="1"
      display="flex"
      justifyContent="space-between"
    >
      <Link href="/">
        <Heading size="3xl" color="teal.500" fontWeight="bold">
          ridewise
        </Heading>
      </Link>

      <HStack gap="4">
        <Button colorPalette="teal" variant="outline" asChild>
          <Link href="/create">
            Create carpool <MdAdd />
          </Link>
        </Button>

        <Suspense>
          <Login />
        </Suspense>
      </HStack>
    </Container>
  );
}
