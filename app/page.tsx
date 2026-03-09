"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LuLoaderCircle } from "react-icons/lu";
import "./globals.css";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/en");
  }, [router]);

  return (
    <html>
      <body>
        <LuLoaderCircle
          style={{
            transform: "rotate(90deg)",
            textAlign: "center",
            marginTop: "50%",
          }}
        />
      </body>
    </html>
  );
}
