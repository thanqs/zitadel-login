import { IdpSignin } from "../../idp-signin";
import { Translated } from "../../translated";

export async function loginSuccess(
  userId: string,
  idpIntent: { idpIntentId: string; idpIntentToken: string },
  requestId?: string,
) {
  return (
    <div className="m-auto w-full max-w-[330px] space-y-6 pb-10">
      <div className="flex flex-col items-center gap-4">
        <h2
          style={{
            color: "hsl(250,100%,38%)",
          }}
        >
          <Translated i18nKey="loginSuccess.title" namespace="idp" />
        </h2>
        <p className="ztdl-p">
          <Translated i18nKey="loginSuccess.description" namespace="idp" />
        </p>

        <IdpSignin
          userId={userId}
          idpIntent={idpIntent}
          requestId={requestId}
        />
      </div>
    </div>
  );
}
