// src/app/layout.js
// Root layout for the app. It wraps every page and imports global styles.
import "./globals.css";

export const metadata = {
  title: "Ace Jupeb Learning Portal",
  description: "A simple JUPEB learning portal to ace your learning journey.",
  icons: {
    icon: "/favicon.png", // 👈 This line makes it appear beside the site link
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
