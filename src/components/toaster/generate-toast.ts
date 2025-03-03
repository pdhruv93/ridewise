"use server";

import { redirect } from "next/navigation";

export function generateToast(
  toastType: "info" | "error" | "success",
  toastId: string,
  toastMessage: string,
  redirectPath: string
) {
  const alreadyHasSearchParams = redirectPath.indexOf("?") > -1;
  const toastSearchParams = `toast_type=${encodeURIComponent(
    toastType
  )}&toast_id=${encodeURIComponent(toastId)}&toast_message=${encodeURIComponent(
    toastMessage
  )}`;

  const redirectURL = `${redirectPath}${
    alreadyHasSearchParams ? "&" : "?"
  }${toastSearchParams}`;

  return redirect(redirectURL);
}
