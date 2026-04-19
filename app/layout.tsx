import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "TontineChain - Gestion de Tontine Blockchain",
  description:
    "TontineChain : La plateforme blockchain sécurisée pour gérer vos tontines. Cotisations garanties, distributions justes, transparence totale. Rejoignez votre communauté financière dès maintenant.",
  keywords: [
    "tontine",
    "blockchain",
    "finance",
    "communauté",
    "paiements",
    "sécurité",
    "transparent",
    "FCFA",
  ],
  authors: [{ name: "TontineChain Team", url: "https://tontinechain.com" }],
  creator: "TontineChain",
  publisher: "TontineChain",
  icons: {
    icon: "/animations/favicon.svg",
    shortcut: "/animations/favicon.svg",
    apple: "/animations/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://tontinechain.com",
    title: "TontineChain - Gestion de Tontine Blockchain",
    description:
      "La plateforme blockchain pour gérer vos tontines en toute transparence et sécurité.",
    siteName: "TontineChain",
  },
  twitter: {
    card: "summary_large_image",
    title: "TontineChain - Gestion de Tontine Blockchain",
    description:
      "La plateforme blockchain pour gérer vos tontines en toute transparence et sécurité.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/animations/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/animations/favicon.svg" />
      </head>
      <body className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
