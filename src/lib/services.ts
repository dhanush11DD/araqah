import type { Locale } from "./requests";

// Service wording comes from the client's "Araqah Company Services" document: `text` is word for word,
// and the "why" points are shortened from it, so nothing here claims more than the client stated.
// Change it here; the home page cards are in design/landing-*.dc.html.

export const SERVICE_SLUGS = ["recruitment", "leasing"] as const;
export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export function isServiceSlug(value: string): value is ServiceSlug {
  return (SERVICE_SLUGS as readonly string[]).includes(value);
}

export type WhyIcon = "shield" | "globe" | "document" | "support" | "sliders";

export type Service = {
  title: string;
  text: string;
  hero: { image: string; alt: string };
  why: {
    title: string;
    subtitle: string;
    image: string;
    alt: string;
    items: { icon: WhyIcon; title: string; text: string }[];
  };
};

export const SERVICES: Record<Locale, Record<ServiceSlug, Service>> = {
  en: {
    recruitment: {
      title: "Recruitment Services",
      text: "Araqah Recruitment Co. provides domestic worker recruitment services across a wide range of nationalities and professions, tailored to clients' needs and preferences. Through our network of authorized international recruitment partners, we ensure transparent procedures, continuous application follow-up, and dedicated customer support throughout the recruitment process.",
      hero: { image: "/images/elegant-living-room.jpg", alt: "An Araqah worker cleaning an elegant family living room" },
      why: {
        title: "Why choose Araqah for recruitment?",
        subtitle: "Transparent procedures and dedicated support throughout the recruitment process.",
        image: "/images/why-choose.jpg",
        alt: "A domestic worker cleaning a window with spray and cloth",
        items: [
          { icon: "shield", title: "Licensed by MHRSD", text: "A Saudi company licensed by the Ministry of Human Resources and Social Development under License No. 3701173." },
          { icon: "globe", title: "Authorized partners", text: "A network of authorized international recruitment partners, across a wide range of nationalities and professions." },
          { icon: "document", title: "Transparent procedures", text: "Clear procedures and continuous follow-up on your application." },
          { icon: "support", title: "Dedicated support", text: "Dedicated customer support throughout the recruitment process." },
        ],
      },
    },
    leasing: {
      title: "Domestic Worker Leasing Services",
      text: "Araqah Recruitment Co. offers flexible domestic worker leasing solutions designed to meet clients' varying needs. We provide convenient contractual options in accordance with applicable regulations, with a commitment to reliable service, continuous support, and customer satisfaction.",
      hero: { image: "/images/family-pool.jpg", alt: "A family welcomed by an Araqah worker serving tea beside a pool" },
      why: {
        title: "Why choose Araqah for domestic worker leasing?",
        subtitle: "Flexible leasing solutions with reliable service and continuous support.",
        image: "/images/why-choose.jpg",
        alt: "A domestic worker cleaning a window with spray and cloth",
        items: [
          { icon: "shield", title: "Licensed by MHRSD", text: "A Saudi company licensed by the Ministry of Human Resources and Social Development under License No. 3701173." },
          { icon: "sliders", title: "Flexible solutions", text: "Leasing solutions designed to meet clients' varying needs." },
          { icon: "document", title: "Convenient contracts", text: "Convenient contractual options in accordance with applicable regulations." },
          { icon: "support", title: "Continuous support", text: "Reliable service and continuous support, with a commitment to customer satisfaction." },
        ],
      },
    },
  },
  ar: {
    recruitment: {
      title: "خدمات الاستقدام",
      text: "نقدم في شركة عراقة للاستقدام خدمات استقدام العمالة المنزلية من مختلف الجنسيات والمهن المتاحة، وفقًا لاحتياجات العملاء وتفضيلاتهم، من خلال شبكة من مكاتب الاستقدام الخارجية المعتمدة، مع الحرص على وضوح الإجراءات ومتابعة الطلبات وتقديم الدعم للعملاء طوال رحلة الاستقدام.",
      hero: { image: "/images/elegant-living-room.jpg", alt: "عامل من عراقة ينظّف غرفة معيشة أنيقة للأسرة" },
      why: {
        title: "لماذا تختار شركة عراقة لخدمات الاستقدام؟",
        subtitle: "وضوح في الإجراءات ودعم للعملاء طوال رحلة الاستقدام.",
        image: "/images/why-choose.jpg",
        alt: "عاملة منزلية تنظّف نافذة بالبخاخ والقماش",
        items: [
          { icon: "shield", title: "مرخصة من الوزارة", text: "شركة سعودية مرخصة من وزارة الموارد البشرية والتنمية الاجتماعية بموجب الترخيص رقم (3701173)." },
          { icon: "globe", title: "مكاتب خارجية معتمدة", text: "شبكة من مكاتب الاستقدام الخارجية المعتمدة، من مختلف الجنسيات والمهن المتاحة." },
          { icon: "document", title: "إجراءات واضحة", text: "وضوح في الإجراءات ومتابعة مستمرة للطلبات." },
          { icon: "support", title: "دعم للعملاء", text: "تقديم الدعم للعملاء طوال رحلة الاستقدام." },
        ],
      },
    },
    leasing: {
      title: "خدمات التأجير",
      text: "نوفر في شركة عراقة للاستقدام حلول تأجير العمالة المنزلية بمرونة تتناسب مع احتياجات العملاء، من خلال خيارات تعاقدية متنوعة وفق الأنظمة واللوائح المعتمدة، مع الالتزام بتقديم خدمات موثوقة ومتابعة مستمرة لضمان جودة الخدمة ورضا العملاء.",
      hero: { image: "/images/family-pool.jpg", alt: "أسرة تستقبلها عاملة من عراقة تقدّم الشاي بجانب المسبح" },
      why: {
        title: "لماذا تختار شركة عراقة لتأجير العمالة المنزلية؟",
        subtitle: "حلول مرنة وخدمات موثوقة ومتابعة مستمرة.",
        image: "/images/why-choose.jpg",
        alt: "عاملة منزلية تنظّف نافذة بالبخاخ والقماش",
        items: [
          { icon: "shield", title: "مرخصة من الوزارة", text: "شركة سعودية مرخصة من وزارة الموارد البشرية والتنمية الاجتماعية بموجب الترخيص رقم (3701173)." },
          { icon: "sliders", title: "حلول مرنة", text: "حلول تأجير بمرونة تتناسب مع احتياجات العملاء." },
          { icon: "document", title: "خيارات تعاقدية متنوعة", text: "خيارات تعاقدية متنوعة وفق الأنظمة واللوائح المعتمدة." },
          { icon: "support", title: "متابعة مستمرة", text: "خدمات موثوقة ومتابعة مستمرة لضمان جودة الخدمة ورضا العملاء." },
        ],
      },
    },
  },
};
