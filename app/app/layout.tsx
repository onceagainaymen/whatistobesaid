import "./globals.css";
import HeadFrame from "../componenets/head_frame"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <HeadFrame></HeadFrame>
        {children}
      </body>
    </html>
  );
}
