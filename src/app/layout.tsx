import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import StyledComponentsRegistry from "@/lib/registry";
import DatePickersProvider from "@/lib/datePickers";

import Body from "@/components/body";
import "./globals.css";

const inter = Inter({ weight: ["100", "400", "500"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Record I/O Tool",
  description: "攝入/輸出記錄表",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant-TW">
      <StyledComponentsRegistry>
        <Body className={inter.className}>
          <AppRouterCacheProvider>
            <DatePickersProvider>{children}</DatePickersProvider>
          </AppRouterCacheProvider>
        </Body>
      </StyledComponentsRegistry>
    </html>
  );
}
