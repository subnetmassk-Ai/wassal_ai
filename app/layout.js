import "./globals.css";

export const metadata = {
  title: "WASSAL AI",
  description: "WASSAL AI Agent",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body>{children}</body>
    </html>
  );
}
