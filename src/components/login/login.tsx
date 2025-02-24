import {
  Avatar,
  Button,
  MenuContent,
  MenuRoot,
  MenuTrigger,
} from "@chakra-ui/react";
import {
  PopoverTrigger,
  PopoverRoot,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from "@/components/ui/popover";
import { LoginForm } from "./login-form";
import { createClient } from "@/utils/supabase/server";
import { Logout } from "./logout";

export async function Login() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (!error && data?.user) {
    return (
      <MenuRoot positioning={{ placement: "bottom-end" }}>
        <MenuTrigger asChild>
          <Avatar.Root colorPalette="teal" cursor="pointer">
            <Avatar.Fallback />
          </Avatar.Root>
        </MenuTrigger>

        <MenuContent>
          <Logout />
        </MenuContent>
      </MenuRoot>
    );
  }

  return (
    <PopoverRoot
      lazyMount
      unmountOnExit
      positioning={{ placement: "bottom-end" }}
      size="sm"
    >
      <PopoverTrigger asChild>
        <Button px="4">Login</Button>
      </PopoverTrigger>

      <PopoverContent p="4">
        <PopoverArrow />

        <PopoverBody>
          <LoginForm />
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
}
