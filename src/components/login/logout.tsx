"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export function Logout() {
  const supabase = createClient();
  const router = useRouter();

  const onLogoutHandle = () => {
    supabase.auth.signOut();
    router.refresh();
  };

  return (
    <Button variant="outline" color="fg.error" px="4" onClick={onLogoutHandle}>
      Signout
    </Button>
  );
}
