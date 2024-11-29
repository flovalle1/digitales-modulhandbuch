import TopNavigation from '@/components/TopNavigation';
import { Stack } from "@mui/material";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Digitales Modulhandbuch",
  description: "Digitales Modulhandbuch Informatik Universität Tübingen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Stack>
      <TopNavigation />
      {children}
    </Stack>
  );
}
