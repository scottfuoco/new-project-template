import "ui/src/global.css";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Starter Template",
  description: "My Starter Template",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US">
      <body>{children}</body>
    </html>
  );
}
