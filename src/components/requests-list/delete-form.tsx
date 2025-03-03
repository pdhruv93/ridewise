import { Button } from "@/components/ui/button";
import { Input } from "@chakra-ui/react/input";
import { deleteRequest } from "./delete-request-action";
import { useActionState } from "react";

interface DeleteFormProps {
  requestId: string;
}

export default function DeleteForm({ requestId }: DeleteFormProps) {
  const formActionWithParams = deleteRequest.bind(null, requestId);
  const [formAction] = useActionState(formActionWithParams, undefined);

  return (
    <>
      <form action={formAction}>
        <Input type="hidden" name="requestId" defaultValue={requestId} />

        <Button type="submit" variant="solid" colorPalette="teal">
          Delete request
        </Button>
      </form>
    </>
  );
}
