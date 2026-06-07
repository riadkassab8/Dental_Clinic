import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";
export type Lang = "ar" | "en";

interface AppContextValue {
  theme: Theme;
  lang: Lang;
  toggleTheme: () => void;
  toggleLang: () => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

const translations: Record<string, Record<Lang, string>> = {
  "nav.home": { ar: "الرئيسية", en: "Home" },
  "nav.services": { ar: "خدماتنا", en: "Services" },
  "nav.doctors": { ar: "أطباؤنا", en: "Doctors" },
  "nav.appointments": { ar: "مواعيدي", en: "My Appointments" },
  "nav.book": { ar: "احجز موعدك الآن", en: "Book Now" },
  "nav.clinicName": { ar: "عيادة د. أحمد سالم", en: "Dr. Ahmed Salem Clinic" },
  "nav.clinicSub": { ar: "لطب وتجميل الأسنان", en: "Dental & Aesthetic Care" },

  "hero.badge": { ar: "أفضل رعاية لأسنانك في الرياض", en: "Best Dental Care in Riyadh" },
  "hero.title1": { ar: "ابتسامتك هي", en: "Your Smile is" },
  "hero.title2": { ar: "عملنا", en: "Our Business" },
  "hero.desc": {
    ar: "نقدم لك في عيادة د. أحمد سالم تجربة علاجية فريدة تجمع بين أدق التقنيات الطبية وأقصى درجات الراحة والعناية. لأنك تستحق ابتسامة تثق بها.",
    en: "At Dr. Ahmed Salem Clinic, we provide a unique treatment experience combining the most precise medical technologies with the highest levels of comfort and care. Because you deserve a smile you can trust."
  },
  "hero.cta": { ar: "احجز موعدك الآن", en: "Book Your Appointment" },
  "hero.explore": { ar: "اكتشف خدماتنا", en: "Explore Our Services" },
  "hero.imageName": { ar: "ابتسامة مثالية", en: "Perfect Smile" },
  "hero.imageSub": { ar: "رعاية فائقة لأسنانك", en: "Superior Dental Care" },
  "hero.patients": { ar: "مريض سعيد", en: "Happy Patients" },

  "services.sectionTitle": { ar: "خدماتنا الطبية", en: "Our Medical Services" },
  "services.sectionDesc": {
    ar: "نوفر لك مجموعة شاملة من علاجات الأسنان التجميلية والعلاجية، باستخدام أحدث التقنيات وأفضل المواد.",
    en: "We provide a comprehensive range of cosmetic and therapeutic dental treatments using the latest technologies and finest materials."
  },
  "services.learnMore": { ar: "اعرف المزيد", en: "Learn More" },
  "services.viewAll": { ar: "عرض جميع الخدمات", en: "View All Services" },
  "services.pageTitle1": { ar: "الخدمات", en: "Our" },
  "services.pageTitle2": { ar: "الطبية", en: "Services" },
  "services.pageDesc": {
    ar: "نقدم مجموعة متكاملة من علاجات الأسنان باستخدام أحدث التقنيات لضمان حصولك على أفضل رعاية ممكنة لابتسامتك.",
    en: "We offer a comprehensive range of dental treatments using the latest technologies to ensure you receive the best possible care for your smile."
  },
  "services.duration": { ar: "المدة التقريبية:", en: "Duration:" },
  "services.minutes": { ar: "دقيقة", en: "min" },
  "services.bookService": { ar: "احجز لهذه الخدمة", en: "Book This Service" },

  "doctors.pageTitle1": { ar: "نخبة من", en: "Our Expert" },
  "doctors.pageTitle2": { ar: "الأطباء", en: "Doctors" },
  "doctors.pageDesc": {
    ar: "يضم فريقنا الطبي أمهر الأطباء والاستشاريين بخبرات عالمية لضمان تقديم أفضل خطط العلاج التي تناسب حالتك.",
    en: "Our medical team includes the most skilled doctors and consultants with international expertise to ensure the best treatment plans tailored to your needs."
  },
  "doctors.experience": { ar: "سنوات من الخبرة", en: "years of experience" },
  "doctors.bookWith": { ar: "احجز مع الطبيب", en: "Book with Doctor" },

  "cta.title": { ar: "هل أنت مستعد لابتسامتك الجديدة؟", en: "Ready for Your New Smile?" },
  "cta.desc": {
    ar: "احجز موعدك اليوم بخطوات بسيطة وسريعة. نرحب بك في عيادتنا لنمنحك العناية التي تستحقها.",
    en: "Book your appointment today in simple, quick steps. We welcome you to our clinic to give you the care you deserve."
  },
  "cta.button": { ar: "احجز موعدك الآن", en: "Book Now" },

  "book.title": { ar: "احجز موعدك", en: "Book Your Appointment" },
  "book.subtitle": { ar: "خطوات بسيطة تفصلك عن ابتسامتك المثالية", en: "Simple steps to your perfect smile" },
  "book.step1": { ar: "الخدمة", en: "Service" },
  "book.step2": { ar: "الطبيب", en: "Doctor" },
  "book.step3": { ar: "الموعد", en: "Schedule" },
  "book.step4": { ar: "بياناتك", en: "Your Info" },
  "book.step1.title": { ar: "ما هي الخدمة التي تحتاجها؟", en: "Which service do you need?" },
  "book.step2.title": { ar: "اختر طبيبك المفضل", en: "Choose your preferred doctor" },
  "book.step2.any": { ar: "أي طبيب متاح", en: "Any Available Doctor" },
  "book.step2.anySub": { ar: "سنقوم باختيار أقرب موعد متاح لك", en: "We'll select the earliest available appointment for you" },
  "book.step3.title": { ar: "حدد الموعد المناسب لك", en: "Choose your appointment time" },
  "book.step3.date": { ar: "التاريخ", en: "Date" },
  "book.step3.time": { ar: "الوقت المتاح", en: "Available Times" },
  "book.step3.noSlots": { ar: "لا توجد مواعيد متاحة في هذا اليوم.", en: "No available slots on this day." },
  "book.step3.tryAnother": { ar: "يرجى اختيار يوم آخر.", en: "Please choose another day." },
  "book.step4.title": { ar: "بياناتك الشخصية", en: "Your Personal Information" },
  "book.step4.name": { ar: "الاسم الكامل", en: "Full Name" },
  "book.step4.namePlaceholder": { ar: "أدخل اسمك الكامل", en: "Enter your full name" },
  "book.step4.phone": { ar: "رقم الهاتف", en: "Phone Number" },
  "book.step4.email": { ar: "البريد الإلكتروني (اختياري)", en: "Email Address (optional)" },
  "book.step4.notes": { ar: "ملاحظات أو تفاصيل إضافية (اختياري)", en: "Notes or additional details (optional)" },
  "book.step4.notesPlaceholder": {
    ar: "أي تفاصيل تود إخبار الطبيب بها قبل الموعد...",
    en: "Any details you'd like the doctor to know before the appointment..."
  },
  "book.next": { ar: "التالي", en: "Next" },
  "book.back": { ar: "السابق", en: "Back" },
  "book.confirm": { ar: "تأكيد الحجز النهائي", en: "Confirm Booking" },
  "book.confirming": { ar: "جاري تأكيد الحجز...", en: "Confirming booking..." },
  "book.selectService": { ar: "يرجى اختيار الخدمة أولاً", en: "Please select a service first" },
  "book.selectDoctor": { ar: "يرجى اختيار الطبيب أولاً", en: "Please select a doctor first" },
  "book.selectDateTime": { ar: "يرجى تحديد التاريخ والوقت", en: "Please select a date and time" },
  "book.fillRequired": { ar: "يرجى إكمال البيانات الأساسية", en: "Please fill in all required fields" },
  "book.errorMsg": { ar: "حدث خطأ أثناء الحجز. يرجى المحاولة مرة أخرى.", en: "An error occurred. Please try again." },
  "book.success.title": { ar: "تم تأكيد حجزك!", en: "Booking Confirmed!" },
  "book.success.desc": {
    ar: "تم استلام طلبك بنجاح. سنتواصل معك قريباً لتأكيد الموعد النهائي.",
    en: "Your request has been received successfully. We'll contact you soon to confirm your final appointment."
  },
  "book.success.summary": { ar: "ملخص الحجز:", en: "Booking Summary:" },
  "book.success.date": { ar: "التاريخ:", en: "Date:" },
  "book.success.time": { ar: "الوقت:", en: "Time:" },
  "book.success.name": { ar: "الاسم:", en: "Name:" },
  "book.success.phone": { ar: "الهاتف:", en: "Phone:" },
  "book.success.home": { ar: "العودة للرئيسية", en: "Back to Home" },

  "appt.title": { ar: "مواعيدي", en: "My Appointments" },
  "appt.subtitle": {
    ar: "أدخل رقم هاتفك للبحث عن مواعيدك السابقة والقادمة",
    en: "Enter your phone number to search for your past and upcoming appointments"
  },
  "appt.placeholder": { ar: "رقم الهاتف (مثال: 0500000000)", en: "Phone number (e.g. 0500000000)" },
  "appt.search": { ar: "بحث", en: "Search" },
  "appt.results": { ar: "نتائج البحث", en: "Search Results" },
  "appt.id": { ar: "رقم الموعد:", en: "Appointment #" },
  "appt.service": { ar: "الخدمة:", en: "Service:" },
  "appt.empty.title": { ar: "لا توجد مواعيد", en: "No Appointments Found" },
  "appt.empty.desc": {
    ar: "لم نتمكن من العثور على أي مواعيد مرتبطة برقم الهاتف هذا.",
    en: "We couldn't find any appointments associated with this phone number."
  },
  "appt.status.pending": { ar: "قيد المراجعة", en: "Pending" },
  "appt.status.confirmed": { ar: "مؤكد", en: "Confirmed" },
  "appt.status.completed": { ar: "مكتمل", en: "Completed" },
  "appt.status.cancelled": { ar: "ملغى", en: "Cancelled" },

  "footer.about": {
    ar: "نقدم رعاية أسنان استثنائية تجمع بين التكنولوجيا المتقدمة واللمسة الإنسانية الدافئة، لنضمن لك ابتسامة صحية وجميلة تدوم.",
    en: "We provide exceptional dental care combining advanced technology with a warm human touch, ensuring you a healthy and beautiful smile that lasts."
  },
  "footer.quickLinks": { ar: "روابط سريعة", en: "Quick Links" },
  "footer.contact": { ar: "معلومات التواصل", en: "Contact Information" },
  "footer.linkServices": { ar: "خدماتنا الطبية", en: "Our Services" },
  "footer.linkDoctors": { ar: "أطباؤنا الخبراء", en: "Expert Doctors" },
  "footer.linkBook": { ar: "احجز موعداً", en: "Book Appointment" },
  "footer.linkTrack": { ar: "تتبع موعدك", en: "Track Appointment" },
  "footer.address": {
    ar: "الرياض، حي العليا، شارع الملك فهد\nالمملكة العربية السعودية",
    en: "Riyadh, Al-Olaya District, King Fahd Road\nSaudi Arabia"
  },
  "footer.rights": { ar: "جميع الحقوق محفوظة", en: "All rights reserved" },
  "footer.clinicName": { ar: "عيادة د. أحمد سالم لطب الأسنان", en: "Dr. Ahmed Salem Dental Clinic" },
};

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("clinic-theme");
    return (stored as Theme) || "light";
  });

  const [lang, setLang] = useState<Lang>(() => {
    const stored = localStorage.getItem("clinic-lang");
    return (stored as Lang) || "ar";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("clinic-theme", theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    root.setAttribute("lang", lang === "ar" ? "ar" : "en");
    localStorage.setItem("clinic-lang", lang);
  }, [lang]);

  const toggleTheme = () => setTheme(t => t === "light" ? "dark" : "light");
  const toggleLang = () => setLang(l => l === "ar" ? "en" : "ar");

  const t = (key: string): string => {
    return translations[key]?.[lang] ?? key;
  };

  return (
    <AppContext.Provider value={{ theme, lang, toggleTheme, toggleLang, t, isRTL: lang === "ar" }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppContextProvider");
  return ctx;
}
