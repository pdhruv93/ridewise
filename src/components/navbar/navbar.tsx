import { Container, Heading, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { Logout } from "@/components/login/logout";
import { createClient } from "@/utils/supabase/server";

export async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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

      {user ? <Logout /> : null}

      <HStack gap="4"></HStack>
    </Container>
  );
}
