"use client";
import React, { useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push("/");
  }, [router]);
  return (
    <Image
      onClick={handleClick}
      alt="Logo"
      className="
    hidden 
    md:block 
    cursor-pointer"
      height="100"
      width="100"
      src="/images/logo.png"
    />
  );
};

export default Logo;
