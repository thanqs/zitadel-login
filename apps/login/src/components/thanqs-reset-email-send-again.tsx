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
      className="w-full p-5 pb-6 flex flex-col gap-4"
      style={{
        backgroundColor: "#FaF7F5",
        border: "1px solid #E6E3E1",
        borderRadius: "8px",
      }}
    >
      <p className="text-center">
        Niet ontvangen? Check je spam folder of vraag de link opnieuw aan.
      </p>
      <Button
        type="button"
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
