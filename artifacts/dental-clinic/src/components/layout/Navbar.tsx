import React from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, CalendarHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [location] = useLocation();
  const { lang, toggleLang, t } = useApp();

  const links = [
    { href: "/", label: t("nav.home") },
    { href: "/services", label: t("nav.services") },
    { href: "/doctors", label: t("nav.doctors") },
    { href: "/appointments", label: t("nav.appointments") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary text-primary-foreground p-2 rounded-xl group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="M12 2C8.68629 2 6 4.68629 6 8C6 11.3137 12 22 12 22C12 22 18 11.3137 18 8C18 4.68629 15.3137 2 12 2Z" />
              <path d="M12 11C12.5523 11 13 10.5523 13 10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10C11 10.5523 11.4477 11 12 11Z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold leading-none text-primary">{t("nav.clinicName")}</h1>
            <span className="text-xs text-muted-foreground font-medium">{t("nav.clinicSub")}</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-bold transition-colors hover:text-primary ${
                location === link.href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Toggle */}
          <LangToggle lang={lang} toggle={toggleLang} />

          <Button asChild className="rounded-full font-bold px-5 shadow-sm hover:shadow-md transition-all text-sm">
            <Link href="/book">
              <CalendarHeart className={`w-4 h-4 ${lang === "ar" ? "ml-2" : "mr-2"}`} />
              {t("nav.book")}
            </Link>
          </Button>
        </div>

        {/* Mobile right side */}
        <div className="md:hidden flex items-center gap-2">
          <LangToggle lang={lang} toggle={toggleLang} compact />
          <button
            className="p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden absolute top-20 left-0 w-full bg-background border-b shadow-lg py-4 px-4 flex flex-col gap-4"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-lg font-bold p-2 rounded-md ${
                  location === link.href ? "bg-primary/10 text-primary" : "text-foreground"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2 border-border" />
            <Button asChild className="w-full justify-center rounded-xl" size="lg">
              <Link href="/book" onClick={() => setIsOpen(false)}>
                {t("nav.book")}
              </Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function LangToggle({ lang, toggle, compact }: { lang: string; toggle: () => void; compact?: boolean }) {
  const isAR = lang === "ar";
  return (
    <button
      onClick={toggle}
      aria-label="Switch language"
      title={isAR ? "Switch to English" : "التبديل إلى العربية"}
      className={`relative flex items-center rounded-lg border-2 border-primary/20 bg-background hover:bg-primary/5 font-bold transition-all hover:border-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${compact ? "h-8 px-3 text-xs" : "h-9 px-4 text-sm"}`}
    >
      <span className={`transition-colors ${isAR ? "text-primary font-bold" : "text-muted-foreground"}`}>ع</span>
      <span className={`mx-2 text-muted-foreground`}>/</span>
      <span className={`transition-colors ${!isAR ? "text-primary font-bold" : "text-muted-foreground"}`}>EN</span>
    </button>
  );
}
