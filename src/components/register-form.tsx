"use client";

import { registerUser } from "@/lib/server/register";
import { LegalAndSupportSettings } from "@zitadel/proto/zitadel/settings/v2/legal_settings_pb";
import { LoginSettings, PasskeysType } from "@zitadel/proto/zitadel/settings/v2/login_settings_pb";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FieldValues, useForm } from "react-hook-form";
import { Alert, AlertType } from "./alert";
import { AuthenticationMethod, AuthenticationMethodRadio, methods } from "./authentication-method-radio";
import { Button, ButtonVariants } from "./button";
import { TextInput } from "./input";
import { PrivacyPolicyCheckboxes } from "./privacy-policy-checkboxes";
import { Spinner } from "./spinner";
import { Translated } from "./translated";

type Inputs =
  | {
  firstname: string;
  lastname: string;
  email: string;
}
  | FieldValues;

type Props = {
  legal: LegalAndSupportSettings;
  firstname?: string;
  lastname?: string;
  email?: string;
  organization: string;
  requestId?: string;
  loginSettings?: LoginSettings;
  idpCount: number;
};

export function RegisterForm({
  legal,
  email,
  firstname,
  lastname,
  organization,
  requestId,
  loginSettings,
  idpCount = 0,
}: Props) {
  const { register, handleSubmit, formState } = useForm<Inputs>({
    mode: "onBlur",
    defaultValues: {
      email: email ?? "",
      firstname: firstname ?? "-",
      lastname: lastname ?? "-",
    },
  });

  const t = useTranslations("register");

  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<AuthenticationMethod>(methods[0]);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const locale = useLocale();

  async function submitAndRegister(values: Inputs) {
    setLoading(true);
    const response = await registerUser({
      email: values.email,
      firstName: values.firstname,
      lastName: values.lastname,
      organization: organization,
      requestId: requestId,
      preferredLanguage: locale,
    })
      .catch(() => {
        setError("Could not register user");
        return;
      })
      .finally(() => {
        setLoading(false);
      });

    if (response && "error" in response && response.error) {
      setError(!response.errorCode ? response.error : t("error." + response.errorCode));
      return;
    }

    if (response && "redirect" in response && response.redirect) {
      return router.push(response.redirect);
    }

    return response;
  }

  async function submitAndContinue(
    value: Inputs,
    withPassword: boolean = false,
  ) {
    const registerParams: any = value;

    if (organization) {
      registerParams.organization = organization;
    }

    if (requestId) {
      registerParams.requestId = requestId;
    }

    // redirect user to /register/password if password is chosen
    // if (withPassword) {
    //   return router.push(
    //     `/register/password?` + new URLSearchParams(registerParams),
    //   );
    // } else {
    return submitAndRegister(value);
    // }
  }

  const { errors } = formState;

  return (
    <>
      <form className="w-full">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="col-span-2 hidden">
            <TextInput
              type="firstname"
              autoComplete="firstname"
              required
              {...register("firstname", { required: t("required.firstname") })}
              label={t("firstname")}
              error={errors.firstname?.message as string}
              data-testid="firstname-text-input"
            />
          </div>
          <div className="col-span-2 hidden">
            <TextInput
              type="lastname"
              autoComplete="lastname"
              required
              {...register("lastname", { required: t("required.lastname") })}
              label={t("lastname")}
              error={errors.lastname?.message as string}
              data-testid="lastname-text-input"
            />
          </div>
          <div className="col-span-2">
            <TextInput
              type="email"
              autoComplete="email"
              {...register("email", { required: t("required.email") })}
              label={t("label.email")}
              placeholder={t("placeholder.email")}
              error={errors.email?.message as string}
              data-testid="email-text-input"
            />
          </div>
        </div>
        {/* show chooser if both methods are allowed */}
        {loginSettings &&
          loginSettings.allowUsernamePassword &&
          loginSettings.passkeysType == PasskeysType.ALLOWED && (
            <>
              <p className="mt-4 ztdl-p mb-6 block text-left">
                <Translated i18nKey="selectMethod" namespace="register" />
              </p>

              <div className="pb-4">
                <AuthenticationMethodRadio
                  selected={selected}
                  selectionChanged={setSelected}
                />
              </div>
            </>
          )}
        {!loginSettings?.allowUsernamePassword &&
          loginSettings?.passkeysType !== PasskeysType.ALLOWED &&
          (!loginSettings?.allowExternalIdp || !idpCount) && (
            <div className="py-4">
              <Alert type={AlertType.INFO}>
                <Translated
                  i18nKey="noMethodAvailableWarning"
                  namespace="register"
                />
              </Alert>
            </div>
          )}

        {error && (
          <div>
            <Alert>{error}</Alert>
          </div>
        )}

        <div className="mt-8 flex w-full flex-row items-center justify-between">
          <Button
            type="submit"
            className="w-full"
            variant={ButtonVariants.Primary}
            disabled={loading}
            onClick={handleSubmit((values) => {
              const usePasswordToContinue: boolean =
                loginSettings?.allowUsernamePassword &&
                loginSettings?.passkeysType == PasskeysType.ALLOWED
                  ? !(selected === methods[0]) // choose selection if both available
                  : !!loginSettings?.allowUsernamePassword; // if password is chosen
              // set password as default if only password is allowed
              return submitAndContinue(values, usePasswordToContinue);
            })}
            data-testid="submit-button"
          >
            {loading && <Spinner className="h-5 w-5 mr-2" />}
            <Translated i18nKey="submit" namespace="register" />
          </Button>
        </div>
        {legal && <PrivacyPolicyCheckboxes legal={legal} />}
      </form>
      <button
        className="w-full transition-all hover:text-primary-light-500 dark:hover:text-primary-dark-500"
        onClick={() => {
          const registerParams = new URLSearchParams();
          if (organization) {
            registerParams.append("organization", organization);
          }
          if (requestId) {
            registerParams.append("requestId", requestId);
          }

          router.push("/loginname?" + registerParams);
        }}
        type="button"
        disabled={loading}
        data-testid="register-button"
      >
        <Translated i18nKey="login" namespace="register" />
      </button>
    </>
  );
}
