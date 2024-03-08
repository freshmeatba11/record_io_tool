import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import DatePickersProvider from "@/lib/datePickers";
import StyledComponentsRegistry from "@/lib/registry";

import Body from "@/components/body";
import "./globals.css";
import RootModal from "@/components/modal/rootModal";

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
            <DatePickersProvider>
              <Toaster position="bottom-right" richColors />
              <RootModal>{children}</RootModal>
            </DatePickersProvider>
          </AppRouterCacheProvider>
        </Body>
      </StyledComponentsRegistry>
    </html>
  );
}
