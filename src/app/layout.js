import { Overlock } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const mainFont = Overlock({
  subsets: ["latin"],
  weight: "400",
});

const boldFont = Overlock({
  subsets: ["latin"],
  weight: "700",
});

export const metadata = {
  title:
    "Things You Probably Didn't Know About The Gender Data Gap and its Impacts on Women",
  description:
    "Blog site with articles on the impacts of women of the gender data gap",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={mainFont.className}>
        <Header />
        {children}

        <Footer />
      </body>
    </html>
  );
}
