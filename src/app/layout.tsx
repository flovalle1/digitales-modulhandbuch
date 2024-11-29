import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from "@mui/material/styles";
import type { Metadata } from "next";
import "./globals.css";
import theme from "./theme";


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
    <html lang="de">
      <body
        style={{ backgroundColor: "#FFFFF1" }}
      >
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
