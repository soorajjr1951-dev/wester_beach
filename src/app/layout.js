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
