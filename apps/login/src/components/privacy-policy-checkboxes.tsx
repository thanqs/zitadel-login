"use client";
import { LegalAndSupportSettings } from "@zitadel/proto/zitadel/settings/v2/legal_settings_pb";
import Link from "next/link";
import { Translated } from "./translated";

type Props = {
  legal: LegalAndSupportSettings;
};


export function PrivacyPolicyCheckboxes({ legal }: Props) {
  return (
    <>
      <p className="items-center text-center text-text-light-secondary-500 dark:text-text-dark-secondary-500 mt-4 text-sm">
        <Translated i18nKey="agreeTo" namespace="register" />
        {legal?.helpLink && (
          <span>
            <Link href={legal.helpLink} target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="ml-1 w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
              </svg>
            </Link>
          </span>
        )}
        {legal?.tosLink && (
          <Link href={legal.tosLink} className="underline" target="_blank">
            <Translated i18nKey="termsOfService" namespace="register" />
          </Link>
        )}
        {legal?.tosLink && legal?.privacyPolicyLink && (
          <Translated i18nKey="and" namespace="register" />
        )}
        {legal?.privacyPolicyLink && (
          <Link
            href={legal.privacyPolicyLink}
            className="underline"
            target="_blank"
          >
            <Translated i18nKey="privacyPolicy" namespace="register" />
          </Link>
        )}
        .
      </p>
    </>
  );
}
