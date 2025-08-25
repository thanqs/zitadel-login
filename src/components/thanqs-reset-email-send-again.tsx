"use client";

import { Button, ButtonVariants } from "@/components/button";
import { resetPassword } from "@/lib/server/password";
import { useState } from "react";

type Props = {
  loginName: string;
  organization?: string;
  requestId?: string;
};

export const ThanqsResetEmailSendAgain = ({
  loginName,
  organization,
  requestId,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function resendCode() {
    setError("");
    setLoading(true);

    const response = await resetPassword({
      loginName,
      organization,
      requestId,
    })
      .catch(() => {
        setError("Could not reset password");
        return;
      })
      .finally(() => {
        setLoading(false);
      });

    if (response && "error" in response) {
      setError(response.error);
      return;
    }
  }

  return (
    <div
      className="w-full p-5 pb-6 flex flex-col items-center gap-4 rounded-lg border bg-[#FaF7F5]"
    >
      <p className="text-center text-neutral-500">
        Niet ontvangen? Check je spam folder of vraag de link opnieuw aan.
      </p>
      <Button
        type="button"
        disabled={loading}
        variant={ButtonVariants.Primary}
        onClick={() => {
          resendCode();
        }}
      >
        Opnieuw aanvragen
      </Button>
    </div>
  );
};
