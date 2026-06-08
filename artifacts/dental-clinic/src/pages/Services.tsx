import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CalendarHeart, Clock, Check } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

const services = [
  {
    id: 1,
    nameAr: "فحص الأسنان",
    nameEn: "Dental Checkup",
    descriptionAr: "فحص شامل لأسنانك للتأكد من صحتها واكتشاف أي مشاكل مبكراً.",
    descriptionEn: "Comprehensive dental checkup to ensure your oral health and detect issues early.",
    duration: 30,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8.68629 2 6 4.68629 6 8C6 11.3137 12 22 12 22C12 22 18 11.3137 18 8C18 4.68629 15.3137 2 12 2Z"/><path d="M12 11C12.5523 11 13 10.5523 13 10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10C11 10.5523 11.4477 11 12 11Z"/></svg>'
  },
  {
    id: 2,
    nameAr: "تبييض الأسنان",
    nameEn: "Teeth Whitening",
    descriptionAr: "خدمة تبييض الأسنان الاحترافية للحصول على ابتسامة مشرقة.",
    descriptionEn: "Professional teeth whitening service for a bright, beautiful smile.",
    duration: 60,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>'
  },
  {
    id: 3,
    nameAr: "حشو الأسنان",
    nameEn: "Dental Filling",
    descriptionAr: "حشو الأسنان لعلاج التسوس واستعادة وظيفة السن.",
    descriptionEn: "Dental filling to treat cavities and restore tooth function.",
    duration: 45,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h18v18H3z"/><path d="M9 9h6v6H9z"/></svg>'
  },
  {
    id: 4,
    nameAr: "خلع الأسنان",
    nameEn: "Tooth Extraction",
    descriptionAr: "خلع الأسنان التالفة أو المشكلة بأقل ألم ممكن.",
    descriptionEn: "Extraction of damaged or problematic teeth with minimal discomfort.",
    duration: 30,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M8 8l4-4 4 4"/><path d="M8 16l4 4 4-4"/></svg>'
  },
  {
    id: 5,
    nameAr: "جذور الأسنان",
    nameEn: "Root Canal",
    descriptionAr: "علاج قناة الجذر لإنقاذ الأسنان التالفة بشدة.",
    descriptionEn: "Root canal treatment to save severely damaged teeth.",
    duration: 90,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a5 5 0 0 0-5 5v2a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z"/><path d="M12 14v8"/><path d="M8 17h8"/></svg>'
  },
  {
    id: 6,
    nameAr: "تقويم الأسنان",
    nameEn: "Orthodontics",
    descriptionAr: "تقويم الأسنان لتصحيح مشاكل العض والمظهر.",
    descriptionEn: "Orthodontics to correct bite issues and improve appearance.",
    duration: 45,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12c0-4 4-8 8-8s8 4 8 8"/><path d="M4 12c0 4 4 8 8 8s8-4 8-8"/><path d="M4 12h16"/></svg>'
  }
];

export default function Services() {
  const { t, lang } = useApp();
  const isLoading = false;
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const toggleService = (id: number) => {
    setSelectedServices(prev =>
      prev.includes(id)
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
  };

  const bookSelectedServices = () => {
    const serviceParams = selectedServices.map(id => `service=${id}`).join('&');
    window.location.href = `/book?${serviceParams}`;
  };

  return (
    <div className="pt-20 pb-24">
      {/* Header */}
      <div className="bg-primary/5 py-16 mb-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-foreground mb-4"
          >
            {t("services.pageTitle1")} <span className="text-primary">{t("services.pageTitle2")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            {t("services.pageDesc")}
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
              <motion.div
                key={service.id}
                variants={item}
                onClick={() => toggleService(service.id)}
                className={`bg-card border-2 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer ${
                  selectedServices.includes(service.id)
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-card-border hover:border-primary/30"
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  selectedServices.includes(service.id)
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/10 text-primary"
                }`}>
                  {selectedServices.includes(service.id) ? (
                    <Check className="w-8 h-8" />
                  ) : (
                    <div className="text-3xl" dangerouslySetInnerHTML={{ __html: service.icon || '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8.68629 2 6 4.68629 6 8C6 11.3137 12 22 12 22C12 22 18 11.3137 18 8C18 4.68629 15.3137 2 12 2Z"/></svg>' }} />
                  )}
                </div>

                <h3 className="text-2xl font-bold mb-3">{lang === "ar" ? service.nameAr : service.nameEn}</h3>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 font-medium">
                  <Clock className="w-4 h-4 text-secondary shrink-0" />
                  <span>{t("services.duration")} {service.duration} {t("services.minutes")}</span>
                </div>

                <p className="text-muted-foreground mb-8 flex-1 leading-relaxed">
                  {lang === "ar" ? service.descriptionAr : service.descriptionEn}
                </p>
              </motion.div>
            ))}
          </motion.div>
      </div>

      {/* Fixed Bottom Button */}
      {selectedServices.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <Button
            onClick={bookSelectedServices}
            className="rounded-full px-8 py-6 shadow-2xl font-bold text-lg"
            size="lg"
          >
            <CalendarHeart className="w-5 h-5 mx-2" />
            {t("services.bookSelected")} ({selectedServices.length})
          </Button>
        </motion.div>
      )}
    </div>
  );
}
