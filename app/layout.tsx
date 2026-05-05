import type { Metadata } from "next";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.css";

export const metadata: Metadata = {
    title: "Modustry",
    icons: "/icon.jpg"
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className="h-full antialiased bg-(--background) text-(--color)"
        >
            <body className="min-h-full flex flex-col">{children}</body>
        </html>
    );
}
