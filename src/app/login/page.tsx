import {
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@chakra-ui/react/dialog";
import { LoginForm } from "@/components/login/login-form";

export default function LoginModal() {
  return (
    <DialogRoot size="xs" open lazyMount>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <LoginForm />
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}
