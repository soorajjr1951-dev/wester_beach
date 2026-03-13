import "./globals.css";
import { Poppins } from "next/font/google";

import { SpeedInsights } from "@vercel/speed-insights/next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.westernbeachventures.com"),
  title: {
    default: "Western Beach Ventures",
    template: "%s | Western Beach Ventures",
  },
  description:
    "Luxury beach resort in Kerala offering premium rooms, ayurvedic spa, and dining.",
  keywords: [
    "Kerala beach resort",
    "Kovalam resort",
    "luxury rooms Kerala",
    "Ayurvedic spa Kovalam",
    "beachfront hotel Kerala",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Western Beach Ventures",
    description:
      "Luxury beach resort in Kerala offering premium rooms, ayurvedic spa, and dining.",
    url: "https://www.westernbeachventures.com/",
    siteName: "Western Beach Ventures",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://cms.westernbeachventures.com/uploads/aerial_view_sea_by_mountain_jpg_8ba3ee1603.jpeg",
        width: 1200,
        height: 630,
        alt: "Western Beach Ventures – Kerala Beach Resort",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@westernbeachresort",
    title: "Western Beach Ventures",
    description:
      "Luxury beach resort in Kerala offering premium rooms, ayurvedic spa, and dining.",
    images: [
      "https://cms.westernbeachventures.com/uploads/aerial_view_sea_by_mountain_jpg_8ba3ee1603.jpeg",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
themeColor: "#ffffff",
width: "device-width",
initialScale: 1,
};

export default function RootLayout({ children }) {
return (
<html lang="en" className={`${poppins.variable}`}>
<head>
<script
async
src="https://www.googletagmanager.com/gtag/js?id=G-TP1Q4ZYSJN"
strategy="afterInteractive"
></script>
<script id="google-analytics" strategy="afterInteractive">
{`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);} 
gtag('js', new Date());

gtag('config', 'G-TP1Q4ZYSJN');
`}
</script>
</head>
<body>
{children}
<SpeedInsights />
</body>
</html>
);
}
