import "./globals.css";
import { Poppins } from "next/font/google";

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
      <body>{children}</body>
    </html>
  );
}
