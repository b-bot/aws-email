"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <Toaster />
      {children}
    </NextUIProvider>
  );
}
