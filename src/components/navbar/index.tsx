import { Container, Heading } from "@chakra-ui/react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <Container w="full" maxW="full" bgColor="black" px="20" py="2">
      <Link href="/">
        <Heading size="3xl" color="teal.500" fontWeight="bold">
          ridewise
        </Heading>
      </Link>
    </Container>
  );
};
