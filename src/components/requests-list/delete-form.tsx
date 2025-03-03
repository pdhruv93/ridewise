import { Button } from "@/components/ui/button";
import { deleteRequest } from "./delete-request-action";
import { useActionState } from "react";

interface DeleteFormProps {
  requestId: string;
}

export default function DeleteForm({ requestId }: DeleteFormProps) {
  const formActionWithParams = deleteRequest.bind(null, requestId);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, formAction] = useActionState(formActionWithParams, undefined);

  return (
    <Button
      type="submit"
      formAction={formAction}
      variant="solid"
      colorPalette="teal"
    >
      Delete request
    </Button>
  );
}
