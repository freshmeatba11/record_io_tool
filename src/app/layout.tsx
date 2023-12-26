import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import StyledComponentsRegistry from "@/lib/registry";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            {children}
          </AppRouterCacheProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
