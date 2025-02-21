import { Container, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { Login } from "@/components/login";

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

      <Login />
    </Container>
  );
}
