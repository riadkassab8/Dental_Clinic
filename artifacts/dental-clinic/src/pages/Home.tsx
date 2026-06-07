import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CalendarHeart, CheckCircle2, Star, ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";

const services = [
  {
    id: 1,
    nameAr: "فحص الأسنان",
    nameEn: "Dental Checkup",
    descriptionAr: "فحص شامل لأسنانك للتأكد من صحتها واكتشاف أي مشاكل مبكراً.",
    descriptionEn: "Comprehensive dental checkup to ensure your oral health and detect issues early.",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8.68629 2 6 4.68629 6 8C6 11.3137 12 22 12 22C12 22 18 11.3137 18 8C18 4.68629 15.3137 2 12 2Z"/><path d="M12 11C12.5523 11 13 10.5523 13 10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10C11 10.5523 11.4477 11 12 11Z"/></svg>'
  },
  {
    id: 2,
    nameAr: "تبييض الأسنان",
    nameEn: "Teeth Whitening",
    descriptionAr: "خدمة تبييض الأسنان الاحترافية للحصول على ابتسامة مشرقة.",
    descriptionEn: "Professional teeth whitening service for a bright, beautiful smile.",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>'
  },
  {
    id: 3,
    nameAr: "حشو الأسنان",
    nameEn: "Dental Filling",
    descriptionAr: "حشو الأسنان لعلاج التسوس واستعادة وظيفة السن.",
    descriptionEn: "Dental filling to treat cavities and restore tooth function.",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h18v18H3z"/><path d="M9 9h6v6H9z"/></svg>'
  }
];

export default function Home() {
  const { t, lang, isRTL } = useApp();
  const loadingServices = false;

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-background pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <motion.div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`} initial="initial" animate="animate" variants={fadeInUp}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary-foreground text-sm font-bold mb-6">
              <Star className="w-4 h-4 fill-secondary text-secondary" />
              <span>{t("hero.badge")}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6 leading-tight">
              {t("hero.title1")} <span className="text-primary">{t("hero.title2")}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              {t("hero.desc")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-xl font-bold px-8 shadow-lg shadow-primary/20 text-lg h-14">
                <Link href="/book">
                  <CalendarHeart className={`w-5 h-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                  {t("hero.cta")}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl font-bold px-8 text-lg h-14 border-2">
                <Link href="/services">
                  {t("hero.explore")}
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div className="flex-1 w-full" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary/40 rounded-full transform rotate-12 opacity-20 blur-xl"></div>
              <div className="w-full h-full rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl bg-muted flex items-center justify-center relative">
                <div className="absolute inset-0 bg-primary/10"></div>
                <div className="text-center p-8 relative z-10">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2C8.68629 2 6 4.68629 6 8C6 11.3137 12 22 12 22C12 22 18 11.3137 18 8C18 4.68629 15.3137 2 12 2Z" />
                      <path d="M12 11C12.5523 11 13 10.5523 13 10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10C11 10.5523 11.4477 11 12 11Z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2">{t("hero.imageName")}</h3>
                  <p className="text-muted-foreground font-medium">{t("hero.imageSub")}</p>
                </div>
              </div>

              <div className={`absolute -bottom-6 ${isRTL ? "-right-6" : "-left-6"} bg-white dark:bg-card p-4 rounded-2xl shadow-xl flex items-center gap-4`}>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-bold">+5000</p>
                  <p className="font-bold text-foreground">{t("hero.patients")}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{t("services.sectionTitle")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t("services.sectionDesc")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 3).map((service, idx) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-card border border-card-border rounded-2xl p-8 hover:shadow-xl hover:border-primary/20 transition-all group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    <div className="text-3xl" dangerouslySetInnerHTML={{ __html: service.icon || '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8.68629 2 6 4.68629 6 8C6 11.3137 12 22 12 22C12 22 18 11.3137 18 8C18 4.68629 15.3137 2 12 2Z"/></svg>' }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{lang === "ar" ? service.nameAr : service.nameEn}</h3>
                  <p className="text-muted-foreground mb-6 line-clamp-2">{lang === "ar" ? service.descriptionAr : service.descriptionEn}</p>
                  <Link href="/services" className="text-primary font-bold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    {t("services.learnMore")}
                    <ArrowIcon className="w-4 h-4" />
                  </Link>
                </motion.div>
              ))}
            </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="rounded-xl">
              <Link href="/services">{t("services.viewAll")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">{t("cta.title")}</h2>
          <p className="text-primary-foreground/80 text-xl max-w-2xl mx-auto mb-10">{t("cta.desc")}</p>
          <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-white hover:text-primary rounded-xl font-bold px-10 h-16 text-xl shadow-xl transition-all">
            <Link href="/book">{t("cta.button")}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
