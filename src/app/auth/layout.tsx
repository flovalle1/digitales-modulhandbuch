import TopNavigation from '@/components/TopNavigation';
import { ThemeProvider } from "@mui/material";
import type { Metadata } from "next";
import theme from '../theme';


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
    <body
      style={{ backgroundColor: "#FFFFF1" }}
    >
      <ThemeProvider theme={theme}>
        <TopNavigation />
        {children}
      </ThemeProvider>
    </body>
  );
}
