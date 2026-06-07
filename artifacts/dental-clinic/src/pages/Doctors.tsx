import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CalendarHeart, Award } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useApp } from "@/contexts/AppContext";

const doctors = [
  {
    id: 1,
    nameAr: "د. أحمد محمد",
    nameEn: "Dr. Ahmed Mohamed",
    specialtyAr: "طب الأسنان العام",
    specialtyEn: "General Dentistry",
    experience: 15,
    bio: "طبيب أسنان ذو خبرة واسعة في علاج جميع مشاكل الأسنان مع التركيز على الرعاية الوقائية.",
    imageUrl: ""
  },
  {
    id: 2,
    nameAr: "د. سارة علي",
    nameEn: "Dr. Sarah Ali",
    specialtyAr: "تجميل الأسنان",
    specialtyEn: "Cosmetic Dentistry",
    experience: 12,
    bio: "متخصصة في تجميل الأسنان وابتسامة هوليود مع خبرة في تبييض الأسنان والفينير.",
    imageUrl: ""
  },
  {
    id: 3,
    nameAr: "د. محمود حسن",
    nameEn: "Dr. Mahmoud Hassan",
    specialtyAr: "زراعة الأسنان",
    specialtyEn: "Dental Implants",
    experience: 20,
    bio: "خبير في زراعة الأسنان وجراحة الفم مع سجل حافل من النجاحات.",
    imageUrl: ""
  }
];

export default function Doctors() {
  const { t, lang } = useApp();
  const isLoading = false;

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 }
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
            {t("doctors.pageTitle1")} <span className="text-primary">{t("doctors.pageTitle2")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            {t("doctors.pageDesc")}
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
          {doctors.map((doctor) => (
              <motion.div
                key={doctor.id}
                variants={item}
                className="bg-card border border-card-border rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 flex flex-col group"
              >
                <div className="h-48 bg-muted relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors"></div>
                  <Avatar className="w-32 h-32 border-4 border-white shadow-lg relative z-10">
                    <AvatarImage src={doctor.imageUrl || ""} alt={lang === "ar" ? doctor.nameAr : doctor.nameEn} />
                    <AvatarFallback className="text-4xl font-bold bg-primary text-primary-foreground">
                      {(lang === "ar" ? doctor.nameAr : doctor.nameEn).charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-1">{lang === "ar" ? doctor.nameAr : doctor.nameEn}</h3>
                    <p className="text-primary font-medium">{lang === "ar" ? doctor.specialtyAr : doctor.specialtyEn}</p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-secondary-foreground bg-secondary/10 px-4 py-2 rounded-lg font-bold mb-4 w-fit mx-auto">
                    <Award className="w-4 h-4 text-secondary shrink-0" />
                    <span>{doctor.experience} {t("doctors.experience")}</span>
                  </div>

                  <p className="text-muted-foreground mb-8 text-center flex-1 leading-relaxed">
                    {doctor.bio}
                  </p>

                  <Button asChild className="w-full rounded-xl mt-auto">
                    <Link href={`/book?doctor=${doctor.id}`}>
                      <CalendarHeart className="w-4 h-4 mx-2" />
                      {t("doctors.bookWith")}
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
      </div>
    </div>
  );
}
