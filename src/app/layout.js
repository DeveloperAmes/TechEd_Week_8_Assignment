import "./globals.css";

export const metadata = {
  title:
    "Things You Probably Didn't Know About The Gender Data Gap and its Impacts on Women",
  description:
    "Blog site with articles on the impacts of women of the gender data gap",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
