import { Link } from "wouter";
import { Phone, MapPin, Mail, Instagram, Twitter, Facebook, MessageCircle } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

export function Footer() {
  const { t } = useApp();

  return (
    <>
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/201098277229"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Contact via WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      <footer className="bg-primary text-primary-foreground pt-16 pb-8 mt-0">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">{t("nav.clinicName")}</h3>
              <p className="text-primary-foreground/80 mb-6 leading-relaxed max-w-sm">{t("footer.about")}</p>
              <div className="flex items-center gap-4">
                <a href="#" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-secondary hover:text-secondary-foreground transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-secondary hover:text-secondary-foreground transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-secondary hover:text-secondary-foreground transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6">{t("footer.quickLinks")}</h4>
              <ul className="space-y-3">
                <li><Link href="/" className="hover:text-secondary transition-colors">{t("nav.home")}</Link></li>
                <li><Link href="/services" className="hover:text-secondary transition-colors">{t("footer.linkServices")}</Link></li>
                <li><Link href="/doctors" className="hover:text-secondary transition-colors">{t("footer.linkDoctors")}</Link></li>
                <li><Link href="/book" className="hover:text-secondary transition-colors">{t("footer.linkBook")}</Link></li>
                <li><Link href="/appointments" className="hover:text-secondary transition-colors">{t("footer.linkTrack")}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6">{t("footer.contact")}</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-secondary shrink-0 mt-1" />
                  <span style={{ whiteSpace: "pre-line" }}>{t("footer.address")}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-secondary shrink-0" />
                  <span dir="ltr">+201098277229</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-secondary shrink-0" />
                  <span>riadkassab320@gmail.com</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60 text-sm">
            <p>{t("footer.rights")} &copy; {new Date().getFullYear()} {t("footer.clinicName")}.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
