import type { Metadata } from "next";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.css";

const adsenseId = process.env.GOOGLE_ADSENSE_ID

export const metadata: Metadata = {
    title: "Modustry",
    icons: "/icon.jpg",
    ...(adsenseId && {
        other: {
            "google-adsense-account": adsenseId
        }
    })
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
