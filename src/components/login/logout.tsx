"use client";

import { createClient } from "@/utils/supabase/client";
import { Box } from "@chakra-ui/react/box";
import { useRouter } from "next/navigation";

export function Logout() {
  const supabase = createClient();
  const router = useRouter();

  const onLogoutHandle = () => {
    supabase.auth.signOut();
    router.replace("/");
    router.refresh();
  };

  return <Box onClick={onLogoutHandle}>Signout</Box>;
}
