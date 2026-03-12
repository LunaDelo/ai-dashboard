
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI自媒体目标看板",
  description: "任务看板跟踪AI自媒体成长",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gray-50">{children}</body>
    </html>
  );
}
