import { redirect, RedirectType } from "next/navigation";

export default async function Page(props: {
  searchParams: Promise<Record<string | number | symbol, string | undefined>>;
  params: Promise<{ provider: string }>;
}) {
  const searchParams = await props.searchParams;
  let { redirectURL } = searchParams;


  if (!redirectURL) {
    redirectURL = "/loginname";
  }
  await new Promise((resolve) => setTimeout(resolve, 500));
  redirect(redirectURL, RedirectType.replace)

}