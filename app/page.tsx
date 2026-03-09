"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LuLoaderCircle } from "react-icons/lu";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/en");
  }, [router]);

  return <LuLoaderCircle style={{ transform: "rotate(90deg)" }} />;
}
