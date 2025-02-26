import { Container, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { UserMenu } from "./profile-menu";

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

      {user ? <UserMenu /> : null}
    </Container>
  );
}
