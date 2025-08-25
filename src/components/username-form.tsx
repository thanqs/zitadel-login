"use client";

import { sendLoginname } from "@/lib/server/loginname";
import { LoginSettings } from "@zitadel/proto/zitadel/settings/v2/login_settings_pb";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "./alert";
import { Button, ButtonVariants } from "./button";
import { TextInput } from "./input";
import { Spinner } from "./spinner";
import { Translated } from "./translated";
import { useTranslations } from "next-intl";

type Inputs = {
  loginName: string;
};

type Props = {
  loginName: string | undefined;
  requestId: string | undefined;
  loginSettings: LoginSettings | undefined;
  organization?: string;
  suffix?: string;
  submit: boolean;
  allowRegister: boolean;
};

export function UsernameForm({
  loginName,
  requestId,
  organization,
  suffix,
  loginSettings,
  submit,
  allowRegister,
}: Props) {
  const { register, handleSubmit, formState } = useForm<Inputs>({
    mode: "onBlur",
    defaultValues: {
      loginName: loginName ? loginName : "",
    },
  });

  const t = useTranslations("loginname");

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function submitLoginName(values: Inputs, organization?: string) {
    setLoading(true);

    const res = await sendLoginname({
      loginName: values.loginName,
      organization,
      requestId,
      suffix,
    })
      .catch(() => {
        setError("An internal error occurred");
        return;
      })
      .finally(() => {
        setLoading(false);
      });

    if (res && "redirect" in res && res.redirect) {
      return router.push(res.redirect);
    }

    if (res && "error" in res && res.error) {
      setError(res.error);
      return;
    }

    return res;
  }

  useEffect(() => {
    if (submit && loginName) {
      // When we navigate to this page, we always want to be redirected if submit is true and the parameters are valid.
      submitLoginName({ loginName }, organization);
    }
  }, []);

  let inputLabel = "E-mailadres";
  if (
    loginSettings?.disableLoginWithEmail &&
    loginSettings?.disableLoginWithPhone
  ) {
    inputLabel = "Username";
  } else if (loginSettings?.disableLoginWithEmail) {
    inputLabel = "Username or phone number";
  } else if (loginSettings?.disableLoginWithPhone) {
    inputLabel = "Username or email";
  }

  return (<>
    <form className="w-full h-full space-y-3">
      <TextInput
        type="text"
        autoComplete="username"
        {...register("loginName", { required: t("required.loginName") })}
        label={inputLabel}
        data-testid="username-text-input"
        suffix={suffix}
      />
      {error && (
        <div data-testid="error">
          <Alert>{error}</Alert>
        </div>
      )}
      <div className="flex w-full flex-row items-center pt-3">
        <Button
          data-testid="submit-button"
          type="submit"
          className="w-full"
          variant={ButtonVariants.Primary}
          disabled={loading}
          onClick={handleSubmit((e) => submitLoginName(e, organization))}
        >
          {loading && <Spinner className="h-5 w-5 mr-2" />}
          <Translated i18nKey="submit" namespace="loginname" />
        </Button>
      </div>
    </form>
      {allowRegister && (
        <p className="text-center text-base font-normal text-neutral-500 md:mb-14">
        <button
          className="transition-all text-sm hover:text-primary-light-500"
          onClick={() => {
            const registerParams = new URLSearchParams();
            if (organization) {
              registerParams.append("organization", organization);
            }
            if (requestId) {
              registerParams.append("requestId", requestId);
            }

            router.push("/register?" + registerParams);
          }}
          type="button"
          disabled={loading}
          data-testid="register-button"
        >
          <Translated i18nKey="register" namespace="loginname" />
        </button>
        </p>
      )}
    </>
  );
}
