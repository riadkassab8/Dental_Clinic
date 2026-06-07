import { useState } from "react";
import { motion } from "framer-motion";
import { useListAppointments } from "@workspace/api-client-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar as CalendarIcon, Clock, User, Stethoscope } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useApp } from "@/contexts/AppContext";

export default function Appointments() {
  const [phoneSearch, setPhoneSearch] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const { data: allAppointments, isLoading } = useListAppointments();
  const { t, lang } = useApp();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneSearch.trim()) {
      setHasSearched(true);
    }
  };

  const filteredAppointments = hasSearched
    ? allAppointments?.filter(a => a.patientPhone.includes(phoneSearch.trim()))
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
            className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CalendarIcon className="w-10 h-10 text-primary" />
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
                value={phoneSearch}
                onChange={(e) => setPhoneSearch(e.target.value)}
              />
            </div>
            <Button type="submit" className="h-14 px-8 rounded-xl font-bold text-lg">
              {t("appt.search")}
            </Button>
          </form>
        </motion.div>

        {hasSearched && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold border-b pb-4">{t("appt.results")}</h3>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2].map(i => <Skeleton key={i} className="h-40 rounded-2xl w-full" />)}
              </div>
            ) : filteredAppointments && filteredAppointments.length > 0 ? (
              <div className="space-y-4">
                {filteredAppointments.map(appointment => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-all flex flex-col md:flex-row justify-between gap-6"
                  >
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center gap-3">
                        <Badge className={`${getStatusColor(appointment.status)} font-bold px-3 py-1 text-sm`}>
                          {getStatusLabel(appointment.status)}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{t("appt.id")} #{appointment.id}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 text-foreground">
                          <User className="w-5 h-5 text-primary shrink-0" />
                          <span className="font-bold">{appointment.patientName}</span>
                        </div>
                        <div className="flex items-center gap-3 text-foreground">
                          <Stethoscope className="w-5 h-5 text-primary shrink-0" />
                          <span>{t("appt.service")} #{appointment.serviceId}</span>
                        </div>
                        <div className="flex items-center gap-3 text-foreground">
                          <CalendarIcon className="w-5 h-5 text-primary shrink-0" />
                          <span dir="ltr">{format(new Date(appointment.date), "dd MMMM yyyy", { locale: lang === "ar" ? ar : undefined })}</span>
                        </div>
                        <div className="flex items-center gap-3 text-foreground">
                          <Clock className="w-5 h-5 text-primary shrink-0" />
                          <span dir="ltr">{appointment.time}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
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
