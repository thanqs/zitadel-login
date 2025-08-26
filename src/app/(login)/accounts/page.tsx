import { SessionsList } from "@/components/sessions-list";
import { Translated } from "@/components/translated";
import { getAllSessionCookieIds } from "@/lib/cookies";
import { getServiceUrlFromHeaders } from "@/lib/service-url";
import { listSessions } from "@/lib/zitadel";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

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

  if(sessions.length === 0) {
    redirect(`/loginname?` + params.toString());
  }

  return (
    <div className="m-auto w-full max-w-[330px] space-y-6">
      <div className="flex flex-col items-start gap-6">
        <h2
          className="text-brand-blue"
        >
          <Translated i18nKey="title" namespace="accounts" />
        </h2>
        <p className="text-neutral-700">
          <Translated i18nKey="description" namespace="accounts" />
        </p>

        <SessionsList sessions={sessions} requestId={requestId} />

        <Link href={`/loginname?` + params}>
          <div className="flex items-center gap-2 py-3 px-4 justify-center w-full grow hover:bg-neutral-50 transition-all border rounded-full">
            <UserPlusIcon className="size-5" />
            <span>
              <Translated i18nKey="addAnother" namespace="accounts" />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
