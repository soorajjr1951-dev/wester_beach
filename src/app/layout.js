import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollAnimate from "./hooks/useScrollReveal";

export const metadata = {
  title: "Western Beach Ventures",
  description:
    "Western Beach Restaurant, Rooms and Joy Ayurvedic Wellness Spa at Kovalam Beach",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
