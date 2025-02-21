"use client";

import { createClient } from "@/utils/supabase/client";
import { MenuItem } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export function Logout() {
  const supabase = createClient();
  const router = useRouter();

  const onLogoutHandle = () => {
    supabase.auth.signOut();
    router.refresh();
  };

  return (
    <MenuItem
      value="signout"
      color="fg.error"
      cursor="pointer"
      _hover={{ bg: "bg.error", color: "fg.error" }}
      p="2"
      onClick={onLogoutHandle}
    >
      Signout
    </MenuItem>
  );
}
