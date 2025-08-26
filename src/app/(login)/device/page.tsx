import { DeviceCodeForm } from "@/components/device-code-form";
import { Translated } from "@/components/translated";

export default async function Page(props: {
  searchParams: Promise<Record<string | number | symbol, string | undefined>>;
}) {
  const searchParams = await props.searchParams;

  const userCode = searchParams?.user_code;

  return (
    <div className="m-auto w-full max-w-[330px] space-y-6 pb-10">
      <div className="flex flex-col items-start space-y-4 gap-4">
        <h2
          style={{
            color: "hsl(250,100%,38%)",
          }}
        >
          <Translated i18nKey="usercode.title" namespace="device" />
        </h2>
        <p className="ztdl-p">
          <Translated i18nKey="usercode.description" namespace="device" />
        </p>
        <DeviceCodeForm userCode={userCode}></DeviceCodeForm>
      </div>
    </div>
  );
}
