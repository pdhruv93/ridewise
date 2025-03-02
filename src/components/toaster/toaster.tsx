"use client";

import { Toaster as ChakraToaster, toaster } from "@/components/ui/toaster";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function Toaster() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const toastType = searchParams.get("toast_type");
    const toastId = searchParams.get("toast_id");
    const toastMessage = searchParams.get("toast_message");

    if (!toastType || !toastId || !toastMessage) {
      return;
    }

    toaster.create({
      id: toastId,
      title: toastMessage,
      type: toastType as "info" | "error" | "success",
    });

    // Clear toast related search params so that the toast doesn't show up again on refresh, but leave any other search params intact.
    const newSearchParams = new URLSearchParams(searchParams.toString());
    const paramsToRemove = ["toast_type", "toast_id", "toast_message"];

    paramsToRemove.forEach((param) => newSearchParams.delete(param));

    const redirectPath = `${pathname}?${newSearchParams.toString()}`;
    router.replace(redirectPath, { scroll: false });
  }, [searchParams]);

  return <ChakraToaster />;
}
