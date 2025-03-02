import { Button } from "@/components/ui/button";
import { useSubmitRequest } from "./useSubmitRequest";
import { Input } from "@chakra-ui/react/input";

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
  const { formAction } = useSubmitRequest();

  return (
    <>
      <form action={formAction}>
        <Input type="hidden" name="carpoolId" defaultValue={carpoolId} />
        <Input
          type="hidden"
          name="requestStartLocation"
          defaultValue={requestStartLocation}
        />
        <Input
          type="hidden"
          name="requestEndLocation"
          defaultValue={requestEndLocation}
        />

        <Button type="submit" variant="solid" colorPalette="teal" px="4">
          Submit request
        </Button>
      </form>
    </>
  );
}
