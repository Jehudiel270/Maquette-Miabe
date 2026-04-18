import { useState, useEffect } from "react";
import { Menu, X, Globe, Moon, Sun } from "lucide-react";
import Button from "./Button";

type Language = "fr" | "en";
type Theme = "light" | "night";

interface NavItem {
  fr: string;
  en: string;
  href: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme") || "light") as Theme;
  });
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem("language") || "fr") as Language;
  });

  // Apply theme on mount
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Toggle theme and persist preference
  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "night" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Persist language preference
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const navItems: NavItem[] = [
    { fr: "Accueil", en: "Home", href: "#" },
    { fr: "Fonctionnalités", en: "Features", href: "#features" },
    { fr: "Tarifs", en: "Pricing", href: "#pricing" },
    { fr: "Blog", en: "Blog", href: "#blog" },
  ];

  const getText = (fr: string, en: string) => (language === "fr" ? fr : en);

  return (
    <nav className="navbar bg-base-100 shadow-md sticky top-0 z-50">
      <div className="flex-1">
        {/* Logo */}
        <a
          href="#"
          className="btn btn-ghost text-xl md:text-2xl font-bold gap-2"
        >
          <span className="text-primary">Learn</span>
          <span className="text-secondary">Up</span>
        </a>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-2">
        {/* Nav Items */}
        <div className="flex gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="btn btn-ghost btn-md text-base-content/80 hover:text-primary transition-colors no-underline"
            >
              {getText(item.fr, item.en)}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="divider divider-horizontal mx-1 h-6"></div>

        {/* Auth Buttons */}
        <a href="#" className="btn btn-ghost btn-md">
          {getText("Se connecter", "Sign In")}
        </a>
        <Button className="btn-md">
          {getText("S&apos;inscrire", "Sign Up")}
        </Button>

        {/* Theme Toggle */}
        <button
          onClick={handleThemeToggle}
          className="btn btn-ghost btn-circle btn-md"
          aria-label={getText("Basculer le thème", "Toggle theme")}
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* Language Toggle */}
        <div className="dropdown dropdown-end">
          <button
            tabIndex={0}
            className="btn btn-ghost btn-circle btn-md flex items-center gap-1"
            aria-label={getText("Changer la langue", "Change language")}
          >
            <Globe size={20} />
            <span className="text-xs font-bold uppercase">{language}</span>
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box w-32 border border-base-300"
          >
            <li>
              <button
                onClick={() => handleLanguageChange("fr")}
                className={language === "fr" ? "active" : ""}
              >
                🇫🇷 Français
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLanguageChange("en")}
                className={language === "en" ? "active" : ""}
              >
                🇬🇧 English
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex gap-2 items-center">
        {/* Theme Toggle */}
        <button
          onClick={handleThemeToggle}
          className="btn btn-ghost btn-circle btn-sm"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* Language Toggle */}
        <div className="dropdown dropdown-end">
          <button
            tabIndex={0}
            className="btn btn-ghost btn-circle btn-sm text-xs font-bold"
          >
            {language.toUpperCase()}
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box w-32 border border-base-300"
          >
            <li>
              <button
                onClick={() => handleLanguageChange("fr")}
                className={language === "fr" ? "active" : ""}
              >
                🇫🇷 FR
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLanguageChange("en")}
                className={language === "en" ? "active" : ""}
              >
                🇬🇧 EN
              </button>
            </li>
          </ul>
        </div>

        {/* Hamburger Menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn btn-ghost btn-circle btn-sm"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-base-100 border-b border-base-300 shadow-lg">
          <div className="p-4 space-y-3">
            {/* Nav Items */}
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-2 px-4 rounded hover:bg-base-200 transition-colors text-base-content/80 hover:text-primary no-underline"
                onClick={() => setIsOpen(false)}
              >
                {getText(item.fr, item.en)}
              </a>
            ))}

            {/* Divider */}
            <div className="divider my-2"></div>

            {/* Auth Buttons */}
            <a
              href="#"
              className="block py-2 px-4 rounded hover:bg-base-200 transition-colors text-base-content/80"
              onClick={() => setIsOpen(false)}
            >
              {getText("Se connecter", "Sign In")}
            </a>
            <button className="w-full btn btn-primary btn-sm">
              {getText("S'inscrire", "Sign Up")}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
