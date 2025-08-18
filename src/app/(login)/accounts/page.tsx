import { SessionsList } from "@/components/sessions-list";
import { Translated } from "@/components/translated";
import { getAllSessionCookieIds } from "@/lib/cookies";
import { getServiceUrlFromHeaders } from "@/lib/service-url";
import { listSessions } from "@/lib/zitadel";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { headers } from "next/headers";
import Link from "next/link";

async function loadSessions({ serviceUrl }: { serviceUrl: string }) {
  const cookieIds = await getAllSessionCookieIds();

  if (cookieIds && cookieIds.length) {
    const response = await listSessions({
      serviceUrl,
      ids: cookieIds.filter((id) => !!id) as string[],
    });
    console.log('response', response);
    return response?.sessions ?? [];
  } else {
    console.info("No session cookie found.");
    return [];
  }
}

export default async function Page(props: {
  searchParams: Promise<Record<string | number | symbol, string | undefined>>;
}) {
  const searchParams = await props.searchParams;

  const requestId = searchParams?.requestId;
  const organization = searchParams?.organization;

  const _headers = await headers();
  const { serviceUrl } = getServiceUrlFromHeaders(_headers);

  let sessions = await loadSessions({ serviceUrl });

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
        >
          <Translated i18nKey="title" namespace="accounts" />
        </h2>
        <p className="ztdl-p mb-6 block">
          <Translated i18nKey="description" namespace="accounts" />
        </p>

        <div className="flex flex-col w-full space-y-2">
          <SessionsList sessions={sessions} requestId={requestId} />
          <Link href={`/loginname?` + params}>
            <div className="flex flex-row items-center py-3 px-4 hover:bg-black/10 dark:hover:bg-white/10 rounded-md transition-all">
              <div className="w-8 h-8 mr-4 flex flex-row justify-center items-center rounded-full bg-black/5 dark:bg-white/5">
                <UserPlusIcon className="h-5 w-5" />
              </div>
              <span className="text-sm">
                <Translated i18nKey="addAnother" namespace="accounts" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
