import { Alert, AlertType } from "../../alert";
import { Translated } from "../../translated";

export async function linkingFailed(
  error?: string,
) {
  return (
    <div className="m-auto w-full max-w-[330px] space-y-6 pb-10">
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-4">
          <h2
            style={{
              color: "hsl(250,100%,38%)",
            }}
          >
            <Translated i18nKey="linkingError.title" namespace="idp" />
          </h2>
          <p className="">
            <Translated i18nKey="linkingError.description" namespace="idp" />
          </p>

          {error && (
            <div className="w-full">
              {<Alert type={AlertType.ALERT}>{error}</Alert>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
