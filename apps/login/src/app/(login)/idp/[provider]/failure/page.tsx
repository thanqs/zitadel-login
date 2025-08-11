import { ChooseAuthenticatorToLogin } from "@/components/choose-authenticator-to-login";
import { Translated } from "@/components/translated";
import { UserAvatar } from "@/components/user-avatar";
import { getServiceUrlFromHeaders } from "@/lib/service-url";
import {
   getLoginSettings,
  getUserByID,
  listAuthenticationMethodTypes,
} from "@/lib/zitadel";
import { HumanUser, User } from "@zitadel/proto/zitadel/user/v2/user_pb";
import { AuthenticationMethodType } from "@zitadel/proto/zitadel/user/v2/user_service_pb";
import { headers } from "next/headers";

export default async function Page(props: {
  searchParams: Promise<Record<string | number | symbol, string | undefined>>;
  params: Promise<{ provider: string }>;
}) {
  const searchParams = await props.searchParams;

  const { organization, userId } = searchParams;

  const _headers = await headers();
  const { serviceUrl } = getServiceUrlFromHeaders(_headers);

  const loginSettings = await getLoginSettings({
    serviceUrl,
    organization,
  });

  let authMethods: AuthenticationMethodType[] = [];
  let user: User | undefined = undefined;
  let human: HumanUser | undefined = undefined;

  const params = new URLSearchParams({});
  if (organization) {
    params.set("organization", organization);
  }
  if (userId) {
    params.set("userId", userId);
  }

  if (userId) {
    const userResponse = await getUserByID({
      serviceUrl,
      userId,
    });
    if (userResponse) {
      user = userResponse.user;
      if (user?.type.case === "human") {
        human = user.type.value as HumanUser;
      }

      if (user?.preferredLoginName) {
        params.set("loginName", user.preferredLoginName);
      }
    }

    const authMethodsResponse = await listAuthenticationMethodTypes({
      serviceUrl,
      userId,
    });
    if (authMethodsResponse.authMethodTypes) {
      authMethods = authMethodsResponse.authMethodTypes;
    }
  }

  return (
    <div className="m-auto w-full max-w-[330px] space-y-6 pb-10">
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-4">
          <h2
            style={{
              color: "hsl(250,100%,38%)",
            }}
          >
            <Translated i18nKey="loginError.title" namespace="idp" />
          </h2>
          <p className="">
            <Translated i18nKey="loginError.description" namespace="idp" />
          </p>

          {userId && authMethods.length && (
            <>
              {user && human && (
                <UserAvatar
                  loginName={user.preferredLoginName}
                  displayName={human?.profile?.displayName}
                  showDropdown={false}
                />
              )}

              <ChooseAuthenticatorToLogin
                authMethods={authMethods}
                loginSettings={loginSettings}
                params={params}
              ></ChooseAuthenticatorToLogin>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
