import "@/app/ui/global.css";

import { displayFont } from "@/app/ui/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${displayFont.className} antialiased`}>{children}</body>
    </html>
  );
}
