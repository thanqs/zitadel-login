"use client";

import { Button, ButtonVariants } from "@/components/button";
import { useState } from "react";
import { resendVerification } from "@/lib/server/verify";

type Props = {
  userId: string;
  isInvite: boolean;
};

export const ThanqsVerifyEmailSendAgain = ({
  userId,
  isInvite,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function resendCode() {
    setError("");
    setLoading(true);

    const response = await resendVerification({
      userId,
      isInvite: isInvite,
    })
      .catch(() => {
        setError("Could not resend email");
        return;
      })
      .finally(() => {
        setLoading(false);
      });

    if (response && "error" in response && response?.error) {
      setError(response.error);
      return;
    }

    return response;
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
        disabled={loading}
        onClick={() => {
          resendCode();
        }}
      >
        Opnieuw aanvragen
      </Button>
    </div>
  );
};
