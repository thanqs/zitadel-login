"use client";

import { resetPassword, sendPassword } from "@/lib/server/password";
import { create } from "@zitadel/client";
import { ChecksSchema } from "@zitadel/proto/zitadel/session/v2/session_service_pb";
import { LoginSettings } from "@zitadel/proto/zitadel/settings/v2/login_settings_pb";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { Alert, AlertType } from "./alert";
import { BackButton } from "./back-button";
import { Button, ButtonVariants } from "./button";
import { TextInput } from "./input";
import { Spinner } from "./spinner";
import { Translated } from "./translated";

type Inputs = {
  password: string;
};

type Props = {
  loginSettings: LoginSettings | undefined;
  loginName: string;
  organization?: string;
  requestId?: string;
};

export function PasswordForm({
  loginSettings,
  loginName,
  organization,
  requestId,
}: Props) {
  const { register, handleSubmit, formState } = useForm<Inputs>({
    mode: "onBlur",
  });

  const t = useTranslations("password");

  const [info, setInfo] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  async function submitPassword(values: Inputs) {
    setError("");
    setLoading(true);

    const response = await sendPassword({
      loginName,
      organization,
      checks: create(ChecksSchema, {
        password: { password: values.password },
      }),
      requestId,
    })
      .catch(() => {
        setError("Could not verify password");
        return;
      })
      .finally(() => {
        setLoading(false);
      });

    if (response && "error" in response && response.error) {
      setError(response.error);
      return;
    }

    if (response && "redirect" in response && response.redirect) {
      return router.push(response.redirect);
    }
  }

  async function resetPasswordAndContinue() {
    setError("");
    setInfo("");
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

    setInfo("Password was reset. Please check your email.");

    const params = new URLSearchParams({
      loginName: loginName,
    });

    if (organization) {
      params.append("organization", organization);
    }

    if (requestId) {
      params.append("requestId", requestId);
    }

    return router.push("/password/set?" + params);
  }

  return (
    <form className="w-full flex flex-col gap-6">
      <div className={`${error && "transform-gpu animate-shake"} flex flex-col gap-3`}>
        <TextInput
          type="password"
          autoComplete="password"
          {...register("password", { required: t("verify.required.password") })}
          label="Password"
          data-testid="password-text-input"
        />
        {!loginSettings?.hidePasswordReset && (
          <a
            className=" transition-all text-sm hover:text-primary-light-500 dark:hover:text-primary-dark-500"
            style={{ textAlign: "right", color: "#2100C4", textDecoration: "underline", fontWeight: "600", fontSize: "16px" }}
            onClick={() => resetPasswordAndContinue()}
            // type="button"
            // disabled={loading}
            data-testid="reset-button"
          >
            <Translated i18nKey="verify.resetPassword" namespace="password" />
          </a>
        )}

        {loginName && (
          <input
            type="hidden"
            name="loginName"
            autoComplete="username"
            value={loginName}
          />
        )}
      </div>

      {info && (
        <div className="py-4">
          <Alert type={AlertType.INFO}>{info}</Alert>
        </div>
      )}

      {error && (
        <div className="py-4" data-testid="error">
          <Alert>{error}</Alert>
        </div>
      )}

      <div className="flex w-full flex-row items-center">
        <BackButton data-testid="back-button" />
        <span className="flex-grow"></span>
        <Button
          type="submit"
          className="self-end"
          variant={ButtonVariants.Primary}
          disabled={loading || !formState.isValid}
          onClick={handleSubmit(submitPassword)}
          data-testid="submit-button"
        >
          {loading && <Spinner className="h-5 w-5 mr-2" />}{" "}
          <Translated i18nKey="verify.submit" namespace="password" />
        </Button>
      </div>
    </form>
  );
}
