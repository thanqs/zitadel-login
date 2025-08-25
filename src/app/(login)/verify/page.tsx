import { Alert, AlertType } from "@/components/alert";
import { Translated } from "@/components/translated";
import { sendEmailCode, sendInviteEmailCode } from "@/lib/server/verify";
import { getServiceUrlFromHeaders } from "@/lib/service-url";
import { loadMostRecentSession } from "@/lib/session";
import { getUserByID } from "@/lib/zitadel";
import { HumanUser, User } from "@zitadel/proto/zitadel/user/v2/user_pb";
import { headers } from "next/headers";
import Image from "next/image";
import EnvelopeIcon from "@/public/icons/envelope.svg";
import { ThanqsVerifyEmailSendAgain } from "@/components/thanqs-verify-email-send-again";
import { VerifyForm } from "@/components/verify-form";

export default async function Page(props: { searchParams: Promise<any> }) {
  const searchParams = await props.searchParams;

  const { userId, loginName, code, organization, requestId, invite, send } =
    searchParams;

  const _headers = await headers();
  const { serviceUrl } = getServiceUrlFromHeaders(_headers);


  let sessionFactors;
  let user: User | undefined;
  let human: HumanUser | undefined;
  let id: string | undefined;

  const doSend = send === "true";

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";


  async function sendEmail(userId: string) {
    const host = _headers.get("host");

    if (!host || typeof host !== "string") {
      throw new Error("No host found");
    }

    if (invite === "true") {
      await sendInviteEmailCode({
        userId,
        urlTemplate:
          `${host.includes("localhost") ? "http://" : "https://"}${host}${basePath}/verify?code={{.Code}}&userId={{.UserID}}&organization={{.OrgID}}&invite=true` +
          (requestId ? `&requestId=${requestId}` : ""),
      }).catch((error) => {
        console.error("Could not send invitation email", error);
        throw Error("Failed to send invitation email");
      });
    } else {
      await sendEmailCode({
        userId,
        urlTemplate:
          `${host.includes("localhost") ? "http://" : "https://"}${host}${basePath}/verify?code={{.Code}}&userId={{.UserID}}&organization={{.OrgID}}` +
          (requestId ? `&requestId=${requestId}` : ""),
      }).catch((error) => {
        console.error("Could not send verification email", error);
        throw Error("Failed to send verification email");
      });
    }
  }

  if ("loginName" in searchParams) {
    sessionFactors = await loadMostRecentSession({
      serviceUrl,
      sessionParams: {
        loginName,
        organization,
      },
    });

    if (doSend && sessionFactors?.factors?.user?.id) {
      await sendEmail(sessionFactors.factors.user.id);
    }
  } else if ("userId" in searchParams && userId) {
    if (doSend) {
      await sendEmail(userId);
    }

    const userResponse = await getUserByID({
      serviceUrl,
      userId,
    });
    if (userResponse) {
      user = userResponse.user;
      if (user?.type.case === "human") {
        human = user.type.value as HumanUser;
      }
    }
  }

  id = userId ?? sessionFactors?.factors?.user?.id;

  if (!id) {
    throw Error("Failed to get user id");
  }

  const params = new URLSearchParams({
    userId: userId,
    initial: "true", // defines that a code is not required and is therefore not shown in the UI
  });

  if (loginName) {
    params.set("loginName", loginName);
  }

  if (organization) {
    params.set("organization", organization);
  }

  if (requestId) {
    params.set("requestId", requestId);
  }

  if (invite !== "true"&& !doSend && !code) {
    //This means we are coming from register
    return (<div className="m-auto w-full max-w-[566px] space-y-6 pb-10">
      <div className="flex flex-col items-center space-y-4 gap-[40px]">
        <div className="flex flex-col items-center space-y-4">
          <Image src={EnvelopeIcon} alt="Envelope" width={100} height={100} />
          <h2
            className="text-brand-blue"
          >
            <Translated i18nKey="verify.title" namespace="verify" />
          </h2>
          <p className="text-center">
            <Translated i18nKey="verify.codeSent" namespace="verify" data={{email: human?.email?.email ?? loginName}} />
          </p>
        </div>
        <ThanqsVerifyEmailSendAgain
          userId={userId}
          isInvite={invite === "true"}
        />
      </div>
    </div>)
  }

  return (
    <div className="m-auto w-full max-w-[330px] space-y-6 pb-10">
      <div className="flex flex-col items-start gap-4">
        <Image src={EnvelopeIcon} alt="Envelope" width={100} height={100} />
        <h2
          className="text-brand-blue"
        >
          <Translated i18nKey="verify.title" namespace="verify" />
        </h2>

        {!id && (
          <div className="py-4">
            <Alert>
              <Translated i18nKey="unknownContext" namespace="error" />
            </Alert>
          </div>
        )}

        {id && send && (
          <p className="w-full py-4 text-neutral-700">
            <Translated i18nKey="verify.codeSentAgain" namespace="verify" data={{email: human?.email?.email ?? loginName}} />
          </p>
        )}
        <VerifyForm
          loginName={loginName}
          organization={organization}
          userId={id}
          code={code}
          isInvite={invite === "true"}
          requestId={requestId}
        />
      </div>
    </div>
  );
}
