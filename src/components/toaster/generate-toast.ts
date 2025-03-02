export const generateToast = (
  toastType: "info" | "error" | "success",
  toastId: string,
  toastMessage: string,
  redirectPath = ""
): string => {
  return `${redirectPath}?toast_type=${encodeURIComponent(
    toastType
  )}&toast_id=${encodeURIComponent(toastId)}&toast_message=${encodeURIComponent(
    toastMessage
  )}`;
};
