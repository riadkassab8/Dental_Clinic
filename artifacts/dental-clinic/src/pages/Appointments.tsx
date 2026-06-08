import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar as CalendarIcon, Clock, User, Stethoscope, CheckCircle2, XCircle, AlertCircle, Sparkles, X } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/contexts/AppContext";

const services = [
  { id: 1, nameAr: "فحص الأسنان", nameEn: "Dental Checkup", icon: "🦷" },
  { id: 2, nameAr: "تبييض الأسنان", nameEn: "Teeth Whitening", icon: "✨" },
  { id: 3, nameAr: "حشو الأسنان", nameEn: "Dental Filling", icon: "🔧" },
  { id: 4, nameAr: "خلع الأسنان", nameEn: "Tooth Extraction", icon: "🦷" },
  { id: 5, nameAr: "جذور الأسنان", nameEn: "Root Canal", icon: "🔬" },
  { id: 6, nameAr: "تقويم الأسنان", nameEn: "Orthodontics", icon: "😊" }
];

const doctors = [
  { id: 1, nameAr: "د. أحمد محمد", nameEn: "Dr. Ahmed Mohamed", specialtyAr: "طب الأسنان العام", specialtyEn: "General Dentistry" },
  { id: 2, nameAr: "د. سارة علي", nameEn: "Dr. Sarah Ali", specialtyAr: "تجميل الأسنان", specialtyEn: "Cosmetic Dentistry" },
  { id: 3, nameAr: "د. محمود حسن", nameEn: "Dr. Mahmoud Hassan", specialtyAr: "زراعة الأسنان", specialtyEn: "Dental Implants" }
];

const defaultAppointments = [
  {
    id: 1,
    patientName: "أحمد محمد",
    patientPhone: "0501234567",
    serviceId: 1,
    serviceIds: [1],
    doctorId: 1,
    date: "2024-12-15",
    time: "10:00",
    status: "confirmed"
  },
  {
    id: 2,
    patientName: "سارة علي",
    patientPhone: "0509876543",
    serviceId: 2,
    serviceIds: [2],
    doctorId: 2,
    date: "2024-12-16",
    time: "14:00",
    status: "pending"
  },
  {
    id: 3,
    patientName: "محمود حسن",
    patientPhone: "0505555555",
    serviceId: 3,
    serviceIds: [3],
    doctorId: 3,
    date: "2024-12-17",
    time: "09:00",
    status: "completed"
  }
];

