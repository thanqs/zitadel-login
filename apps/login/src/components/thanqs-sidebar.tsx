"use client";

import { usePathname } from "next/navigation";
import Ribbon from "public/icons/ribbon.svg"
import Flowers from "public/icons/flowers.svg"
import Present from "public/icons/present.svg"
import KeyIcon from 'public/icons/key.svg'
import ShieldIcon from 'public/icons/shield.svg'
import LockIcon from 'public/icons/lock.svg'
import CheckCircleIcon from 'public/icons/check-circle.svg'
import ShieldYellowIcon from 'public/icons/shield-yellow.svg'
import HorizontalDotsIcon from 'public/icons/horizontal-dots.svg'

import Image from "next/image";

export const ThanqsSidebar = () => {
  // const r = usePathname()
  //
  // if( r.startsWith('/password')) {
  //   return <LocksAndShieldsIllustration/>;
  // }
  return <GiftsAndPresentsIllustration/>;
}
const GiftsAndPresentsIllustration = () => (
  <>
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
  </>
);

const LocksAndShieldsIllustration = () => (
  <>
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
  </>
)

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
)
