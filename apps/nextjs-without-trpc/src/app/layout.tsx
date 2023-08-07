import "ui/src/global.css";
import { Button } from "ui";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US">
      <body>
        <Button>Top G</Button>
        {children}
      </body>
    </html>
  );
}