export default function Appointments() {
  const [inputValue, setInputValue] = useState("");
  const [searchedPhone, setSearchedPhone] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [allAppointments, setAllAppointments] = useState(defaultAppointments);
  const isLoading = false;
  const { t, lang } = useApp();

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    setAllAppointments([...defaultAppointments, ...storedAppointments]);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchedPhone(inputValue.trim());
    setHasSearched(true);
  };

  const handleClearSearch = () => {
    setInputValue("");
    setSearchedPhone(null);
    setHasSearched(false);
  };

  const filteredAppointments = hasSearched && searchedPhone
    ? allAppointments?.filter(a => a.patientPhone.includes(searchedPhone))
    : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800";
      case "confirmed": return "bg-primary/20 text-primary border-primary/30 hover:bg-primary/30";
      case "completed": return "bg-green-100 text-green-800 border-green-200 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";
      case "cancelled": return "bg-red-100 text-red-800 border-red-200 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <AlertCircle className="w-4 h-4" />;
      case "confirmed": return <CheckCircle2 className="w-4 h-4" />;
      case "completed": return <CheckCircle2 className="w-4 h-4" />;
      case "cancelled": return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusLabel = (status: string) => {
    const map: Record<string, string> = {
      pending: t("appt.status.pending"),
      confirmed: t("appt.status.confirmed"),
      completed: t("appt.status.completed"),
      cancelled: t("appt.status.cancelled"),
    };
    return map[status] ?? status;
  };

  return (
    <div className="pt-20 pb-24 min-h-[80vh]">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20"
          >
            <Sparkles className="w-10 h-10 text-primary" />
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-black text-foreground mb-4">{t("appt.title")}</h1>
          <p className="text-muted-foreground text-lg">{t("appt.subtitle")}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border rounded-3xl p-8 shadow-sm mb-12"
        >
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className={`absolute ${lang === "ar" ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground`} />
              <Input
                type="text"
                placeholder={t("appt.placeholder")}
                className={`${lang === "ar" ? "pr-12 text-right" : "pl-12 text-left"} h-14 rounded-xl text-lg`}
                dir="ltr"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className={`absolute ${lang === "ar" ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground hover:text-foreground transition-colors`}
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <Button type="submit" className="h-14 px-8 rounded-xl font-bold text-lg">
              {t("appt.search")}
            </Button>
          </form>
        </motion.div>

        {hasSearched && (
          <div className="space-y-6">
            {filteredAppointments && filteredAppointments.length > 0 ? (
              <>
                <h3 className="text-2xl font-bold border-b pb-4">{t("appt.results")}</h3>
                <div className="space-y-6">
                  {filteredAppointments.map(appointment => {
                    // Handle both serviceId (old format) and serviceIds (new format)
                    const serviceId = appointment.serviceId || (appointment.serviceIds && appointment.serviceIds[0]);
                    const service = services.find(s => s.id === serviceId);
                    const doctor = doctors.find(d => d.id === appointment.doctorId);
                    const serviceNames = appointment.serviceIds
                      ? appointment.serviceIds.map(id => services.find(s => s.id === id))
                          .filter(Boolean)
                          .map(s => lang === "ar" ? s!.nameAr : s!.nameEn)
                      : [service ? (lang === "ar" ? service.nameAr : service.nameEn) : ""];

                    return (
                      <motion.div
                        key={appointment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-br from-card to-muted/30 border-2 border-primary/20 rounded-3xl p-8 hover:shadow-2xl hover:border-primary/40 transition-all duration-300"
                      >
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-border">
                          <div>
                            <h3 className="text-2xl font-bold text-foreground">
                              {serviceNames.length > 1
                                ? `${serviceNames.slice(0, 2).join("، ")}${serviceNames.length > 2 ? "..." : ""}`
                                : serviceNames[0] || "خدمة غير معروفة"
                              }
                            </h3>
                            <p className="text-muted-foreground">
                              {lang === "ar" ? doctor?.nameAr : doctor?.nameEn}
                            </p>
                          </div>
                          <Badge className={`${getStatusColor(appointment.status)} font-bold px-4 py-2 text-base flex items-center gap-2`}>
                            {getStatusIcon(appointment.status)}
                            {getStatusLabel(appointment.status)}
                          </Badge>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                          <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                            <div className="flex items-center gap-3 mb-2">
                              <CalendarIcon className="w-5 h-5 text-primary" />
                              <span className="text-sm text-muted-foreground">{t("book.success.date")}</span>
                            </div>
                            <p className="text-lg font-bold text-foreground" dir="ltr">
                              {format(new Date(appointment.date), "dd MMMM yyyy", { locale: lang === "ar" ? ar : undefined })}
                            </p>
                          </div>

                          <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                            <div className="flex items-center gap-3 mb-2">
                              <Clock className="w-5 h-5 text-primary" />
                              <span className="text-sm text-muted-foreground">{t("book.success.time")}</span>
                            </div>
                            <p className="text-lg font-bold text-foreground" dir="ltr">
                              {appointment.time}
                            </p>
                          </div>

                          <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                            <div className="flex items-center gap-3 mb-2">
                              <User className="w-5 h-5 text-primary" />
                              <span className="text-sm text-muted-foreground">{t("book.success.name")}</span>
                            </div>
                            <p className="text-lg font-bold text-foreground">
                              {appointment.patientName}
                            </p>
                          </div>

                          <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                            <div className="flex items-center gap-3 mb-2">
                              <Stethoscope className="w-5 h-5 text-primary" />
                              <span className="text-sm text-muted-foreground">{t("appt.id")}</span>
                            </div>
                            <p className="text-lg font-bold text-foreground" dir="ltr">
                              #{appointment.id}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="text-center py-16 bg-muted/30 rounded-2xl border border-dashed">
                <Search className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-foreground mb-2">{t("appt.empty.title")}</h4>
                <p className="text-muted-foreground">{t("appt.empty.desc")}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
