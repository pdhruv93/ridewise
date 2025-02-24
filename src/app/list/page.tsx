import { CarpoolsList } from "@/components/carpools-list/carpools-list";
import { redirect } from "next/navigation";

export default async function Page(props: {
  searchParams?: Promise<{
    startLocation?: string;
    endLocation?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const startLocation = searchParams?.startLocation;
  const endLocation = searchParams?.endLocation;

  console.log(":::", startLocation, endLocation);

  if (!startLocation || !endLocation) {
    console.log(startLocation, endLocation);
    // TODO: Generate toast notification
    redirect("/");
  }

  return (
    <CarpoolsList startLocation={startLocation} endLocation={endLocation} />
  );
}
