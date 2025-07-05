"use client";

import React from "react";
import { ThemeProvider } from "@/components/custom/ThemeProvider";
import HomePage from "@/components/custom/home-page";

export default function Home() {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  );
}
