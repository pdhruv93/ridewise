import { Button } from "@/components/ui/button";
import { submitRequest } from "./submit-request-action";
import { useActionState } from "react";

interface RequestFormProps {
  carpoolId: string;
  requestStartLocation: string;
  requestEndLocation: string;
}

export default function RequestForm({
  carpoolId,
  requestStartLocation,
  requestEndLocation,
}: RequestFormProps) {
  const formActionWithParams = submitRequest.bind(
    null,
    carpoolId,
    requestStartLocation,
    requestEndLocation
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, formAction] = useActionState(formActionWithParams, undefined);

  return (
    <>
      <form action={formAction}>
        <Button type="submit" variant="solid" colorPalette="teal" px="4">
          Submit request
        </Button>
      </form>
    </>
  );
}
