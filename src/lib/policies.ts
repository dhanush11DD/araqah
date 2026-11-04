import type { Locale } from "./requests";

// Policy wording exactly as the client supplied it ("Araqah Company Services" document).
// Change it here; the pages, footer links and sitemap pick it up.

export type PolicyBlock =
  | { type: "h2" | "h3" | "p"; text: string }
  | { type: "ul"; items: string[] };

export type Policy = { title: string; description: string; blocks: PolicyBlock[] };

const h2 = (text: string): PolicyBlock => ({ type: "h2", text });
const h3 = (text: string): PolicyBlock => ({ type: "h3", text });
const p = (text: string): PolicyBlock => ({ type: "p", text });
const ul = (...items: string[]): PolicyBlock => ({ type: "ul", items });

export const POLICY_SLUGS = ["privacy-policy", "terms-and-conditions", "refund-policy"] as const;
export type PolicySlug = (typeof POLICY_SLUGS)[number];

export function isPolicySlug(value: string): value is PolicySlug {
  return (POLICY_SLUGS as readonly string[]).includes(value);
}

export const POLICIES: Record<Locale, Record<PolicySlug, Policy>> = {
  en: {
    "privacy-policy": {
      title: "Privacy Policy",
      description: "How Araqah Recruitment Co. protects the privacy and confidentiality of its clients' personal information under the Saudi Personal Data Protection Law (PDPL).",
      blocks: [
        p("Araqah Recruitment Co. is committed to protecting the privacy and confidentiality of its clients' personal information in accordance with the Saudi Personal Data Protection Law (PDPL). Personal data is collected and used only for purposes related to recruitment and leasing services, contractual procedures, and legal requirements. Information is shared only with authorized parties and relevant service partners when necessary and in compliance with applicable regulations. Appropriate security measures are implemented to protect personal data against unauthorized access, disclosure, or misuse."),
      ],
    },
    "terms-and-conditions": {
      title: "Terms & Conditions",
      description: "The terms for domestic worker recruitment and leasing services from Araqah Recruitment Co., subject to contracts concluded through the Musaned platform.",
      blocks: [
        p("Araqah Recruitment Co. provides domestic worker recruitment and leasing services in accordance with the applicable laws and regulations of the Kingdom of Saudi Arabia. All recruitment services are subject to the terms and conditions of contracts concluded through the Musaned platform, including service fees, recruitment periods, guarantees, replacements, and refunds. Clients are required to provide accurate information and fulfill all legal and contractual obligations, while the rights of all parties remain protected under applicable regulations."),
      ],
    },
    "refund-policy": {
      title: "Replacement & Refund Policy",
      description: "The guarantee period, replacement and refund eligibility, procedures and exclusions for domestic workers recruited through Araqah Recruitment Co.",
      blocks: [
        p("Araqah Recruitment Co. is committed to providing recruitment services in accordance with the laws and regulations of the Ministry of Human Resources and Social Development (MHRSD) and the terms and conditions of recruitment contracts concluded through the Musaned platform, while ensuring the protection of the rights of both clients and domestic workers."),
        h2("Guarantee Period"),
        h3("Standard Recruitment (Excluding Musaned's Maarofa Service)"),
        p("Domestic workers recruited through standard recruitment services are covered by a guarantee period of ninety (90) days, subject to the terms and conditions of the recruitment contract approved through the Musaned platform. The guarantee period begins on the date specified in the applicable contract."),
        p("During this period, clients may request a replacement or a refund of eligible recruitment fees in cases covered by the contractual guarantee, in accordance with the applicable procedures and regulations."),
        h3("Recruitment Through Maarofa Service “Requested Worker”"),
        p("Musaned's Maarofa service does not include a guarantee or trial period for domestic workers who have been selected in advance by the client, in accordance with the applicable service terms."),
        p("Any potential claims or compensation shall be subject to the applicable contract, insurance policy (if any), and relevant laws and regulations."),
        h2("Replacement & Refund Eligibility"),
        p("Clients may request a replacement or a refund of eligible recruitment fees during the guarantee period in cases covered by the approved recruitment contract, including:"),
        ul(
          "Refusal by the domestic worker to perform assigned duties without a valid reason.",
          "Failure to pass the required medical examination or being declared medically unfit for work by an authorized medical provider.",
          "Lack of the professional skills or qualifications agreed upon in the recruitment contract.",
          "Any other circumstances covered by the guarantee provisions of the recruitment contract approved through Musaned.",
        ),
        h2("Replacement & Refund Procedures"),
        p("Clients must contact Araqah Recruitment Co. during the applicable guarantee period and provide details of the issue, along with any relevant supporting documents, where available."),
        p("The company will review the request, verify the circumstances, and take the necessary steps to process an eligible replacement or refund in accordance with the applicable contract terms and regulations, while safeguarding the rights of all parties."),
        h2("Refund of Recruitment Fees"),
        p("Eligible refunds shall be processed in accordance with the refund provisions and calculation methods specified in the recruitment contract approved through Musaned, taking into consideration the domestic worker's period of employment and the circumstances leading to contract termination."),
        h2("Exclusions from the Guarantee"),
        p("The guarantee shall not apply to cases where the employer is found to have violated contractual or legal obligations, or assigned the domestic worker duties outside the agreed profession, to the extent provided under the applicable contract and regulations."),
        h2("Complaints & Protection of Rights"),
        p("Araqah Recruitment Co. is committed to addressing client complaints and requests in accordance with the applicable procedures and regulations."),
        p("Clients have the right to submit complaints through the Musaned platform in the event of a dispute concerning replacement or refund requests, while all parties retain their legal and contractual rights."),
        p("This policy is governed by the recruitment contracts approved through Musaned and the applicable laws and regulations of the Kingdom of Saudi Arabia. In the event of any conflict, the mandatory legal and contractual provisions shall prevail."),
      ],
    },
  },
  ar: {
    "privacy-policy": {
      title: "سياسة الخصوصية",
      description: "كيف تحمي شركة عراقة للاستقدام بيانات العملاء الشخصية وتحافظ على سريتها وفق نظام حماية البيانات الشخصية في المملكة العربية السعودية.",
      blocks: [
        p("تلتزم شركة عراقة للاستقدام بحماية بيانات العملاء الشخصية والمحافظة على سريتها وفق نظام حماية البيانات الشخصية في المملكة العربية السعودية. وتُستخدم البيانات فقط للأغراض المتعلقة بتقديم خدمات الاستقدام والتأجير وإتمام الإجراءات التعاقدية والنظامية. ولا تتم مشاركة البيانات إلا مع الجهات المختصة والشركاء المعتمدين عند الحاجة وبما يتوافق مع الأنظمة المعمول بها، مع اتخاذ التدابير اللازمة لحمايتها من الوصول أو الاستخدام غير المصرح به."),
      ],
    },
    "terms-and-conditions": {
      title: "الشروط والأحكام",
      description: "شروط خدمات استقدام وتأجير العمالة المنزلية لدى شركة عراقة للاستقدام، وفق العقود المبرمة عبر منصة مساند.",
      blocks: [
        p("تقدم شركة عراقة للاستقدام خدمات استقدام وتأجير العمالة المنزلية وفق الأنظمة واللوائح المعتمدة في المملكة العربية السعودية. وتخضع جميع خدمات الاستقدام لشروط وأحكام العقود المبرمة عبر منصة مساند، بما في ذلك الرسوم والمدد والضمان والاستبدال والاسترجاع. ويلتزم العميل بتقديم بيانات صحيحة واستيفاء المتطلبات النظامية والتعاقدية، مع احتفاظ جميع الأطراف بحقوقهم وفق الأنظمة المعمول بها."),
      ],
    },
    "refund-policy": {
      title: "سياسة الاستبدال والاسترجاع",
      description: "فترة الضمان وحالات الاستبدال والاسترجاع وإجراءاتها والحالات غير المشمولة بالضمان لدى شركة عراقة للاستقدام.",
      blocks: [
        p("تلتزم شركة عراقة للاستقدام بتقديم خدمات الاستقدام وفق الأنظمة واللوائح المعتمدة من وزارة الموارد البشرية والتنمية الاجتماعية، وبما يتوافق مع شروط وأحكام العقود المبرمة عبر منصة مساند، مع الحرص على حفظ حقوق العملاء والعمالة المنزلية."),
        h2("فترة الضمان"),
        h3("الاستقدام العادي (غير خدمة معروفة)"),
        p("تخضع العمالة المنزلية المستقدمة لفترة ضمان مدتها (90) يومًا، وفقًا لشروط وأحكام عقد الاستقدام المعتمد عبر منصة مساند، وتبدأ من التاريخ المحدد في العقد."),
        p("يحق للعميل خلال فترة الضمان طلب الاستبدال أو استرداد المبالغ المستحقة في الحالات المشمولة بالضمان، وفق الإجراءات والضوابط المعتمدة."),
        h3("الاستقدام عبر خدمة معروفة"),
        p("لا تشمل خدمة «معروفة» فترة ضمان أو تجربة للعامل أو العاملة المختارة مسبقًا من قبل العميل، وذلك وفق شروط الخدمة المعتمدة في منصة مساند."),
        p("وتخضع أي مطالبات أو تعويضات محتملة لأحكام العقد ووثيقة التأمين المرتبطة به، إن وجدت، والأنظمة المعمول بها."),
        h2("حالات الاستبدال والاسترجاع"),
        p("يحق للعميل طلب الاستبدال أو استرداد تكاليف الاستقدام خلال فترة الضمان، وفقًا للحالات المشمولة في العقد المعتمد، ومنها:"),
        ul(
          "رفض العامل أو العاملة العمل أو الامتناع عن أداء المهام المتفق عليها دون سبب مشروع.",
          "عدم اجتياز الفحص الطبي أو ثبوت عدم اللياقة الصحية للعمل، وفق تقرير طبي معتمد.",
          "عدم توافر الكفاءة المهنية المطلوبة وفق الشروط والمواصفات المتفق عليها.",
          "الحالات الأخرى التي يثبت شمولها بالضمان وفق عقد الاستقدام المعتمد في منصة مساند.",
        ),
        h2("إجراءات الاستبدال والاسترجاع"),
        p("يلتزم العميل بالتواصل مع شركة عراقة للاستقدام خلال فترة الضمان، وتقديم تفاصيل الحالة والمستندات الداعمة إن وجدت."),
        p("تقوم الشركة بدراسة الطلب والتحقق من أسبابه، واتخاذ الإجراءات اللازمة للاستبدال أو الاسترجاع وفق أحكام العقد والأنظمة المعتمدة، مع مراعاة حقوق جميع الأطراف."),
        h2("استرداد المبالغ"),
        p("تتم إعادة المبالغ المستحقة للعميل وفق سياسة الاسترداد وآلية الاحتساب المحددة في عقد الاستقدام المعتمد عبر منصة مساند، مع مراعاة مدة عمل العامل أو العاملة والحالة التي ترتب عليها إنهاء العقد."),
        h2("الحالات غير المشمولة بالضمان"),
        p("لا يشمل الضمان الحالات التي يثبت فيها إخلال صاحب العمل بالتزاماته التعاقدية أو النظامية، أو تكليف العامل أو العاملة بمهام مخالفة للمهنة المتفق عليها، وذلك وفق ما تقرره أحكام العقد والجهات المختصة."),
        h2("الشكاوى وحفظ الحقوق"),
        p("تحرص شركة عراقة للاستقدام على معالجة طلبات العملاء وشكاواهم وفق الإجراءات النظامية، ويحق للعميل تقديم شكوى عبر منصة مساند في حال وجود خلاف يتعلق بالاستبدال أو الاسترجاع، مع احتفاظ جميع الأطراف بحقوقهم النظامية."),
        p("تخضع هذه السياسة لأحكام العقود المعتمدة عبر منصة مساند والأنظمة واللوائح السارية في المملكة العربية السعودية، وتُطبق الأحكام النظامية والتعاقدية الملزمة عند وجود أي تعارض."),
      ],
    },
  },
};
