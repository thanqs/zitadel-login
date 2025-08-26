import { Alert } from "@/components/alert";
import { SetPasswordForm } from "@/components/set-password-form";
import { ThanqsResetEmailSendAgain } from "@/components/thanqs-reset-email-send-again";
import { Translated } from "@/components/translated";
import { getServiceUrlFromHeaders } from "@/lib/service-url";
import { loadMostRecentSession } from "@/lib/session";
import {
  getLoginSettings,
  getPasswordComplexitySettings,
  getUserByID,
} from "@/lib/zitadel";
import { Session } from "@zitadel/proto/zitadel/session/v2/session_pb";
import { User } from "@zitadel/proto/zitadel/user/v2/user_pb";
import { headers } from "next/headers";
import Image from "next/image";
import EnvelopeIcon from "../../../../public/icons/envelope.svg";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ namespace: 'pages' });
  return {
    title: t('password.title')
  };
}

export default async function Page(props: {
  searchParams: Promise<Record<string | number | symbol, string | undefined>>;
}) {
  const searchParams = await props.searchParams;

  const { userId, loginName, organization, requestId, code, initial } =
    searchParams;

  const _headers = await headers();
  const { serviceUrl } = getServiceUrlFromHeaders(_headers);

  // also allow no session to be found (ignoreUnkownUsername)
  let session: Session | undefined;
  if (loginName) {
    session = await loadMostRecentSession({
      serviceUrl,
      sessionParams: {
        loginName,
        organization,
      },
    });
  }

  const passwordComplexity = await getPasswordComplexitySettings({
    serviceUrl,
    organization: session?.factors?.user?.organizationId,
  });

  const loginSettings = await getLoginSettings({
    serviceUrl,
    organization,
  });

  let user: User | undefined;
  if (userId) {
    const userResponse = await getUserByID({
      serviceUrl,
      userId,
    });
    user = userResponse.user;
  }

  return initial !== "true" && !code ? (
    <div className="m-auto w-full max-w-[566px] space-y-6 pb-10 px-4">
      <div className="flex flex-col items-center space-y-4 gap-[40px]">
        <div className="flex flex-col items-center space-y-4">
          <Image src={EnvelopeIcon} alt="Envelope" width={100} height={100} />
          <h2
            style={{
              color: "hsl(250,100%,38%)",
            }}
          >
            Check je inbox
          </h2>
          <p className="text-center">
            <Translated i18nKey="set.codeSent" namespace="password" />
          </p>
        </div>
        <ThanqsResetEmailSendAgain
          loginName={loginName ?? (user?.preferredLoginName as string)}
          organization={organization}
          requestId={requestId}
        />
      </div>
    </div>
  ) : (
    <div className="m-auto w-full max-w-[330px] space-y-6 pb-10 px-4">
      <div className="flex flex-col items-start space-y-4">
        <h2 style={{ color: "hsl(250,100%,38%)" }}>
            <Translated i18nKey="set.title" namespace="password" />
        </h2>

        <p>
          <Translated i18nKey="set.description" namespace="password" />
        </p>

        {/* show error only if usernames should be shown to be unknown */}
        {loginName && !session && !loginSettings?.ignoreUnknownUsernames && (
          <div className="py-4">
            <Alert>
              <Translated i18nKey="unknownContext" namespace="error" />
            </Alert>
          </div>
        )}

        {/*{session ? (*/}
        {/*  <UserAvatar*/}
        {/*    loginName={loginName ?? session.factors?.user?.loginName}*/}
        {/*    displayName={session.factors?.user?.displayName}*/}
        {/*    showDropdown*/}
        {/*    searchParams={searchParams}*/}
        {/*  ></UserAvatar>*/}
        {/*) : user ? (*/}
        {/*  <UserAvatar*/}
        {/*    loginName={user?.preferredLoginName}*/}
        {/*    displayName={displayName}*/}
        {/*    showDropdown*/}
        {/*    searchParams={searchParams}*/}
        {/*  ></UserAvatar>*/}
        {/*) : null}*/}

        {passwordComplexity &&
        (loginName ?? user?.preferredLoginName) &&
        (userId ?? session?.factors?.user?.id) ? (
          <SetPasswordForm
            code={code}
            userId={userId ?? (session?.factors?.user?.id as string)}
            loginName={loginName ?? (user?.preferredLoginName as string)}
            requestId={requestId}
            organization={organization}
            passwordComplexitySettings={passwordComplexity}
            codeRequired={!(initial === "true")}
          />
        ) : (
          <div className="py-4">
            <Alert>
              <Translated i18nKey="failedLoading" namespace="error" />
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
}
