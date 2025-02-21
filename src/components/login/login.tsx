import { Button } from "@chakra-ui/react";
import {
  PopoverTrigger,
  PopoverRoot,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from "@/components/ui/popover";
import { LoginForm } from "./login-form";

export function Login() {
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
