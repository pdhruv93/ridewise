import {
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoginForm } from "@/components/login/login-form";
import { createClient } from "@/utils/supabase/server";

export default async function LoginModal() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <DialogRoot size="xs" open={!user} lazyMount>
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
