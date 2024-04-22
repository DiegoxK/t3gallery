import { ClerkProvider } from "@clerk/nextjs";
import "~/styles/globals.css";

import { Inter as FontSans } from "next/font/google";

import { cn } from "~/lib/utils";
import NavBar from "./_components/nav-bar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "T3 Gallery",
  description: "Gallery",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body
          className={cn(
            "dark min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
          )}
        >
          <NavBar />
          <div className="container my-2">{children}</div>
        </body>
      </ClerkProvider>
    </html>
  );
}
