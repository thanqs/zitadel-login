import { ConsentScreen } from "@/components/consent";
import { Translated } from "@/components/translated";
import { getServiceUrlFromHeaders } from "@/lib/service-url";
import {
  getDeviceAuthorizationRequest,
} from "@/lib/zitadel";
import { Organization } from "@zitadel/proto/zitadel/org/v2/org_pb";
import { headers } from "next/headers";

export default async function Page(props: {
  searchParams: Promise<Record<string | number | symbol, string | undefined>>;
}) {
  const searchParams = await props.searchParams;

  const userCode = searchParams?.user_code;
  const requestId = searchParams?.requestId;
  const organization = searchParams?.organization;

  if (!userCode || !requestId) {
    return (
      <div>
        <Translated i18nKey="noUserCode" namespace="error" />
      </div>
    );
  }

  const _headers = await headers();
  const { serviceUrl } = getServiceUrlFromHeaders(_headers);

  const { deviceAuthorizationRequest } = await getDeviceAuthorizationRequest({
    serviceUrl,
    userCode,
  });

  if (!deviceAuthorizationRequest) {
    return (
      <div>
        <Translated i18nKey="noDeviceRequest" namespace="error" />
      </div>
    );
  }

  const params = new URLSearchParams();

  if (requestId) {
    params.append("requestId", requestId);
  }

  if (organization) {
    params.append("organization", organization);
  }

  return (
    <div className="m-auto w-full max-w-[330px] space-y-6 pb-10">
      <div className="flex flex-col items-center space-y-4 gap-4">
        <h2
          style={{
            color: "hsl(250,100%,38%)",
          }}
        ><Translated
          i18nKey="request.title"
          namespace="device"
          data={{ appName: deviceAuthorizationRequest?.appName }}
        />
        </h2>

        <p className="ztdl-p">
          <Translated
            i18nKey="request.description"
            namespace="device"
            data={{ appName: deviceAuthorizationRequest?.appName }}
          />
        </p>

        <ConsentScreen
          deviceAuthorizationRequestId={deviceAuthorizationRequest?.id}
          scope={deviceAuthorizationRequest.scope}
          appName={deviceAuthorizationRequest?.appName}
          nextUrl={`/loginname?` + params}
        />
      </div>
    </div>
  );
}
