"use client";

import { usePathname } from "next/navigation";
import ChampageIcon from "public/icons/champagne.svg";
import CheckCircleIcon from "public/icons/check-circle.svg";
import ChocolateIcon from "public/icons/chocolate.svg";
import Contacts from "public/icons/contacts.svg";
import Flowers from "public/icons/flowers.svg";
import GiftYellowPurpleIcon from "public/icons/gift-yellow-purple.svg";
import HorizontalDotsIcon from "public/icons/horizontal-dots.svg";
import KeyIcon from "public/icons/key.svg";
import Language from "public/icons/language.svg";
import LockIcon from "public/icons/lock.svg";
import Present from "public/icons/present.svg";
import Ribbon from "public/icons/ribbon.svg";
import ShieldYellowIcon from "public/icons/shield-yellow.svg";
import ShieldIcon from "public/icons/shield.svg";
import Tag from "public/icons/tag.svg";

import Image from "next/image";

export const ThanqsSidebar = () => {
  const r = usePathname();

  if (r.startsWith("/password")) {
    return <LocksAndShieldsIllustration />;
  }
  if (r.startsWith("/register")) {
    return <ChocolateAndChampangeIllustration />;
  }
  if (r.startsWith("/idp")) {
    return <ContactsAndLanguageIllustration />;
  }
  return <GiftsAndPresentsIllustration />;
};
export const GiftsAndPresentsIllustration = () => (
  <div
    style={{
      backgroundColor: "#ECE1F6",
      height: "100%",
      width: "100%",
    }}
    className="relative w-full  shrink-0 overflow-hidden rounded-[20px]"
  >
    <Image
      src={Ribbon}
      alt="Ribbon"
      width={403}
      height={403}
      className="absolute -top-20 -right-28 -rotate-12"
    />
    <Image
      src={Flowers}
      alt="Flowers"
      width={442}
      height={442}
      className="absolute top-[20%] -left-40 rotate-45"
    />
    <Image
      src={Present}
      alt="Present"
      width={483}
      height={483}
      className="absolute -right-16 -bottom-32 -rotate-[19deg]"
    />
  </div>
);

const LocksAndShieldsIllustration = () => (
  <div
    style={{
      backgroundColor: "#B7FAEA",
      height: "100%",
      width: "100%",
    }}
    className="relative w-full  shrink-0 overflow-hidden rounded-[20px]"
  >
    <Image
      src={ShieldIcon}
      alt="Shield"
      width={500}
      height={500}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    />
    <Image
      src={KeyIcon}
      alt="Key"
      width={400}
      height={400}
      className="absolute -top-12 -right-36"
    />
    <Image
      src={LockIcon}
      alt="Lock"
      width={400}
      height={400}
      className="absolute -bottom-24 -left-12 rotate-12"
    />
  </div>
);

const CheckAndDotsIllustration = () => (
  <>
    <Image
      src={ShieldYellowIcon}
      alt="Shield Yellow"
      width={500}
      height={500}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    />
    <Image
      src={CheckCircleIcon}
      alt="Check Circle"
      width={300}
      height={300}
      className="absolute top-[10%] -left-24"
    />
    <Image
      src={HorizontalDotsIcon}
      alt="Horizontal Dots"
      width={400}
      height={400}
      className="absolute -right-32 bottom-0"
    />
  </>
);

const ChocolateAndChampangeIllustration = () => (
  <div
    style={{
      backgroundColor: "#BAF9BB",
      height: "100%",
      width: "100%",
    }}
    className="relative w-full  shrink-0 overflow-hidden rounded-[20px]"
  >
    <Image
      src={ChampageIcon}
      alt="Champagne"
      width={403}
      height={403}
      className="absolute -top-2 -right-32 -rotate-8"
    />

    <Image
      src={ChocolateIcon}
      alt="Chocolate"
      width={442}
      height={442}
      className="absolute top-[10%] -left-36 rotate-40"
      style={{ rotate: "40deg" }}
    />

    <Image
      src={GiftYellowPurpleIcon}
      alt="Gift Yellow Purple"
      width={483}
      height={483}
      className="absolute -right-10 -bottom-28 -rotate-20"
      style={{
        rotate: "-20deg",
      }}
    />
  </div>
);

const ContactsAndLanguageIllustration = () => (
  <div
    style={{
      backgroundColor: "#C0FAFF",
      height: "100%",
      width: "100%",
    }}
    className="relative w-full  shrink-0 overflow-hidden rounded-[20px]"
  >
    <Image
      src={Contacts}
      alt="Contacts"
      width={350}
      height={350}
      className="absolute top-13 -left-186 -rotate-15"
    />

    <Image
      src={Tag}
      alt="Tag"
      width={350}
      height={350}
      className="absolute top-0 right-0"
    />

    <Image
      src={Language}
      alt="Language"
      width={350}
      height={350}
      className="absolute right-0 bottom-0"
    />
  </div>
);
