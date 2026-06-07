import { motion } from "framer-motion";
import { useListServices } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CalendarHeart, Clock } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

export default function Services() {
  const { data: services, isLoading } = useListServices();
  const { t, lang } = useApp();

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
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
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Skeleton key={i} className="h-72 rounded-3xl" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services?.map((service) => (
              <motion.div
                key={service.id}
                variants={item}
                className="bg-card border border-card-border rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 flex flex-col"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <div className="text-3xl" dangerouslySetInnerHTML={{ __html: service.icon || '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8.68629 2 6 4.68629 6 8C6 11.3137 12 22 12 22C12 22 18 11.3137 18 8C18 4.68629 15.3137 2 12 2Z"/></svg>' }} />
                </div>

                <h3 className="text-2xl font-bold mb-3">{lang === "ar" ? service.nameAr : service.nameEn}</h3>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 font-medium">
                  <Clock className="w-4 h-4 text-secondary shrink-0" />
                  <span>{t("services.duration")} {service.duration} {t("services.minutes")}</span>
                </div>

                <p className="text-muted-foreground mb-8 flex-1 leading-relaxed">
                  {lang === "ar" ? service.descriptionAr : service.descriptionEn}
                </p>

                <Button asChild variant="outline" className="w-full rounded-xl mt-auto">
                  <Link href={`/book?service=${service.id}`}>
                    <CalendarHeart className="w-4 h-4 mx-2" />
                    {t("services.bookService")}
                  </Link>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
