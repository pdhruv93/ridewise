export default async function Page({
  params,
}: {
  params: Promise<{ carpoolId: string }>;
}) {
  const carpoolId = (await params).carpoolId;
  return <>This is the details page page {carpoolId}</>;
}
