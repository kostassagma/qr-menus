"use client";
import { useSearchParams } from "next/navigation";
import { FC, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const HotToast: FC = () => {
  const searchParams = useSearchParams();

  const toastParam = searchParams.get("toast");

  useEffect(() => {
    if (toastParam == "logged-in") {
      toast.success("Successfully logged in!");
    } else if (toastParam == "need-auth") {
      toast("You need to login!");
    } else if (toastParam == "auth-err") {
      toast.error("Couldn't log in!");
    } else if (toastParam == "otp-expired") {
      toast.error("Ο κωδικός σας έχει λήξει!");
      toast("Εισάγετε τον νέο κωδικό που σας στείλαμε");
    }
  }, [searchParams]);

  return <Toaster />;
};

export default HotToast;
