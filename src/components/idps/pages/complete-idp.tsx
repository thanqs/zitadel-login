import { RegisterFormIDPIncomplete } from "@/components/register-form-idp-incomplete";
import { AddHumanUserRequest } from "@zitadel/proto/zitadel/user/v2/user_service_pb";
import { Translated } from "../../translated";

export async function completeIDP({
  idpUserId,
  idpId,
  idpUserName,
  addHumanUser,
  requestId,
  organization,
  idpIntent,
}: {
  idpUserId: string;
  idpId: string;
  idpUserName: string;
  addHumanUser?: AddHumanUserRequest;
  requestId?: string;
  organization: string;
  idpIntent: {
    idpIntentId: string;
    idpIntentToken: string;
  };
}) {
  return (
    <div className="m-auto w-full max-w-[330px] space-y-6 pb-10">
      <div className="flex flex-col items-start gap-6">
        <div className="flex flex-col items-start gap-4">
        <h2
          className="text-brand-blue"
        >
          <Translated i18nKey="completeRegister.title" namespace="idp" />
        </h2>
        <p className="">
          <Translated i18nKey="completeRegister.description" namespace="idp" />
        </p>
        </div>

        <RegisterFormIDPIncomplete
          idpUserId={idpUserId}
          idpId={idpId}
          idpUserName={idpUserName}
          defaultValues={{
            email: addHumanUser?.email?.email || "",
            firstname: addHumanUser?.profile?.givenName || "",
            lastname: addHumanUser?.profile?.familyName || "",
          }}
          requestId={requestId}
          organization={organization}
          idpIntent={idpIntent}
        />
      </div>
    </div>
  );
}
