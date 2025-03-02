import { redirect } from "next/navigation";

export function generateToast(
  toastType: "info" | "error" | "success",
  toastId: string,
  toastMessage: string,
  redirectPath = ""
) {
  const redirectURL = `${redirectPath}?toast_type=${encodeURIComponent(
    toastType
  )}&toast_id=${encodeURIComponent(toastId)}&toast_message=${encodeURIComponent(
    toastMessage
  )}`;

  redirect(redirectURL);
}
