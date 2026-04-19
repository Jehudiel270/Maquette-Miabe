"use client";

import React from "react";
import {
  Mail,
  Linkedin,
  Twitter,
  Github,
  Heart,
  Wallet,
  Shield,
  Zap,
} from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const navigationSections = [
    {
      title: "Tontine",
      links: [
        { label: "Créer une tontine", href: "/create-tontine" },
        { label: "Rejoindre", href: "/" },
        { label: "Dashboard", href: "/" },
        { label: "Historique", href: "/" },
      ],
    },
    {
      title: "À propos",
      links: [
        { label: "Comment ça marche", href: "#" },
        { label: "Sécurité Blockchain", href: "#" },
        { label: "Équipe", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Ressources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "Guide d'utilisation", href: "#" },
        { label: "FAQ", href: "#" },
        { label: "Support", href: "#" },
      ],
    },
  ];

  const legalLinks = [
    { label: "Conditions d'utilisation", href: "#" },
    { label: "Politique de confidentialité", href: "#" },
    { label: "Mentions légales", href: "#" },
    { label: "Cookies", href: "#" },
  ];

  const socialLinks = [
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Github, label: "GitHub", href: "#" },
    { icon: Mail, label: "Email", href: "mailto:contact@tontinechain.com" },
  ];

  const features = [
    {
      icon: Wallet,
      label: "Paiements sécurisés",
      description: "Sur blockchain",
    },
    {
      icon: Shield,
      label: "Transparence totale",
      description: "Tous les membres",
    },
    {
      icon: Zap,
      label: "Emprunts automatiques",
      description: "Mode strict activé",
    },
  ];

  return (
    <footer className="bg-gradient-to-t from-slate-900 to-slate-800 text-white border-t border-slate-700 mt-16">
      {/* Features Banner */}
      <div className="border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div key={feature.label} className="flex items-center gap-4">
                  <div className="bg-blue-600/20 p-3 rounded-lg">
                    <IconComponent className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">
                      {feature.label}
                    </h4>
                    <p className="text-slate-400 text-xs">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Logo & Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-12 border-b border-slate-700">
          {/* Logo Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                TontineChain
              </h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              La plateforme blockchain pour gérer vos tontines en toute
              transparence et sécurité. Cotisations garanties, distributions
              justes, communauté de confiance.
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-white mb-4">Restez informé</h3>
            <p className="text-slate-400 text-sm mb-4">
              Reçois les dernières mises à jour sur TontineChain
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="ton@email.com"
                className="flex-1 px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                S'inscrire
              </button>
            </form>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-12 border-b border-slate-700">
          {navigationSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-white mb-4 text-sm">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-blue-400 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="py-8">
          {/* Legal Links & Social */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap justify-center md:justify-start gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-slate-400 hover:text-white transition-colors text-xs"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 rounded-lg bg-slate-700 hover:bg-blue-600 text-slate-400 hover:text-white transition-all"
                  >
                    <IconComponent className="w-4 h-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-slate-700 text-center">
            <p className="text-slate-400 text-xs flex items-center justify-center gap-1">
              © {currentYear} TontineChain. Construit avec{" "}
              <Heart className="w-3 h-3 text-red-500 fill-red-500" /> pour les
              communautés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
