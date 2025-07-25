import { Alert } from "@/components/alert";
import { DynamicTheme } from "@/components/dynamic-theme";
import { PasswordForm } from "@/components/password-form";
import { Translated } from "@/components/translated";
import { UserAvatar } from "@/components/user-avatar";
import { getServiceUrlFromHeaders } from "@/lib/service-url";
import { loadMostRecentSession } from "@/lib/session";
import {
  getBrandingSettings,
  getDefaultOrg,
  getLoginSettings,
} from "@/lib/zitadel";
import { Organization } from "@zitadel/proto/zitadel/org/v2/org_pb";
import { headers } from "next/headers";

export default async function Page(props: {
  searchParams: Promise<Record<string | number | symbol, string | undefined>>;
}) {
  const searchParams = await props.searchParams;
  let { loginName, organization, requestId, alt } = searchParams;

  const _headers = await headers();
  const { serviceUrl } = getServiceUrlFromHeaders(_headers);

  let defaultOrganization;
  if (!organization) {
    const org: Organization | null = await getDefaultOrg({
      serviceUrl,
    });

    if (org) {
      defaultOrganization = org.id;
    }
  }

  // also allow no session to be found (ignoreUnkownUsername)
  let sessionFactors;
  try {
    sessionFactors = await loadMostRecentSession({
      serviceUrl,
      sessionParams: {
        loginName,
        organization,
      },
    });
  } catch (error) {
    // ignore error to continue to show the password form
    console.warn(error);
  }

  const branding = await getBrandingSettings({
    serviceUrl,
    organization: organization ?? defaultOrganization,
  });
  const loginSettings = await getLoginSettings({
    serviceUrl,
    organization: organization ?? defaultOrganization,
  });

  return (
    <div className="m-auto w-full max-w-[330px] space-y-6 pb-10">
      <DynamicTheme branding={branding}>
        <div className="flex flex-col items-center space-y-4">
          <h1>
            {sessionFactors?.factors?.user?.displayName ?? (
              <Translated i18nKey="verify.title" namespace="password" />
            )}
          </h1>
          <p className="ztdl-p mb-6 block">
            <Translated i18nKey="verify.description" namespace="password" />
          </p>

          {/* show error only if usernames should be shown to be unknown */}
          {(!sessionFactors || !loginName) &&
            !loginSettings?.ignoreUnknownUsernames && (
              <div className="py-4">
                <Alert>
                  <Translated i18nKey="unknownContext" namespace="error" />
                </Alert>
              </div>
            )}

          {sessionFactors && (
            <UserAvatar
              loginName={loginName ?? sessionFactors.factors?.user?.loginName}
              displayName={sessionFactors.factors?.user?.displayName}
              showDropdown
              searchParams={searchParams}
            ></UserAvatar>
          )}

          {loginName && (
            <PasswordForm
              loginName={loginName}
              requestId={requestId}
              organization={organization} // stick to "organization" as we still want to do user discovery based on the searchParams not the default organization, later the organization is determined by the found user
              loginSettings={loginSettings}
            />
          )}
        </div>
      </DynamicTheme>
    </div>
  );
}
