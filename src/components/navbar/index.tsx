import { Heading, HStack, Link as ChkaraLink } from "@chakra-ui/react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <HStack justify="space-between" w="full" mb="10">
      <Link href="/">
        <Heading size="3xl" color="teal.500" fontWeight="bold">
          ridewise
        </Heading>
      </Link>

      <ChkaraLink as={Link} href="/faq">
        FAQ
      </ChkaraLink>
    </HStack>
  );
};
