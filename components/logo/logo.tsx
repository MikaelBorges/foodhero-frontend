import logo from "@/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="max-w-[50%]">
      <Image alt="logo" src={logo} priority />
    </Link>
  );
}
