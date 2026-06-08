import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { Check, ChevronRight, ChevronLeft, User, Stethoscope, Calendar as CalendarIcon, Clock, ClipboardEdit, Loader2, PartyPopper, ChevronDown, ChevronUp } from "lucide-react";
import { useLocation } from "wouter";
import { useApp } from "@/contexts/AppContext";

// Arabic day abbreviations starting from Sunday (rightmost in RTL)
const arabicDays = ["ح", "إث", "ث", "أر", "خ", "ج", "س"];
// English day abbreviations starting from Sunday (leftmost in LTR)
const englishDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const services = [
  {
    id: 1,
    nameAr: "فحص الأسنان",
    nameEn: "Dental Checkup",
    duration: 30,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8.68629 2 6 4.68629 6 8C6 11.3137 12 22 12 22C12 22 18 11.3137 18 8C18 4.68629 15.3137 2 12 2Z"/><path d="M12 11C12.5523 11 13 10.5523 13 10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10C11 10.5523 11.4477 11 12 11Z"/></svg>'
  },
  {
    id: 2,
    nameAr: "تبييض الأسنان",
    nameEn: "Teeth Whitening",
    duration: 60,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>'
  },
  {
    id: 3,
    nameAr: "حشو الأسنان",
    nameEn: "Dental Filling",
    duration: 45,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h18v18H3z"/><path d="M9 9h6v6H9z"/></svg>'
  },
  {
    id: 4,
    nameAr: "خلع الأسنان",
    nameEn: "Tooth Extraction",
    duration: 30,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M8 8l4-4 4 4"/><path d="M8 16l4 4 4-4"/></svg>'
  },
  {
    id: 5,
    nameAr: "جذور الأسنان",
    nameEn: "Root Canal",
    duration: 90,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a5 5 0 0 0-5 5v2a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z"/><path d="M12 14v8"/><path d="M8 17h8"/></svg>'
  },
  {
    id: 6,
    nameAr: "تقويم الأسنان",
    nameEn: "Orthodontics",
    duration: 45,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12c0-4 4-8 8-8s8 4 8 8"/><path d="M4 12c0 4 4 8 8 8s8-4 8-8"/><path d="M4 12h16"/></svg>'
  }
];

const doctors = [
  {
    id: 1,
    nameAr: "د. أحمد محمد",
    nameEn: "Dr. Ahmed Mohamed",
    specialtyAr: "طب الأسنان العام",
    specialtyEn: "General Dentistry"
  },
  {
    id: 2,
    nameAr: "د. سارة علي",
    nameEn: "Dr. Sarah Ali",
    specialtyAr: "تجميل الأسنان",
    specialtyEn: "Cosmetic Dentistry"
  },
  {
    id: 3,
    nameAr: "د. محمود حسن",
    nameEn: "Dr. Mahmoud Hassan",
    specialtyAr: "زراعة الأسنان",
    specialtyEn: "Dental Implants"
  }
];

const getAvailableSlots = () => [
  { time: "09:00", available: true },
  { time: "10:00", available: true },
  { time: "11:00", available: false },
  { time: "12:00", available: true },
  { time: "13:00", available: true },
  { time: "14:00", available: false },
  { time: "15:00", available: true },
  { time: "16:00", available: true },
  { time: "17:00", available: true }
];

