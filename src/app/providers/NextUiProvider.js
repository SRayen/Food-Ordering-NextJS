"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
export function Providers({ children }) {
  return (
    <SessionProvider>
      <NextUIProvider>
        {children}
        <Toaster position="top-center" reverseOrder={false} />
      </NextUIProvider>
    </SessionProvider>
  );
}

//RQ: SessionProvider should be in a client side component
