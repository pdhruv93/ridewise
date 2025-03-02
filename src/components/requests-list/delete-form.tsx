import { Button } from "@/components/ui/button";
import { Input } from "@chakra-ui/react/input";
import { useDeleteRequest } from "./useDeleteRequest";

interface DeleteFormProps {
  requestId: string;
}

export default function DeleteForm({ requestId }: DeleteFormProps) {
  const { formAction } = useDeleteRequest();

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