export default function Book() {
  const [location, setLocation] = useLocation();
  const { t, lang, isRTL } = useApp();

  const [searchParams, setSearchParams] = useState(new URLSearchParams(window.location.search));

  useEffect(() => {
    setSearchParams(new URLSearchParams(window.location.search));
  }, [location]);

  const preselectedServiceIds = searchParams.getAll("service").map(s => parseInt(s)).filter(id => !isNaN(id));
  const preselectedDoctorId = searchParams.get("doctor") ? parseInt(searchParams.get("doctor")!) : null;

  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    serviceIds: preselectedServiceIds.length > 0 ? preselectedServiceIds : [],
    doctorId: preselectedDoctorId || 0,
    date: new Date(),
    time: "",
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    notes: ""
  });

  const loadingServices = false;
  const loadingDoctors = false;
  const loadingSlots = false;
  const slots = getAvailableSlots();
  const isPending = false;
  const [bookingComplete, setBookingComplete] = useState(false);

  const formattedDate = format(formData.date, "yyyy-MM-dd");

  const steps = [
    { id: 1, title: t("book.step1"), icon: Stethoscope },
    { id: 2, title: t("book.step2"), icon: User },
    { id: 3, title: t("book.step3"), icon: CalendarIcon },
    { id: 4, title: t("book.step4"), icon: ClipboardEdit }
  ];

  const handleNext = () => {
    if (step === 1 && formData.serviceIds.length === 0) {
      toast({ title: t("book.selectService"), variant: "destructive" });
      return;
    }
    if (step === 2 && formData.doctorId === undefined || formData.doctorId === null) {
      toast({ title: t("book.selectDoctor"), variant: "destructive" });
      return;
    }
    if (step === 3 && (!formData.date || !formData.time)) {
      toast({ title: t("book.selectDateTime"), variant: "destructive" });
      return;
    }
    if (step === 4) {
      if (!formData.patientName || !formData.patientPhone) {
        toast({ title: t("book.fillRequired"), variant: "destructive" });
        return;
      }
      submitBooking();
      return;
    }
    setStep(s => s + 1);
  };

  const handleBack = () => {
    setStep(s => Math.max(1, s - 1));
  };

  const submitBooking = () => {
    // Simulate API call
    setTimeout(() => {
      // Save appointment to localStorage
      const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      const maxId = existingAppointments.length > 0 ? Math.max(...existingAppointments.map((a: any) => a.id)) : 0;
      const newAppointment = {
        id: maxId + 1,
        patientName: formData.patientName,
        patientPhone: formData.patientPhone,
        serviceIds: formData.serviceIds,
        doctorId: formData.doctorId,
        date: formattedDate,
        time: formData.time,
        status: "pending"
      };

      localStorage.setItem('appointments', JSON.stringify([...existingAppointments, newAppointment]));

      setBookingComplete(true);
    }, 1000);
  };

  const ChevronNext = isRTL ? ChevronLeft : ChevronRight;

  if (bookingComplete) {
    return (
      <div className="pt-24 pb-32 min-h-[80vh] flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card border-2 border-primary/20 p-10 rounded-[2rem] max-w-md w-full mx-4 text-center shadow-2xl"
        >
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <PartyPopper className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-black text-foreground mb-4">{t("book.success.title")}</h2>
          <p className="text-muted-foreground mb-8 text-lg">{t("book.success.desc")}</p>

          <div className={`bg-muted p-6 rounded-2xl ${isRTL ? "text-right" : "text-left"} mb-8`}>
            <h4 className="font-bold text-foreground mb-4">{t("book.success.summary")}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">{t("book.success.date")}</span>
                <span className="font-bold" dir="ltr">{format(formData.date, "dd MMMM yyyy", { locale: lang === "ar" ? ar : undefined })}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">{t("book.success.time")}</span>
                <span className="font-bold" dir="ltr">{formData.time}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">{t("book.success.name")}</span>
                <span className="font-bold">{formData.patientName}</span>
              </li>
              <li className="flex justify-between pb-2">
                <span className="text-muted-foreground">{t("book.success.phone")}</span>
                <span className="font-bold" dir="ltr">{formData.patientPhone}</span>
              </li>
            </ul>
          </div>

          <Button onClick={() => setLocation("/")} className="w-full rounded-xl h-12 font-bold">
            {t("book.success.home")}
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-32">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-foreground mb-4">{t("book.title")}</h1>
          <p className="text-muted-foreground">{t("book.subtitle")}</p>
        </div>

        {/* Stepper */}
        <div className="mb-12 relative">
          <div className="absolute top-6 left-0 right-0 h-1 bg-muted -translate-y-1/2 z-0 rounded-full hidden sm:block"></div>
          <div
            className="absolute top-6 h-1 bg-primary -translate-y-1/2 z-0 rounded-full transition-all duration-500 hidden sm:block"
            style={{
              width: `${((step - 1) / 3) * 100}%`,
              [isRTL ? "right" : "left"]: 0
            }}
          ></div>

          <div className="flex justify-between relative z-10">
            {steps.map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-2">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-4 transition-colors duration-300 ${
                    step === s.id
                      ? "bg-primary border-primary/30 text-primary-foreground shadow-lg shadow-primary/20"
                      : step > s.id
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-background border-muted text-muted-foreground"
                  }`}
                >
                  {step > s.id ? <Check className="w-6 h-6" /> : <s.icon className="w-5 h-5" />}
                </div>
                <span className={`text-sm font-bold ${step >= s.id ? "text-primary" : "text-muted-foreground"} hidden sm:block`}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Area */}
        <div className="bg-card border shadow-sm rounded-3xl p-6 md:p-10 min-h-[400px]">
          <AnimatePresence mode="wait">

            {/* Step 1: Services */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold mb-6">{t("book.step1.title")}</h3>
                {loadingServices ? (
                  <div className="flex items-center justify-center h-48">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {services?.map(service => (
                      <button
                        key={service.id}
                        onClick={() => {
                          setFormData(p => ({
                            ...p,
                            serviceIds: p.serviceIds.includes(service.id)
                              ? p.serviceIds.filter(id => id !== service.id)
                              : [...p.serviceIds, service.id]
                          }));
                        }}
                        className={`${isRTL ? "text-right" : "text-left"} p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                          formData.serviceIds.includes(service.id)
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-border hover:border-primary/40 hover:bg-muted/50"
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${formData.serviceIds.includes(service.id) ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                          {formData.serviceIds.includes(service.id) ? (
                            <Check className="w-6 h-6" />
                          ) : (
                            <div className="text-2xl" dangerouslySetInnerHTML={{ __html: service.icon || '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8.68629 2 6 4.68629 6 8C6 11.3137 12 22 12 22C12 22 18 11.3137 18 8C18 4.68629 15.3137 2 12 2Z"/></svg>' }} />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-lg">{lang === "ar" ? service.nameAr : service.nameEn}</p>
                          <p className="text-sm text-muted-foreground">{service.duration} {t("services.minutes")}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 2: Doctors */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold mb-6">{t("book.step2.title")}</h3>
                <div className="mb-6">
                  <button
                    onClick={() => setFormData(p => ({ ...p, doctorId: 0 }))}
                    className={`w-full ${isRTL ? "text-right" : "text-left"} p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                      formData.doctorId === 0
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border hover:border-primary/40 hover:bg-muted/50"
                    }`}
                  >
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <User className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">{t("book.step2.any")}</p>
                      <p className="text-sm text-muted-foreground">{t("book.step2.anySub")}</p>
                    </div>
                  </button>
                </div>
                {loadingDoctors ? (
                  <div className="flex items-center justify-center h-48">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {doctors?.map(doctor => (
                      <button
                        key={doctor.id}
                        onClick={() => setFormData(p => ({ ...p, doctorId: doctor.id }))}
                        className={`${isRTL ? "text-right" : "text-left"} p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                          formData.doctorId === doctor.id
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-border hover:border-primary/40 hover:bg-muted/50"
                        }`}
                      >
                        <div className="w-16 h-16 rounded-full bg-muted overflow-hidden shrink-0 flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary">
                            {(lang === "ar" ? doctor.nameAr : doctor.nameEn).charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-bold text-lg">{lang === "ar" ? doctor.nameAr : doctor.nameEn}</p>
                          <p className="text-sm text-muted-foreground">{lang === "ar" ? doctor.specialtyAr : doctor.specialtyEn}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 3: Date and Time */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold mb-6">{t("book.step3.title")}</h3>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="border-2 border-primary/20 rounded-3xl p-6 bg-gradient-to-br from-primary/5 to-muted/20 shadow-lg">
                    <Label className="mb-6 block text-xl font-bold text-primary">{t("book.step3.date")}</Label>
                    <div className="bg-card rounded-2xl p-4 shadow-inner border border-border text-center box-border" dir={isRTL ? "rtl" : "ltr"}>
                      <style>{`
                        [dir="rtl"] .rdp-nav_button_previous {
          transform: rotate(180deg);
        }
        [dir="rtl"] .rdp-nav_button_next {
          transform: rotate(180deg);
        }
        [dir="ltr"] .rdp-nav_button_previous svg {
          transform: scaleX(-1);
        }
        .rdp-grid {
          grid-template-columns: repeat(7, 1fr) !important;
          width: 100% !important;
          box-sizing: border-box !important;
          user-select: none !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
        }
        .rdp-head_cell {
          text-align: center !important;
          width: calc(100% / 7) !important;
          box-sizing: border-box !important;
          user-select: none !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
        }
        .rdp-day {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: calc(100% / 7) !important;
          box-sizing: border-box !important;
          aspect-ratio: 1 !important;
          cursor: pointer !important;
          user-select: none !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
        }
        .rdp-day:hover {
          cursor: pointer !important;
        }
        .rdp-day_selected {
          cursor: pointer !important;
        }
        .rdp-day.rdp-day_button[data-selected-single="true"] {
          width: 28px !important;
          height: 28px !important;
          min-width: 28px !important;
          max-width: 28px !important;
          border-radius: 50% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          aspect-ratio: 1 !important;
        }
        .rdp-day.rdp-day_button[data-selected-single="true"] span {
          font-size: 16px !important;
        }
        .rdp-months {
          width: 100% !important;
          box-sizing: border-box !important;
          user-select: none !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
        }
        .rdp-month_caption {
          text-align: center !important;
        }
        .rdp {
          width: 100% !important;
          box-sizing: border-box !important;
          user-select: none !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
        }
      `}</style>
                      <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={(date) => {
                          if (date) {
                            setFormData(p => ({ ...p, date, time: "" }));
                          }
                        }}
                        locale={lang === "ar" ? ar : enUS}
                        weekStartsOn={0}
                        className="mx-auto w-full box-border [&_.rdp]:text-base [&_.rdp]:w-full [&_.rdp-day]:text-lg [&_.rdp-head_cell]:text-base [&_.rdp-head_cell]:font-bold [&_.rdp-nav_button]:h-10 [&_.rdp-nav_button]:w-10 [&_.rdp-button]:h-12 [&_.rdp-button]:text-lg [&_.rdp-button]:font-bold [&_.rdp-months]:w-full [&_.rdp-months]:box-border [&_.rdp-months]:grid [&_.rdp-grid]:grid-cols-7 [&_.rdp-grid]:w-full"
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        formatters={{
                          formatWeekdayName: (date) => lang === "ar" ? arabicDays[date.getDay()] : englishDays[date.getDay()],
                          formatMonthCaption: (date) => format(date, "MMMM yyyy", { locale: lang === "ar" ? ar : enUS })
                        }}
                      />
                    </div>
                  </div>

                  <div className="border rounded-2xl p-4 bg-muted/10 flex flex-col">
                    <Label className="mb-4 block text-lg font-bold">{t("book.step3.time")}</Label>

                    {loadingSlots ? (
                      <div className="flex-1 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                      </div>
                    ) : slots && slots.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {slots.map((slot, idx) => (
                          <button
                            key={idx}
                            disabled={!slot.available}
                            onClick={() => setFormData(p => ({ ...p, time: slot.time }))}
                            className={`p-3 rounded-xl border font-bold text-sm transition-all flex items-center justify-center gap-2 select-none cursor-pointer ${
                              !slot.available
                                ? "bg-muted text-muted-foreground opacity-50 cursor-not-allowed border-transparent"
                                : formData.time === slot.time
                                  ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                                  : "bg-card hover:border-primary hover:text-primary"
                            }`}
                            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
                          >
                            <Clock className="w-4 h-4 shrink-0" />
                            <span dir="ltr">{slot.time}</span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
                        <CalendarIcon className="w-12 h-12 mb-4 opacity-20" />
                        <p>{t("book.step3.noSlots")}</p>
                        <p className="text-sm mt-2">{t("book.step3.tryAnother")}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Patient Info */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold mb-6">{t("book.step4.title")}</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base">
                      {t("book.step4.name")} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder={t("book.step4.namePlaceholder")}
                      value={formData.patientName}
                      onChange={e => setFormData(p => ({ ...p, patientName: e.target.value }))}
                      className="h-12 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base">
                      {t("book.step4.phone")} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      placeholder="05X XXX XXXX"
                      dir="ltr"
                      className={`${isRTL ? "text-right" : "text-left"} h-12 rounded-xl`}
                      value={formData.patientPhone}
                      onChange={e => setFormData(p => ({ ...p, patientPhone: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email" className="text-base">{t("book.step4.email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@domain.com"
                      dir="ltr"
                      className={`${isRTL ? "text-right" : "text-left"} h-12 rounded-xl`}
                      value={formData.patientEmail}
                      onChange={e => setFormData(p => ({ ...p, patientEmail: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="notes" className="text-base">{t("book.step4.notes")}</Label>
                    <Textarea
                      id="notes"
                      placeholder={t("book.step4.notesPlaceholder")}
                      className="min-h-[120px] rounded-xl resize-none"
                      value={formData.notes}
                      onChange={e => setFormData(p => ({ ...p, notes: e.target.value }))}
                    />
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between items-center border-t pt-8">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={step === 1 || isPending}
            className="rounded-xl px-6"
          >
            {t("book.back")}
          </Button>

          <Button
            onClick={handleNext}
            disabled={isPending}
            className="rounded-xl px-8 h-12 font-bold shadow-md"
          >
            {isPending ? (
              <>
                <Loader2 className={`w-5 h-5 animate-spin ${isRTL ? "ml-2" : "mr-2"}`} />
                {t("book.confirming")}
              </>
            ) : step === 4 ? (
              t("book.confirm")
            ) : (
              <>
                {t("book.next")}
                <ChevronNext className={`w-5 h-5 ${isRTL ? "mr-2" : "ml-2"}`} />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
