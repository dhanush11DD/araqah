// Generated from design/landing-ar.dc.html by scripts/convert-design.py. Do not edit by hand:
// change the design file and run `npm run convert-design`.
"use client";

import Image from "next/image";
import type { LandingBindings } from "./types";

export default function LandingAr({ b }: { b: LandingBindings }) {
  return (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", color: "#141414", background: "#FAF7F0", minWidth: "0" }}>{" "}
      <header style={{ position: "sticky", top: "0", zIndex: "20", background: "rgba(250,247,240,0.94)", backdropFilter: "blur(10px)", borderBottom: "1px solid #E4DCCB" }} className="site-header" data-menu={b.menuOpen ? "open" : "closed"} onClick={b.onHeaderClick}>{" "}
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px", boxSizing: "border-box", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px 28px", minHeight: "80px", paddingTop: "10px", paddingBottom: "10px" }} className="site-bar">{" "}
          <a href="#top" aria-label="عراقة للاستقدام، الصفحة الرئيسية" style={{ display: "flex", alignItems: "center" }}>
            <Image alt="عراقة" style={{ height: "46px", width: "auto", display: "block" }} src="/images/araqah-logo.png" width={128} height={46} priority /></a>
          <button type="button" className="site-menu-btn" aria-expanded={b.menuOpen} aria-controls="site-nav" aria-label={b.menuLabel} onClick={b.toggleMenu} style={{ alignItems: "center", justifyContent: "center", width: "44px", height: "44px", padding: "0", borderRadius: "10px", border: "1.5px solid #141414", background: "transparent", color: "#141414", cursor: "pointer" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {b.menuOpen ? <path d="M6 6l12 12M18 6L6 18"></path> : <path d="M4 7h16M4 12h16M4 17h16"></path>}
            </svg>
          </button>{" "}
          <nav aria-label="القائمة الرئيسية" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 24px", fontSize: "14px", fontWeight: "600" }} className="site-nav" id="site-nav">{" "}
            <a href="#top" style={{ color: "#141414", textDecoration: "none", padding: "8px 0", boxShadow: "inset 0 -2px 0 #F5C518" }}>{"الرئيسية"}</a>{" "}
            <a href="#about" style={{ color: "#141414", textDecoration: "none", padding: "8px 0" }}>{"من نحن"}</a>{" "}
            <a href="#services" style={{ color: "#141414", textDecoration: "none", padding: "8px 0" }}>{"خدماتنا"}</a>{" "}
            <a href="#track" style={{ color: "#141414", textDecoration: "none", padding: "8px 0" }}>{"تتبّع الطلب"}</a>{" "}
            <a href="#faq" style={{ color: "#141414", textDecoration: "none", padding: "8px 0" }}>{"الأسئلة الشائعة"}</a>{" "}
            <a href="#contact" style={{ color: "#141414", textDecoration: "none", padding: "8px 0" }}>{"تواصل معنا"}</a>{" "}</nav>{" "}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px" }} className="site-actions">{" "}
            <a href={b.altLocaleHref} lang="en" style={{ fontFamily: "'Manrope', sans-serif", fontSize: "15px", fontWeight: "700", color: "#141414", textDecoration: "none", padding: "8px 4px" }}>{"English"}</a>{" "}
            <a href="tel:0112662266" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: "700", color: "#141414", textDecoration: "none", padding: "8px 0" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 3.5h3.5l2 5-2.4 1.5a11 11 0 0 0 5.9 5.9l1.5-2.4 5 2v3.5a2 2 0 0 1-2 2A17 17 0 0 1 3 5.5a2 2 0 0 1 2-2z"></path></svg>
              <bdi dir="ltr">{"011 266 2266"}</bdi></a>{" "}
            <a href="#request" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", borderRadius: "10px", background: "#141414", color: "#FFFFFF", fontWeight: "700", textDecoration: "none", boxSizing: "border-box", minHeight: "46px", padding: "0 20px", fontSize: "14px" }}>{"قدّم طلب استقدام"}</a>{" "}</div>{" "}</div>{" "}</header>{" "}
      <section id="top" style={{ padding: "48px 0 44px" }}>{" "}
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px", boxSizing: "border-box", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "56px" }}>{" "}
          <div style={{ flex: "1 1 480px", minWidth: "0" }}>{" "}
            <p style={{ display: "inline-flex", alignItems: "center", gap: "10px", margin: "0 0 24px", padding: "8px 14px 8px 10px", borderRadius: "999px", background: "#FFFFFF", border: "1px solid #E4DCCB", fontSize: "13px", fontWeight: "700", color: "#141414" }}>
              <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#F5C518", boxShadow: "0 0 0 4px rgba(245,197,24,0.25)" }}></span>{"مكتب استقدام مرخّص · الرياض"}</p>{" "}
            <h1 style={{ margin: "0", fontFamily: "'Noto Kufi Arabic', 'IBM Plex Sans Arabic', sans-serif", fontWeight: "600", fontSize: "48px", lineHeight: "1.5", letterSpacing: "0", color: "#141414" }}>{"عمالة منزلية موثوقة… نستقدمها "}
              <span style={{ background: "linear-gradient(transparent 62%, #F5C518 62%, #F5C518 92%, transparent 92%)" }}>{"بعناية"}</span>{" لراحة أسرتك"}</h1>{" "}
            <p style={{ margin: "24px 0 0", fontSize: "18px", lineHeight: "1.6", color: "#3D3D3D", maxWidth: "560px" }}>{"من اختيار المهنة والجنسية حتى وصول العامل إلى المملكة، يرافقك فريق عراقة في كل خطوة، مع إمكانية متابعة طلبك إلكترونيًا في أي وقت."}</p>{" "}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "32px" }}>{" "}
              <a href="#request" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", minHeight: "50px", padding: "0 24px", borderRadius: "10px", background: "#F5C518", color: "#141414", fontWeight: "700", fontSize: "15px", textDecoration: "none", boxSizing: "border-box" }}>{"قدّم طلب استقدام "}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M19 12H5M11 6l-6 6 6 6"></path></svg></a>{" "}
              <a href="#services" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", minHeight: "50px", padding: "0 24px", borderRadius: "10px", background: "transparent", color: "#141414", border: "1.5px solid #141414", fontWeight: "700", fontSize: "15px", textDecoration: "none", boxSizing: "border-box" }}>{"تصفّح الخدمات"}</a>{" "}</div>{" "}
            <a href="#track" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "18px", fontSize: "15px", fontWeight: "700", color: "#141414", textDecoration: "underline", textDecorationColor: "#F5C518", textDecorationThickness: "2px", textUnderlineOffset: "5px", padding: "6px 0" }}>{"قدّمت طلبك؟ تتبّع حالته ←"}</a>{" "}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "10px 20px", marginTop: "26px", paddingTop: "22px", borderTop: "1px solid #E4DCCB" }}>{" "}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", fontWeight: "600", color: "#141414" }}>
                <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "24px", height: "24px", borderRadius: "50%", background: "#141414", color: "#F5C518" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path></svg></span>{"مكتب مرخّص رسميًا"}</div>{" "}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", fontWeight: "600", color: "#141414" }}>
                <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "24px", height: "24px", borderRadius: "50%", background: "#141414", color: "#F5C518" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path></svg></span>{"10 جنسيات"}</div>{" "}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", fontWeight: "600", color: "#141414" }}>
                <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "24px", height: "24px", borderRadius: "50%", background: "#141414", color: "#F5C518" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path></svg></span>{"تتبّع إلكتروني للطلب"}</div>{" "}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", fontWeight: "600", color: "#141414" }}>
                <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "24px", height: "24px", borderRadius: "50%", background: "#141414", color: "#F5C518" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path></svg></span>{"دفع آمن عبر مدى و Apple Pay"}</div>{" "}</div>{" "}</div>{" "}
          <div style={{ flex: "1 1 460px", minWidth: "0", position: "relative" }}>{" "}
            <Image alt="عاملتان منزليتان من عراقة تنظفان صالة منزل أسرة" style={{ display: "block", width: "100%", objectFit: "cover", height: "500px", borderRadius: "28px", objectPosition: "60% center" }} src="/images/hero-housemaids.jpg" width={820} height={461} sizes="(max-width: 1100px) 100vw, 620px" priority />{" "}
            <div style={{ position: "absolute", right: "-24px", bottom: "40px", width: "300px", maxWidth: "86%", background: "#FFFFFF", borderRadius: "18px", padding: "20px", boxShadow: "0 24px 60px rgba(20,20,20,0.18)", boxSizing: "border-box" }}>{" "}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "10px", background: "#F5C518", color: "#141414" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"></path>
                    <circle cx="12" cy="10" r="2.3"></circle></svg></span>
                <div>
                  <p style={{ margin: "0", fontSize: "15px", fontWeight: "800", color: "#141414" }}>{"تتبّع كل خطوة"}</p>
                  <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#5C5A55" }}>{"8 مراحل واضحة من الطلب حتى الإنجاز"}</p></div></div>{" "}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(8, minmax(0, 1fr))", gap: "4px", marginTop: "16px" }}>{" "}
                <span style={{ height: "6px", borderRadius: "3px", background: "#F5C518" }}></span>{" "}
                <span style={{ height: "6px", borderRadius: "3px", background: "#F5C518" }}></span>{" "}
                <span style={{ height: "6px", borderRadius: "3px", background: "#F5C518" }}></span>{" "}
                <span style={{ height: "6px", borderRadius: "3px", background: "#F5C518" }}></span>{" "}
                <span style={{ height: "6px", borderRadius: "3px", background: "#F5C518" }}></span>{" "}
                <span style={{ height: "6px", borderRadius: "3px", background: "#ECE6DA" }}></span>{" "}
                <span style={{ height: "6px", borderRadius: "3px", background: "#ECE6DA" }}></span>{" "}
                <span style={{ height: "6px", borderRadius: "3px", background: "#ECE6DA" }}></span>{" "}</div>{" "}</div>{" "}
            <div style={{ position: "absolute", left: "-18px", bottom: "-28px", width: "190px", height: "150px", borderRadius: "20px", overflow: "hidden", border: "6px solid #FAF7F0", boxShadow: "0 18px 44px rgba(20,20,20,0.18)" }}>
              <Image alt="مربية تقرأ مع طفلين صغيرين" style={{ display: "block", width: "100%", objectFit: "cover", height: "100%" }} src="/images/nanny.jpg" width={678} height={452} sizes="(max-width: 700px) 100vw, 320px" /></div>{" "}
            <div style={{ position: "absolute", left: "24px", top: "28px", display: "flex", alignItems: "center", gap: "10px", background: "#F5C518", color: "#141414", borderRadius: "14px", padding: "12px 16px", boxShadow: "0 16px 40px rgba(20,20,20,0.2)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3l8 3v6c0 4.6-3.4 8-8 9-4.6-1-8-4.4-8-9V6z"></path>
                <path d="M9 12l2.2 2.2L15.5 10"></path></svg>
              <div>
                <p style={{ margin: "0", fontSize: "13px", fontWeight: "800" }}>{"مرخّص رسميًا"}</p>
                <p style={{ margin: "2px 0 0", fontSize: "12px", fontWeight: "600" }}>
                  <bdi dir="ltr">{"SAU100000011004"}</bdi></p></div></div>{" "}</div>{" "}</div>{" "}</section>{" "}
      <section aria-label="عراقة بالأرقام" style={{ padding: "0 0 72px" }}>{" "}
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px", boxSizing: "border-box" }}>{" "}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", background: "#141414", borderRadius: "22px", overflow: "hidden" }}>{" "}
            <div style={{ padding: "20px 32px" }}>
              <p style={{ margin: "0", fontFamily: "'Noto Kufi Arabic', 'IBM Plex Sans Arabic', sans-serif", fontWeight: "600", fontSize: "40px", lineHeight: "1.45", color: "#F5C518" }}>
                <span className="ph">{"[X]"}</span>{"+"}</p>
              <p style={{ margin: "10px 0 0", fontSize: "15px", fontWeight: "600", color: "#E9E5DC" }}>{"سنوات من الخبرة"}</p></div>{" "}
            <div style={{ borderRight: "1px solid rgba(255,255,255,0.12)", padding: "20px 32px" }}>
              <p style={{ margin: "0", fontFamily: "'Noto Kufi Arabic', 'IBM Plex Sans Arabic', sans-serif", fontWeight: "600", fontSize: "40px", lineHeight: "1.45", color: "#F5C518" }}>
                <span className="ph">{"[X,XXX]"}</span>{"+"}</p>
              <p style={{ margin: "10px 0 0", fontSize: "15px", fontWeight: "600", color: "#E9E5DC" }}>{"أسرة خدمناها"}</p></div>{" "}
            <div style={{ borderRight: "1px solid rgba(255,255,255,0.12)", padding: "20px 32px" }}>
              <p style={{ margin: "0", fontFamily: "'Noto Kufi Arabic', 'IBM Plex Sans Arabic', sans-serif", fontWeight: "600", fontSize: "40px", lineHeight: "1.45", color: "#F5C518" }}>{"10"}</p>
              <p style={{ margin: "10px 0 0", fontSize: "15px", fontWeight: "600", color: "#E9E5DC" }}>{"دول إرسال"}</p></div>{" "}
            <div style={{ borderRight: "1px solid rgba(255,255,255,0.12)", padding: "20px 32px" }}>
              <p style={{ margin: "0", fontFamily: "'Noto Kufi Arabic', 'IBM Plex Sans Arabic', sans-serif", fontWeight: "600", fontSize: "40px", lineHeight: "1.45", color: "#F5C518" }}>{"7"}</p>
              <p style={{ margin: "10px 0 0", fontSize: "15px", fontWeight: "600", color: "#E9E5DC" }}>{"مهن منزلية"}</p></div>{" "}</div></div></section>{" "}
      <section id="about" style={{ padding: "48px 0", background: "#FFFFFF", borderTop: "1px solid #E4DCCB", borderBottom: "1px solid #E4DCCB" }}>{" "}
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "56px", alignItems: "center" }}>{" "}
          <div style={{ flex: "1 1 440px", minWidth: "0", position: "relative" }}>{" "}
            <Image alt="فريق خدمة عملاء عراقة يجيب على اتصالات الأسر" style={{ display: "block", width: "100%", objectFit: "cover", height: "480px", borderRadius: "24px", objectPosition: "center 30%" }} src="/images/support-team.jpg" width={500} height={750} sizes="(max-width: 1100px) 100vw, 600px" />{" "}
            <div style={{ position: "absolute", left: "20px", bottom: "20px", display: "inline-flex", alignItems: "center", gap: "10px", padding: "12px 16px", borderRadius: "12px", background: "#141414", color: "#FFFFFF", fontSize: "13px", fontWeight: "700" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5C518" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3l8 3v6c0 4.6-3.4 8-8 9-4.6-1-8-4.4-8-9V6z"></path>
                <path d="M9 12l2.2 2.2L15.5 10"></path></svg>{"رقم الترخيص "}
              <bdi dir="ltr">{"SAU100000011004"}</bdi></div>{" "}</div>{" "}
          <div style={{ flex: "1 1 480px", minWidth: "0" }}>{" "}
            <p style={{ margin: "0 0 14px", fontSize: "12px", fontWeight: "800", letterSpacing: "0", textTransform: "uppercase", color: "#7A5D00" }}>{"من نحن"}</p>{" "}
            <h2 style={{ margin: "0", fontFamily: "'Noto Kufi Arabic', 'IBM Plex Sans Arabic', sans-serif", fontWeight: "600", fontSize: "44px", lineHeight: "1.45", letterSpacing: "0", color: "#141414", maxWidth: "720px" }}>{"عراقة في الثقة… وحداثة في الخدمة"}</h2>{" "}
            <p style={{ margin: "22px 0 0", fontSize: "16px", lineHeight: "1.7", color: "#3D3D3D" }}>{"عراقة للاستقدام مكتب سعودي مرخّص رسميًا، مقرّه حي حطين في مدينة الرياض، ومتخصص في استقدام العمالة المنزلية المدرّبة للأسر في المملكة."}</p>{" "}
            <p style={{ margin: "14px 0 0", fontSize: "16px", lineHeight: "1.7", color: "#3D3D3D" }}>{"نؤمن أن راحة الأسرة تبدأ باختيار الشخص المناسب؛ لذلك نعمل مع مكاتب إرسال معتمدة في 10 دول لنقدّم لك عمالة مؤهلة، بإجراءات نظامية واضحة وأسعار تنافسية."}</p>{" "}
            <p style={{ margin: "14px 0 0", fontSize: "16px", lineHeight: "1.7", color: "#3D3D3D" }}>{"واسمنا « "}
              <em>{"عراقة"}</em>{"» يعبّر عن قيمنا: أصالة في التعامل، والتزام بالوعود، وفريق يبقى معك حتى بعد توقيع العقد."}</p>{" "}</div></div></section>{" "}
      <section id="mission" style={{ padding: "48px 0", background: "#F2ECDF" }}>{" "}
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px", boxSizing: "border-box" }}>{" "}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "24px" }}>{" "}
            <div style={{ minWidth: "0" }}>
              <p style={{ margin: "0 0 14px", fontSize: "12px", fontWeight: "800", letterSpacing: "0", textTransform: "uppercase", color: "#7A5D00" }}>{"الرسالة والرؤية"}</p>
              <h2 style={{ margin: "0", fontFamily: "'Noto Kufi Arabic', 'IBM Plex Sans Arabic', sans-serif", fontWeight: "600", fontSize: "44px", lineHeight: "1.45", letterSpacing: "0", color: "#141414", maxWidth: "720px" }}>{"ما يحرّكنا كل يوم"}</h2></div>{" "}
            <p style={{ margin: "0", maxWidth: "400px", fontSize: "16px", lineHeight: "1.65", color: "#3D3D3D" }}>{"الوعد الذي نلتزم به في كل طلب، والمكانة التي نسعى إليها لعراقة."}</p>{" "}</div>{" "}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: "20px", marginTop: "36px" }}>{" "}
            <div style={{ position: "relative", overflow: "hidden", padding: "36px", borderRadius: "26px", background: "#F5C518", minHeight: "230px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "28px" }}>{" "}
              <div style={{ position: "absolute", left: "-40px", top: "-40px", width: "170px", height: "170px", borderRadius: "50%", border: "28px solid rgba(20,20,20,0.08)" }}></div>{" "}
              <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "14px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "56px", height: "56px", borderRadius: "16px", background: "#141414", color: "#F5C518" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="8.5"></circle>
                    <circle cx="12" cy="12" r="4.5"></circle>
                    <circle cx="12" cy="12" r="1"></circle></svg></span>
                <div>
                  <p style={{ margin: "0", fontSize: "12px", fontWeight: "800", letterSpacing: "0", textTransform: "uppercase", color: "#4A3D00" }}>{"01"}</p>
                  <h3 style={{ margin: "2px 0 0", fontSize: "22px", fontWeight: "800", color: "#141414" }}>{"رسالتنا"}</h3></div></div>{" "}
              <p style={{ position: "relative", margin: "0", fontFamily: "'Noto Kufi Arabic', 'IBM Plex Sans Arabic', sans-serif", fontSize: "28px", fontWeight: "500", lineHeight: "1.45", color: "#141414" }}>{"أن نوفّر لكل أسرة عمالة منزلية موثوقة، عبر إجراءات شفافة وسريعة ونظامية بالكامل."}</p>{" "}</div>{" "}
            <div style={{ position: "relative", overflow: "hidden", padding: "36px", borderRadius: "26px", background: "#141414", minHeight: "230px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "28px" }}>{" "}
              <div style={{ position: "absolute", left: "-40px", top: "-40px", width: "170px", height: "170px", borderRadius: "50%", border: "28px solid rgba(245,197,24,0.16)" }}></div>{" "}
              <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "14px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "56px", height: "56px", borderRadius: "16px", background: "#F5C518", color: "#141414" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"></path>
                    <circle cx="12" cy="12" r="3"></circle></svg></span>
                <div>
                  <p style={{ margin: "0", fontSize: "12px", fontWeight: "800", letterSpacing: "0", textTransform: "uppercase", color: "#F5C518" }}>{"02"}</p>
                  <h3 style={{ margin: "2px 0 0", fontSize: "22px", fontWeight: "800", color: "#FFFFFF" }}>{"رؤيتنا"}</h3></div></div>{" "}
              <p style={{ position: "relative", margin: "0", fontFamily: "'Noto Kufi Arabic', 'IBM Plex Sans Arabic', sans-serif", fontSize: "28px", fontWeight: "500", lineHeight: "1.45", color: "#FFFFFF" }}>{"أن نكون مكتب الاستقدام الأول الذي تثق به الأسر في المملكة وتوصي به."}</p>{" "}</div>{" "}</div>{" "}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px 0", marginTop: "20px", padding: "18px 24px", borderRadius: "20px", background: "#FFFFFF", border: "1px solid #E4DCCB" }}>{" "}
            <p style={{ margin: "0 24px 0 0", fontSize: "12px", fontWeight: "800", letterSpacing: "0", textTransform: "uppercase", color: "#7A5D00" }}>{"قيمنا"}</p>{" "}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0 24px", fontSize: "15px", fontWeight: "800", color: "#141414" }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "50%", background: "#F2ECDF", color: "#141414" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3.5 12.5V4h8.5l9 9-8.5 8.5z"></path>
                  <circle cx="8" cy="8.5" r="1.4"></circle></svg></span>{"الشفافية"}</div>{" "}
            <div style={{ borderRight: "1px solid #E4DCCB", display: "flex", alignItems: "center", gap: "10px", padding: "0 24px", fontSize: "15px", fontWeight: "800", color: "#141414" }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "50%", background: "#F2ECDF", color: "#141414" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3l8 3v6c0 4.6-3.4 8-8 9-4.6-1-8-4.4-8-9V6z"></path>
                  <path d="M9 12l2.2 2.2L15.5 10"></path></svg></span>{"الالتزام"}</div>{" "}
            <div style={{ borderRight: "1px solid #E4DCCB", display: "flex", alignItems: "center", gap: "10px", padding: "0 24px", fontSize: "15px", fontWeight: "800", color: "#141414" }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "50%", background: "#F2ECDF", color: "#141414" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="8.5"></circle>
                  <path d="M12 7.5V12l3 2"></path></svg></span>{"السرعة"}</div>{" "}
            <div style={{ borderRight: "1px solid #E4DCCB", display: "flex", alignItems: "center", gap: "10px", padding: "0 24px", fontSize: "15px", fontWeight: "800", color: "#141414" }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "50%", background: "#F2ECDF", color: "#141414" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.3a4.2 4.2 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z"></path></svg></span>{"احترام العامل والأسرة"}</div>{" "}</div></div></section>{" "}
      <section id="services" style={{ padding: "48px 0" }}>{" "}
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px", boxSizing: "border-box" }}>{" "}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "24px" }}>{" "}
            <div style={{ minWidth: "0" }}>
              <p style={{ margin: "0 0 14px", fontSize: "12px", fontWeight: "800", letterSpacing: "0", textTransform: "uppercase", color: "#7A5D00" }}>{"خدماتنا"}</p>
              <h2 style={{ margin: "0", fontFamily: "'Noto Kufi Arabic', 'IBM Plex Sans Arabic', sans-serif", fontWeight: "600", fontSize: "44px", lineHeight: "1.45", letterSpacing: "0", color: "#141414", maxWidth: "720px" }}>{"الشخص المناسب لكل احتياج في منزلك"}</h2></div>{" "}
            <p style={{ margin: "0", maxWidth: "400px", fontSize: "16px", lineHeight: "1.65", color: "#3D3D3D" }}>{"اختر المهنة التي تحتاجها، وسنرشّح لك عمالة مدرّبة ومؤهلة تناسب أسرتك."}</p>{" "}</div>{" "}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "18px", marginTop: "32px" }}>{" "}
            <div style={{ display: "flex", flexDirection: "column", borderRadius: "18px", background: "#FFFFFF", border: "1px solid #E4DCCB", overflow: "hidden" }}>{" "}
              <Image alt="عاملة منزلية" style={{ display: "block", width: "100%", objectFit: "cover", height: "156px" }} src="/images/housemaid.jpg" width={612} height={408} sizes="(max-width: 700px) 100vw, 320px" />{" "}
              <div style={{ display: "flex", flexDirection: "column", flexGrow: "1", padding: "20px 22px 18px" }}>{" "}
                <h3 style={{ margin: "0", fontSize: "18px", fontWeight: "800", color: "#141414" }}>{"عاملة منزلية"}</h3>{" "}
                <p style={{ margin: "6px 0 0", fontSize: "14px", lineHeight: "1.55", color: "#3D3D3D", flexGrow: "1" }}>{"تنظيف وترتيب يومي وعناية بتفاصيل المنزل لراحة أسرتك."}</p>{" "}
                <a href="#request" style={{ marginTop: "12px", padding: "8px 0", fontSize: "14px", fontWeight: "800", color: "#141414", textDecoration: "none" }}>{"اطلب هذه الخدمة ←"}</a>{" "}</div>{" "}</div>{" "}
            <div style={{ display: "flex", flexDirection: "column", borderRadius: "18px", background: "#FFFFFF", border: "1px solid #E4DCCB", overflow: "hidden" }}>{" "}
              <Image alt="عامل منزلي" style={{ display: "block", width: "100%", objectFit: "cover", height: "156px" }} src="/images/male-worker.jpg" width={927} height={509} sizes="(max-width: 700px) 100vw, 320px" />{" "}
              <div style={{ display: "flex", flexDirection: "column", flexGrow: "1", padding: "20px 22px 18px" }}>{" "}
                <h3 style={{ margin: "0", fontSize: "18px", fontWeight: "800", color: "#141414" }}>{"عامل منزلي"}</h3>{" "}
                <p style={{ margin: "6px 0 0", fontSize: "14px", lineHeight: "1.55", color: "#3D3D3D", flexGrow: "1" }}>{"أعمال المنزل والحديقة والمهام العامة."}</p>{" "}
                <a href="#request" style={{ marginTop: "12px", padding: "8px 0", fontSize: "14px", fontWeight: "800", color: "#141414", textDecoration: "none" }}>{"اطلب هذه الخدمة ←"}</a>{" "}</div>{" "}</div>{" "}
            <div style={{ display: "flex", flexDirection: "column", borderRadius: "18px", background: "#FFFFFF", border: "1px solid #E4DCCB", overflow: "hidden" }}>{" "}
              <Image alt="سائق خاص" style={{ display: "block", width: "100%", objectFit: "cover", height: "156px" }} src="/images/driver.jpg" width={1125} height={750} sizes="(max-width: 700px) 100vw, 320px" />{" "}
              <div style={{ display: "flex", flexDirection: "column", flexGrow: "1", padding: "20px 22px 18px" }}>{" "}
                <h3 style={{ margin: "0", fontSize: "18px", fontWeight: "800", color: "#141414" }}>{"سائق خاص"}</h3>{" "}
                <p style={{ margin: "6px 0 0", fontSize: "14px", lineHeight: "1.55", color: "#3D3D3D", flexGrow: "1" }}>{"تنقّلات آمنة ومنضبطة للمدارس والمشاوير اليومية والعائلية."}</p>{" "}
                <a href="#request" style={{ marginTop: "12px", padding: "8px 0", fontSize: "14px", fontWeight: "800", color: "#141414", textDecoration: "none" }}>{"اطلب هذه الخدمة ←"}</a>{" "}</div>{" "}</div>{" "}
            <div style={{ display: "flex", flexDirection: "column", borderRadius: "18px", background: "#FFFFFF", border: "1px solid #E4DCCB", overflow: "hidden" }}>{" "}
              <Image alt="مربية أطفال" style={{ display: "block", width: "100%", objectFit: "cover", height: "156px" }} src="/images/nanny.jpg" width={678} height={452} sizes="(max-width: 700px) 100vw, 320px" />{" "}
              <div style={{ display: "flex", flexDirection: "column", flexGrow: "1", padding: "20px 22px 18px" }}>{" "}
                <h3 style={{ margin: "0", fontSize: "18px", fontWeight: "800", color: "#141414" }}>{"مربية أطفال"}</h3>{" "}
                <p style={{ margin: "6px 0 0", fontSize: "14px", lineHeight: "1.55", color: "#3D3D3D", flexGrow: "1" }}>{"رعاية واهتمام بأطفالك ومتابعة روتينهم اليومي."}</p>{" "}
                <a href="#request" style={{ marginTop: "12px", padding: "8px 0", fontSize: "14px", fontWeight: "800", color: "#141414", textDecoration: "none" }}>{"اطلب هذه الخدمة ←"}</a>{" "}</div>{" "}</div>{" "}
            <div style={{ display: "flex", flexDirection: "column", borderRadius: "18px", background: "#FFFFFF", border: "1px solid #E4DCCB", overflow: "hidden" }}>{" "}
              <Image alt="مقدّمة رعاية" style={{ display: "block", width: "100%", objectFit: "cover", height: "156px" }} src="/images/caregiver.jpg" width={652} height={471} sizes="(max-width: 700px) 100vw, 320px" />{" "}
              <div style={{ display: "flex", flexDirection: "column", flexGrow: "1", padding: "20px 22px 18px" }}>{" "}
                <h3 style={{ margin: "0", fontSize: "18px", fontWeight: "800", color: "#141414" }}>{"مقدّمة رعاية"}</h3>{" "}
                <p style={{ margin: "6px 0 0", fontSize: "14px", lineHeight: "1.55", color: "#3D3D3D", flexGrow: "1" }}>{"رعاية كبار السن ومساعدتهم في احتياجاتهم اليومية بصبر واهتمام."}</p>{" "}
                <a href="#request" style={{ marginTop: "12px", padding: "8px 0", fontSize: "14px", fontWeight: "800", color: "#141414", textDecoration: "none" }}>{"اطلب هذه الخدمة ←"}</a>{" "}</div>{" "}</div>{" "}
            <div style={{ display: "flex", flexDirection: "column", borderRadius: "18px", background: "#FFFFFF", border: "1px solid #E4DCCB", overflow: "hidden" }}>{" "}
              <Image alt="طبّاخ / طبّاخة" style={{ display: "block", width: "100%", objectFit: "cover", height: "156px" }} src="/images/cook.jpg" width={1280} height={853} sizes="(max-width: 700px) 100vw, 320px" />{" "}
              <div style={{ display: "flex", flexDirection: "column", flexGrow: "1", padding: "20px 22px 18px" }}>{" "}
                <h3 style={{ margin: "0", fontSize: "18px", fontWeight: "800", color: "#141414" }}>{"طبّاخ / طبّاخة"}</h3>{" "}
                <p style={{ margin: "6px 0 0", fontSize: "14px", lineHeight: "1.55", color: "#3D3D3D", flexGrow: "1" }}>{"إعداد وجبات منزلية تناسب ذوق أسرتك."}</p>{" "}
                <a href="#request" style={{ marginTop: "12px", padding: "8px 0", fontSize: "14px", fontWeight: "800", color: "#141414", textDecoration: "none" }}>{"اطلب هذه الخدمة ←"}</a>{" "}</div>{" "}</div>{" "}
            <div style={{ display: "flex", flexDirection: "column", borderRadius: "18px", background: "#FFFFFF", border: "1px solid #E4DCCB", overflow: "hidden" }}>{" "}
              <Image alt="رعاية ذوي الاحتياجات الخاصة" style={{ display: "block", width: "100%", objectFit: "cover", height: "156px" }} src="/images/special-needs.jpg" width={1000} height={667} sizes="(max-width: 700px) 100vw, 320px" />{" "}
              <div style={{ display: "flex", flexDirection: "column", flexGrow: "1", padding: "20px 22px 18px" }}>{" "}
                <h3 style={{ margin: "0", fontSize: "18px", fontWeight: "800", color: "#141414" }}>{"رعاية ذوي الاحتياجات الخاصة"}</h3>{" "}
                <p style={{ margin: "6px 0 0", fontSize: "14px", lineHeight: "1.55", color: "#3D3D3D", flexGrow: "1" }}>{"رعاية متخصصة ومخصّصة بكل رحمة وصبر."}</p>{" "}
                <a href="#request" style={{ marginTop: "12px", padding: "8px 0", fontSize: "14px", fontWeight: "800", color: "#141414", textDecoration: "none" }}>{"اطلب هذه الخدمة ←"}</a>{" "}</div>{" "}</div>{" "}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "24px", padding: "26px", borderRadius: "18px", background: "#F5C518" }}>{" "}
              <p style={{ margin: "0", fontFamily: "'Noto Kufi Arabic', 'IBM Plex Sans Arabic', sans-serif", fontSize: "26px", fontWeight: "600", lineHeight: "1.45", color: "#141414" }}>{"لست متأكدًا من المهنة المناسبة لمنزلك؟"}</p>{" "}
              <a href="tel:0112662266" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", minHeight: "50px", padding: "0 24px", borderRadius: "10px", background: "#141414", color: "#FFFFFF", fontWeight: "700", fontSize: "15px", textDecoration: "none", boxSizing: "border-box", alignSelf: "flex-start" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 3.5h3.5l2 5-2.4 1.5a11 11 0 0 0 5.9 5.9l1.5-2.4 5 2v3.5a2 2 0 0 1-2 2A17 17 0 0 1 3 5.5a2 2 0 0 1 2-2z"></path></svg>{"اتصل "}
                <bdi dir="ltr">{"011 266 2266"}</bdi></a>{" "}</div>{" "}</div>{" "}
          <div style={{ marginTop: "22px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", borderRadius: "22px", background: "#FFFFFF", border: "1px solid #E4DCCB", overflow: "hidden" }}>{" "}
            <div style={{ display: "flex", flexDirection: "column", padding: "26px 26px 20px" }}>{" "}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "46px", height: "46px", borderRadius: "12px", background: "#F5C518", color: "#141414" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="10" cy="8" r="4"></circle>
                    <path d="M3 20a7 7 0 0 1 14 0"></path>
                    <path d="M19 8v6M16 11h6"></path></svg></span>
                <span style={{ fontSize: "12px", fontWeight: "800", letterSpacing: "0", color: "#5C5A55" }}>{"خدمة 01"}</span></div>{" "}
              <h3 style={{ margin: "18px 0 0", fontSize: "18px", fontWeight: "800", color: "#141414" }}>{"استقدام العمالة"}</h3>{" "}
              <p style={{ margin: "6px 0 0", fontSize: "14px", lineHeight: "1.55", color: "#3D3D3D", flexGrow: "1" }}>{"استقدام كامل عبر القنوات الرسمية، من اختيار المرشح حتى وصوله."}</p>{" "}
              <a href="#request" style={{ marginTop: "12px", padding: "8px 0", fontSize: "14px", fontWeight: "800", color: "#141414", textDecoration: "none" }}>{"اطلب هذه الخدمة ←"}</a>{" "}</div>{" "}
            <div style={{ borderRight: "1px solid #E4DCCB", display: "flex", flexDirection: "column", padding: "26px 26px 20px" }}>{" "}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "46px", height: "46px", borderRadius: "12px", background: "#F5C518", color: "#141414" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 8h14l-3-3"></path>
                    <path d="M20 16H6l3 3"></path></svg></span>
                <span style={{ fontSize: "12px", fontWeight: "800", letterSpacing: "0", color: "#5C5A55" }}>{"خدمة 02"}</span></div>{" "}
              <h3 style={{ margin: "18px 0 0", fontSize: "18px", fontWeight: "800", color: "#141414" }}>{"نقل الخدمات"}</h3>{" "}
              <p style={{ margin: "6px 0 0", fontSize: "14px", lineHeight: "1.55", color: "#3D3D3D", flexGrow: "1" }}>{"نقل خدمات العامل المنزلي إليك بإجراءات نظامية وسريعة."}</p>{" "}
              <a href="#request" style={{ marginTop: "12px", padding: "8px 0", fontSize: "14px", fontWeight: "800", color: "#141414", textDecoration: "none" }}>{"اطلب هذه الخدمة ←"}</a>{" "}</div>{" "}
            <div style={{ borderRight: "1px solid #E4DCCB", display: "flex", flexDirection: "column", padding: "26px 26px 20px" }}>{" "}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "46px", height: "46px", borderRadius: "12px", background: "#F5C518", color: "#141414" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                    <circle cx="9" cy="11" r="2.2"></circle>
                    <path d="M5.8 16a3.4 3.4 0 0 1 6.4 0"></path>
                    <path d="M14.5 10h4M14.5 13.5h3"></path></svg></span>
                <span style={{ fontSize: "12px", fontWeight: "800", letterSpacing: "0", color: "#5C5A55" }}>{"خدمة 03"}</span></div>{" "}
              <h3 style={{ margin: "18px 0 0", fontSize: "18px", fontWeight: "800", color: "#141414" }}>{"خدمة «معروفة»"}</h3>{" "}
              <p style={{ margin: "6px 0 0", fontSize: "14px", lineHeight: "1.55", color: "#3D3D3D", flexGrow: "1" }}>{"لديك عامل تعرفه بالاسم؟ نتولّى إجراءات استقدامه لك."}</p>{" "}
              <a href="#request" style={{ marginTop: "12px", padding: "8px 0", fontSize: "14px", fontWeight: "800", color: "#141414", textDecoration: "none" }}>{"اطلب هذه الخدمة ←"}</a>{" "}</div>{" "}
            <div style={{ borderRight: "1px solid #E4DCCB", display: "flex", flexDirection: "column", padding: "26px 26px 20px" }}>{" "}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "46px", height: "46px", borderRadius: "12px", background: "#F5C518", color: "#141414" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 3h7l5 5v13H7z"></path>
                    <path d="M14 3v5h5"></path>
                    <path d="M10 13l2 2 3.5-3.5"></path></svg></span>
                <span style={{ fontSize: "12px", fontWeight: "800", letterSpacing: "0", color: "#5C5A55" }}>{"خدمة 04"}</span></div>{" "}
              <h3 style={{ margin: "18px 0 0", fontSize: "18px", fontWeight: "800", color: "#141414" }}>{"توثيق العقود"}</h3>{" "}
              <p style={{ margin: "6px 0 0", fontSize: "14px", lineHeight: "1.55", color: "#3D3D3D", flexGrow: "1" }}>{"توثيق عقد العمل رسميًا لحفظ حقوق الطرفين."}</p>{" "}
              <a href="#request" style={{ marginTop: "12px", padding: "8px 0", fontSize: "14px", fontWeight: "800", color: "#141414", textDecoration: "none" }}>{"اطلب هذه الخدمة ←"}</a>{" "}</div>{" "}</div></div></section>{" "}
      <section id="nationalities" style={{ padding: "48px 0", background: "#F2ECDF" }}>{" "}
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px", boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>{" "}
          <p style={{ margin: "0 0 14px", fontSize: "12px", fontWeight: "800", letterSpacing: "0", textTransform: "uppercase", color: "#7A5D00" }}>{"الجنسيات المتاحة"}</p>
          <h2 style={{ margin: "0", fontFamily: "'Noto Kufi Arabic', 'IBM Plex Sans Arabic', sans-serif", fontWeight: "600", fontSize: "44px", lineHeight: "1.45", letterSpacing: "0", color: "#141414", maxWidth: "640px" }}>{"اختر من بين 10 جنسيات"}</h2>{" "}
          <p style={{ margin: "14px 0 0", maxWidth: "520px", fontSize: "16px", lineHeight: "1.65", color: "#3D3D3D" }}>{"نتعاون مع مكاتب إرسال معتمدة في كل دولة لنستقدم لك عمالة مدرّبة."}</p>{" "}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", marginTop: "32px", maxWidth: "1040px" }}>{" "}
            <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "7px 18px 7px 7px", borderRadius: "999px", background: "#FFFFFF", border: "1px solid #E4DCCB", fontSize: "15px", fontWeight: "700", color: "#141414" }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", borderRadius: "50%", background: "#141414", fontSize: "11px", fontWeight: "800", color: "#F5C518" }}>{"PH"}</span>{"الفلبين"}</span>{" "}
            <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "7px 18px 7px 7px", borderRadius: "999px", background: "#FFFFFF", border: "1px solid #E4DCCB", fontSize: "15px", fontWeight: "700", color: "#141414" }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", borderRadius: "50%", background: "#141414", fontSize: "11px", fontWeight: "800", color: "#F5C518" }}>{"ID"}</span>{"إندونيسيا"}</span>{" "}
            <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "7px 18px 7px 7px", borderRadius: "999px", background: "#FFFFFF", border: "1px solid #E4DCCB", fontSize: "15px", fontWeight: "700", color: "#141414" }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", borderRadius: "50%", background: "#141414", fontSize: "11px", fontWeight: "800", color: "#F5C518" }}>{"LK"}</span>{"سريلانكا"}</span>{" "}
            <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "7px 18px 7px 7px", borderRadius: "999px", background: "#FFFFFF", border: "1px solid #E4DCCB", fontSize: "15px", fontWeight: "700", color: "#141414" }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", borderRadius: "50%", background: "#141414", fontSize: "11px", fontWeight: "800", color: "#F5C518" }}>{"IN"}</span>{"الهند"}</span>{" "}
            <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "7px 18px 7px 7px", borderRadius: "999px", background: "#FFFFFF", border: "1px solid #E4DCCB", fontSize: "15px", fontWeight: "700", color: "#141414" }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", borderRadius: "50%", background: "#141414", fontSize: "11px", fontWeight: "800", color: "#F5C518" }}>{"NP"}</span>{"نيبال"}</span>{" "}
            <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "7px 18px 7px 7px", borderRadius: "999px", background: "#FFFFFF", border: "1px solid #E4DCCB", fontSize: "15px", fontWeight: "700", color: "#141414" }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", borderRadius: "50%", background: "#141414", fontSize: "11px", fontWeight: "800", color: "#F5C518" }}>{"BD"}</span>{"بنغلاديش"}</span>{" "}
            <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "7px 18px 7px 7px", borderRadius: "999px", background: "#FFFFFF", border: "1px solid #E4DCCB", fontSize: "15px", fontWeight: "700", color: "#141414" }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", borderRadius: "50%", background: "#141414", fontSize: "11px", fontWeight: "800", color: "#F5C518" }}>{"KE"}</span>{"كينيا"}</span>{" "}
            <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "7px 18px 7px 7px", borderRadius: "999px", background: "#FFFFFF", border: "1px solid #E4DCCB", fontSize: "15px", fontWeight: "700", color: "#141414" }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", borderRadius: "50%", background: "#141414", fontSize: "11px", fontWeight: "800", color: "#F5C518" }}>{"UG"}</span>{"أوغندا"}</span>{" "}
            <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "7px 18px 7px 7px", borderRadius: "999px", background: "#FFFFFF", border: "1px solid #E4DCCB", fontSize: "15px", fontWeight: "700", color: "#141414" }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", borderRadius: "50%", background: "#141414", fontSize: "11px", fontWeight: "800", color: "#F5C518" }}>{"ET"}</span>{"إثيوبيا"}</span>{" "}
            <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "7px 18px 7px 7px", borderRadius: "999px", background: "#FFFFFF", border: "1px solid #E4DCCB", fontSize: "15px", fontWeight: "700", color: "#141414" }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", borderRadius: "50%", background: "#141414", fontSize: "11px", fontWeight: "800", color: "#F5C518" }}>{"GH"}</span>{"غانا"}</span>{" "}</div>{" "}
          <p style={{ margin: "22px 0 0", display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#5C5A55" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="8.5"></circle>
              <path d="M3.5 12h17M12 3.5c2.5 2.6 3.5 5.4 3.5 8.5s-1 5.9-3.5 8.5c-2.5-2.6-3.5-5.4-3.5-8.5s1-5.9 3.5-8.5z"></path></svg>{"تختلف الإتاحة والأسعار ومدة الاستقدام حسب الجنسية والأنظمة المعمول بها."}</p>{" "}</div>{" "}</section>{" "}
      <section id="how" style={{ padding: "48px 0" }}>{" "}
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px", boxSizing: "border-box" }}>{" "}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "24px" }}>{" "}
            <div style={{ minWidth: "0" }}>
              <p style={{ margin: "0 0 14px", fontSize: "12px", fontWeight: "800", letterSpacing: "0", textTransform: "uppercase", color: "#7A5D00" }}>{"كيف تعمل الخدمة"}</p>
              <h2 style={{ margin: "0", fontFamily: "'Noto Kufi Arabic', 'IBM Plex Sans Arabic', sans-serif", fontWeight: "600", fontSize: "44px", lineHeight: "1.45", letterSpacing: "0", color: "#141414", maxWidth: "720px" }}>{"أربع خطوات بسيطة حتى وصول العامل"}</h2></div>{" "}
            <a href="#request" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", minHeight: "50px", padding: "0 24px", borderRadius: "10px", background: "#F5C518", color: "#141414", fontWeight: "700", fontSize: "15px", textDecoration: "none", boxSizing: "border-box" }}>{"ابدأ طلبك الآن "}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M11 6l-6 6 6 6"></path></svg></a>{" "}</div>{" "}
          <div style={{ position: "relative", marginTop: "48px" }}>{" "}
            <div style={{ position: "absolute", right: "0", left: "0", top: "27px", height: "2px", background: "linear-gradient(270deg, #F5C518 0%, #F5C518 25%, #DCD2BE 25%)" }}></div>{" "}
            <ol style={{ position: "relative", listStyle: "none", margin: "0", padding: "0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "28px" }}>
              <li style={{ paddingLeft: "12px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "56px", height: "56px", borderRadius: "50%", boxSizing: "border-box", background: "#F5C518", color: "#141414", fontFamily: "'Noto Kufi Arabic', 'IBM Plex Sans Arabic', sans-serif", fontSize: "22px", fontWeight: "600", boxShadow: "0 0 0 8px #FAF7F0" }}>{"01"}</span>
                <h3 style={{ margin: "22px 0 0", fontSize: "19px", fontWeight: "800", color: "#141414" }}>{"اختر الخدمة"}</h3>
                <p style={{ margin: "8px 0 0", fontSize: "15px", lineHeight: "1.6", color: "#3D3D3D", maxWidth: "270px" }}>{"حدّد المهنة والجنسية المناسبة لأسرتك."}</p></li>
              <li style={{ paddingLeft: "12px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "56px", height: "56px", borderRadius: "50%", boxSizing: "border-box", background: "#FAF7F0", color: "#141414", border: "2px solid #141414", fontFamily: "'Noto Kufi Arabic', 'IBM Plex Sans Arabic', sans-serif", fontSize: "22px", fontWeight: "600", boxShadow: "0 0 0 8px #FAF7F0" }}>{"02"}</span>
                <h3 style={{ margin: "22px 0 0", fontSize: "19px", fontWeight: "800", color: "#141414" }}>{"قدّم طلبك أو ادفع إلكترونيًا"}</h3>
                <p style={{ margin: "8px 0 0", fontSize: "15px", lineHeight: "1.6", color: "#3D3D3D", maxWidth: "270px" }}>{"أرسل طلبك في أقل من دقيقة، واحصل على رقم تتبّع فوري."}</p></li>
              <li style={{ paddingLeft: "12px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "56px", height: "56px", borderRadius: "50%", boxSizing: "border-box", background: "#FAF7F0", color: "#141414", border: "2px solid #141414", fontFamily: "'Noto Kufi Arabic', 'IBM Plex Sans Arabic', sans-serif", fontSize: "22px", fontWeight: "600", boxShadow: "0 0 0 8px #FAF7F0" }}>{"03"}</span>
                <h3 style={{ margin: "22px 0 0", fontSize: "19px", fontWeight: "800", color: "#141414" }}>{"نختار لك المرشح الأنسب"}</h3>
                <p style={{ margin: "8px 0 0", fontSize: "15px", lineHeight: "1.6", color: "#3D3D3D", maxWidth: "270px" }}>{"يرشّح فريقنا السير الذاتية المناسبة ويُنهي جميع الإجراءات النظامية."}</p></li>
              <li style={{ paddingLeft: "12px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "56px", height: "56px", borderRadius: "50%", boxSizing: "border-box", background: "#FAF7F0", color: "#141414", border: "2px solid #141414", fontFamily: "'Noto Kufi Arabic', 'IBM Plex Sans Arabic', sans-serif", fontSize: "22px", fontWeight: "600", boxShadow: "0 0 0 8px #FAF7F0" }}>{"04"}</span>
                <h3 style={{ margin: "22px 0 0", fontSize: "19px", fontWeight: "800", color: "#141414" }}>{"تابع الإجراءات"}</h3>
                <p style={{ margin: "8px 0 0", fontSize: "15px", lineHeight: "1.6", color: "#3D3D3D", maxWidth: "270px" }}>{"تابع كل مرحلة إلكترونيًا حتى وصول العامل إليك."}</p></li></ol></div></div></section>{" "}
      <section id="why" style={{ padding: "48px 0", background: "#FFFFFF", borderTop: "1px solid #E4DCCB", borderBottom: "1px solid #E4DCCB" }}>{" "}
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "48px", alignItems: "stretch" }}>{" "}
          <div style={{ flex: "1 1 380px", minWidth: "0", position: "relative", overflow: "hidden", borderRadius: "28px", background: "#141414", padding: "40px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "32px", boxSizing: "border-box" }}>{" "}
            <div style={{ position: "absolute", left: "-130px", bottom: "-175px", width: "240px", height: "240px", borderRadius: "50%", border: "34px solid #F5C518" }}></div>{" "}
            <div style={{ position: "relative" }}>
              <p style={{ margin: "0 0 14px", fontSize: "12px", fontWeight: "800", letterSpacing: "0", textTransform: "uppercase", color: "#F5C518" }}>{"لماذا عراقة"}</p>
              <h2 style={{ margin: "0", fontFamily: "'Noto Kufi Arabic', 'IBM Plex Sans Arabic', sans-serif", fontWeight: "600", fontSize: "42px", lineHeight: "1.45", letterSpacing: "0", color: "#FFFFFF", maxWidth: "720px" }}>{"لماذا تختار الأسر عراقة؟"}</h2>{" "}
              <p style={{ margin: "18px 0 0", fontSize: "16px", lineHeight: "1.65", color: "#CFCAC0", maxWidth: "380px" }}>{"ستة التزامات نقدّمها في كل طلب، من أول اتصال حتى يوم وصول العامل."}</p></div>{" "}
            <a href="#request" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", minHeight: "50px", padding: "0 24px", borderRadius: "10px", background: "#F5C518", color: "#141414", fontWeight: "700", fontSize: "15px", textDecoration: "none", boxSizing: "border-box", position: "relative", alignSelf: "flex-start" }}>{"قدّم طلب استقدام "}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M11 6l-6 6 6 6"></path></svg></a>{" "}</div>{" "}
          <div style={{ flex: "1.6 1 560px", minWidth: "0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", columnGap: "40px" }}>{" "}
            <div style={{ display: "flex", gap: "18px", padding: "24px 0", borderBottom: "1px solid #E4DCCB" }}>
              <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", borderRadius: "50%", border: "1.5px solid #141414", color: "#141414" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3l8 3v6c0 4.6-3.4 8-8 9-4.6-1-8-4.4-8-9V6z"></path>
                  <path d="M9 12l2.2 2.2L15.5 10"></path></svg></span>
              <div>
                <h3 style={{ margin: "2px 0 0", fontSize: "18px", fontWeight: "800", color: "#141414" }}>{"مرخّص ونظامي"}</h3>
                <p style={{ margin: "6px 0 0", fontSize: "15px", lineHeight: "1.55", color: "#3D3D3D" }}>{"مكتب مرخّص رسميًا، وجميع العقود نظامية وموثّقة."}</p></div></div>{" "}
            <div style={{ display: "flex", gap: "18px", padding: "24px 0", borderBottom: "1px solid #E4DCCB" }}>
              <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", borderRadius: "50%", border: "1.5px solid #141414", color: "#141414" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"></path>
                  <circle cx="12" cy="10" r="2.3"></circle></svg></span>
              <div>
                <h3 style={{ margin: "2px 0 0", fontSize: "18px", fontWeight: "800", color: "#141414" }}>{"تتبّع كل خطوة"}</h3>
                <p style={{ margin: "6px 0 0", fontSize: "15px", lineHeight: "1.55", color: "#3D3D3D" }}>{"اعرف أين وصل طلبك بدقة، من التقديم حتى الوصول."}</p></div></div>{" "}
            <div style={{ display: "flex", gap: "18px", padding: "24px 0", borderBottom: "1px solid #E4DCCB" }}>
              <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", borderRadius: "50%", border: "1.5px solid #141414", color: "#141414" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3.5 12.5V4h8.5l9 9-8.5 8.5z"></path>
                  <circle cx="8" cy="8.5" r="1.4"></circle></svg></span>
              <div>
                <h3 style={{ margin: "2px 0 0", fontSize: "18px", fontWeight: "800", color: "#141414" }}>{"أسعار واضحة"}</h3>
                <p style={{ margin: "6px 0 0", fontSize: "15px", lineHeight: "1.55", color: "#3D3D3D" }}>{"أسعار معلنة منذ البداية بلا مفاجآت."}</p></div></div>{" "}
            <div style={{ display: "flex", gap: "18px", padding: "24px 0", borderBottom: "1px solid #E4DCCB" }}>
              <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", borderRadius: "50%", border: "1.5px solid #141414", color: "#141414" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="5" y="10.5" width="14" height="10" rx="2"></rect>
                  <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"></path></svg></span>
              <div>
                <h3 style={{ margin: "2px 0 0", fontSize: "18px", fontWeight: "800", color: "#141414" }}>{"دفع إلكتروني آمن"}</h3>
                <p style={{ margin: "6px 0 0", fontSize: "15px", lineHeight: "1.55", color: "#3D3D3D" }}>{"ادفع عبر مدى أو Apple Pay أو البطاقة من خلال بوابة دفع آمنة ومعتمدة."}</p></div></div>{" "}
            <div style={{ display: "flex", gap: "18px", padding: "24px 0", borderBottom: "1px solid #E4DCCB" }}>
              <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", borderRadius: "50%", border: "1.5px solid #141414", color: "#141414" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="4" y="4" width="7" height="7" rx="1.5"></rect>
                  <rect x="13" y="4" width="7" height="7" rx="1.5"></rect>
                  <rect x="4" y="13" width="7" height="7" rx="1.5"></rect>
                  <rect x="13" y="13" width="7" height="7" rx="1.5"></rect></svg></span>
              <div>
                <h3 style={{ margin: "2px 0 0", fontSize: "18px", fontWeight: "800", color: "#141414" }}>{"خيارات واسعة"}</h3>
                <p style={{ margin: "6px 0 0", fontSize: "15px", lineHeight: "1.55", color: "#3D3D3D" }}>{"7 مهن و10 جنسيات تناسب احتياجات أسرتك."}</p></div></div>{" "}
            <div style={{ display: "flex", gap: "18px", padding: "24px 0", borderBottom: "1px solid #E4DCCB" }}>
              <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", borderRadius: "50%", border: "1.5px solid #141414", color: "#141414" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 5h16v11H9l-5 4z"></path>
                  <path d="M8 9.5h8M8 12.5h5"></path></svg></span>
              <div>
                <h3 style={{ margin: "2px 0 0", fontSize: "18px", fontWeight: "800", color: "#141414" }}>{"فريق قريب منك"}</h3>
                <p style={{ margin: "6px 0 0", fontSize: "15px", lineHeight: "1.55", color: "#3D3D3D" }}>{"تواصل معنا هاتفيًا أو عبر البريد الإلكتروني، فنحن معك قبل الاستقدام وأثناءه وبعده."}</p></div></div>{" "}</div></div></section>{" "}
      <section id="track" style={{ padding: "48px 0", background: "#141414" }}>{" "}
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "56px", alignItems: "center" }}>{" "}
          <div style={{ flex: "1 1 360px", minWidth: "0" }}>{" "}
            <p style={{ margin: "0 0 14px", fontSize: "12px", fontWeight: "800", letterSpacing: "0", textTransform: "uppercase", color: "#F5C518" }}>{"تتبّع طلبك"}</p>
            <h2 style={{ margin: "0", fontFamily: "'Noto Kufi Arabic', 'IBM Plex Sans Arabic', sans-serif", fontWeight: "600", fontSize: "44px", lineHeight: "1.45", letterSpacing: "0", color: "#FFFFFF", maxWidth: "720px" }}>{"أين وصل طلبك الآن؟"}</h2>{" "}
            <p style={{ margin: "18px 0 0", fontSize: "16px", lineHeight: "1.65", color: "#CFCAC0", maxWidth: "440px" }}>{"يمرّ كل طلب بثماني مراحل واضحة. تابع طلبك إلكترونيًا في أي وقت، من يوم التقديم حتى يوم وصول العامل."}</p>{" "}
            <ul style={{ listStyle: "none", margin: "28px 0 0", padding: "0", display: "flex", flexDirection: "column", gap: "14px" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", fontWeight: "600", color: "#FFFFFF" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "26px", height: "26px", borderRadius: "50%", background: "#F5C518", color: "#141414" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path></svg></span>{"استخدم رقم الطلب ورقم الجوال"}</li>
              <li style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", fontWeight: "600", color: "#FFFFFF" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "26px", height: "26px", borderRadius: "50%", background: "#F5C518", color: "#141414" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path></svg></span>{"8 مراحل واضحة من الطلب حتى الوصول"}</li>
              <li style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", fontWeight: "600", color: "#FFFFFF" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "26px", height: "26px", borderRadius: "50%", background: "#F5C518", color: "#141414" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path></svg></span>{"تابع إلكترونيًا في أي وقت"}</li></ul>{" "}
            <a href="#track" onClick={b.openTrack} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", minHeight: "50px", padding: "0 24px", borderRadius: "10px", background: "#F5C518", color: "#141414", fontWeight: "700", fontSize: "15px", textDecoration: "none", boxSizing: "border-box", marginTop: "32px" }}>{"تتبّع طلبي "}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M11 6l-6 6 6 6"></path></svg></a>{" "}</div>{" "}
          <div style={{ flex: "1 1 520px", minWidth: "0", maxWidth: "600px", marginRight: "auto", background: "#FFFFFF", borderRadius: "26px", boxShadow: "0 30px 80px rgba(0,0,0,0.35)", overflow: "hidden" }} role="img" aria-label="رسم توضيحي لمتتبّع طلبات عراقة">{" "}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", padding: "22px 28px", borderBottom: "1px solid #E4DCCB" }}>{" "}
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "46px", height: "46px", borderRadius: "12px", background: "#141414", color: "#F5C518" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 3h7l5 5v13H7z"></path>
                    <path d="M14 3v5h5"></path>
                    <path d="M10 13l2 2 3.5-3.5"></path></svg></span>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span style={{ display: "block", width: "80px", height: "8px", borderRadius: "4px", background: "#ECE6DA" }}></span>
                  <span style={{ display: "block", width: "150px", height: "12px", borderRadius: "6px", background: "#D9D0BE" }}></span></div></div>{" "}
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "9px 14px", borderRadius: "999px", background: "#FFF4CC" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#C99A00" }}></span>
                <span style={{ display: "block", width: "56px", height: "8px", borderRadius: "4px", background: "#F0D77A" }}></span></span>{" "}</div>{" "}
            <div style={{ padding: "20px 28px 0" }}>
              <div style={{ height: "8px", borderRadius: "4px", background: "#EEE8DC" }}>
                <div style={{ width: "62%", height: "8px", borderRadius: "4px", background: "#F5C518" }}></div></div></div>{" "}
            <ol style={{ listStyle: "none", margin: "0", padding: "18px 28px 24px" }}>
              <li style={{ display: "flex", gap: "18px", alignItems: "flex-start", paddingTop: "7px", paddingBottom: "7px" }}>
                <div style={{ position: "relative", flex: "0 0 30px", alignSelf: "stretch" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px", borderRadius: "50%", background: "#141414", color: "#F5C518" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path></svg></span>
                  <span style={{ position: "absolute", right: "14px", top: "30px", bottom: "-14px", width: "2px", background: "#141414" }}></span></div>
                <div style={{ flexGrow: "1", display: "flex", flexDirection: "column", gap: "8px", paddingTop: "6px", minHeight: "30px" }}>
                  <span style={{ display: "block", width: "46%", height: "10px", borderRadius: "5px", background: "#D9D0BE" }}></span>
                  <span style={{ display: "block", width: "64%", height: "7px", borderRadius: "4px", background: "#ECE6DA" }}></span></div>
                <span style={{ flex: "0 0 auto", display: "block", width: "40px", height: "7px", borderRadius: "4px", background: "#D9D0BE", marginTop: "6px" }}></span></li>
              <li style={{ display: "flex", gap: "18px", alignItems: "flex-start", paddingTop: "7px", paddingBottom: "7px" }}>
                <div style={{ position: "relative", flex: "0 0 30px", alignSelf: "stretch" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px", borderRadius: "50%", background: "#141414", color: "#F5C518" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path></svg></span>
                  <span style={{ position: "absolute", right: "14px", top: "30px", bottom: "-14px", width: "2px", background: "#141414" }}></span></div>
                <div style={{ flexGrow: "1", display: "flex", flexDirection: "column", gap: "8px", paddingTop: "6px", minHeight: "30px" }}>
                  <span style={{ display: "block", width: "38%", height: "10px", borderRadius: "5px", background: "#D9D0BE" }}></span>
                  <span style={{ display: "block", width: "58%", height: "7px", borderRadius: "4px", background: "#ECE6DA" }}></span></div>
                <span style={{ flex: "0 0 auto", display: "block", width: "40px", height: "7px", borderRadius: "4px", background: "#D9D0BE", marginTop: "6px" }}></span></li>
              <li style={{ display: "flex", gap: "18px", alignItems: "flex-start", paddingTop: "7px", paddingBottom: "7px" }}>
                <div style={{ position: "relative", flex: "0 0 30px", alignSelf: "stretch" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px", borderRadius: "50%", background: "#141414", color: "#F5C518" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path></svg></span>
                  <span style={{ position: "absolute", right: "14px", top: "30px", bottom: "-14px", width: "2px", background: "#141414" }}></span></div>
                <div style={{ flexGrow: "1", display: "flex", flexDirection: "column", gap: "8px", paddingTop: "6px", minHeight: "30px" }}>
                  <span style={{ display: "block", width: "52%", height: "10px", borderRadius: "5px", background: "#D9D0BE" }}></span>
                  <span style={{ display: "block", width: "70%", height: "7px", borderRadius: "4px", background: "#ECE6DA" }}></span></div>
                <span style={{ flex: "0 0 auto", display: "block", width: "40px", height: "7px", borderRadius: "4px", background: "#D9D0BE", marginTop: "6px" }}></span></li>
              <li style={{ display: "flex", gap: "18px", alignItems: "flex-start", paddingTop: "7px", paddingBottom: "7px" }}>
                <div style={{ position: "relative", flex: "0 0 30px", alignSelf: "stretch" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px", borderRadius: "50%", background: "#141414", color: "#F5C518" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path></svg></span>
                  <span style={{ position: "absolute", right: "14px", top: "30px", bottom: "-14px", width: "2px", background: "#141414" }}></span></div>
                <div style={{ flexGrow: "1", display: "flex", flexDirection: "column", gap: "8px", paddingTop: "6px", minHeight: "30px" }}>
                  <span style={{ display: "block", width: "44%", height: "10px", borderRadius: "5px", background: "#D9D0BE" }}></span>
                  <span style={{ display: "block", width: "62%", height: "7px", borderRadius: "4px", background: "#ECE6DA" }}></span></div>
                <span style={{ flex: "0 0 auto", display: "block", width: "40px", height: "7px", borderRadius: "4px", background: "#D9D0BE", marginTop: "6px" }}></span></li>
              <li style={{ display: "flex", gap: "18px", alignItems: "flex-start", paddingTop: "7px", paddingBottom: "7px", background: "#FAF7F0", borderRadius: "14px", margin: "0 -14px", paddingRight: "14px", paddingLeft: "14px" }}>
                <div style={{ position: "relative", flex: "0 0 30px", alignSelf: "stretch" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px", borderRadius: "50%", background: "#F5C518", boxShadow: "0 0 0 6px rgba(245,197,24,0.3)" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#141414" }}></span></span>
                  <span style={{ position: "absolute", right: "14px", top: "30px", bottom: "-14px", width: "2px", background: "#E3DCCD" }}></span></div>
                <div style={{ flexGrow: "1", display: "flex", flexDirection: "column", gap: "8px", paddingTop: "6px", minHeight: "30px" }}>
                  <span style={{ display: "block", width: "40%", height: "10px", borderRadius: "5px", background: "#141414" }}></span>
                  <span style={{ display: "block", width: "66%", height: "7px", borderRadius: "4px", background: "#D9D0BE" }}></span></div>
                <span style={{ flex: "0 0 auto", display: "block", width: "40px", height: "7px", borderRadius: "4px", background: "#D9D0BE", marginTop: "6px" }}></span></li>
              <li style={{ display: "flex", gap: "18px", alignItems: "flex-start", paddingTop: "7px", paddingBottom: "7px" }}>
                <div style={{ position: "relative", flex: "0 0 30px", alignSelf: "stretch" }}>
                  <span style={{ display: "inline-flex", width: "30px", height: "30px", borderRadius: "50%", background: "#FFFFFF", border: "2px solid #E0D8C8", boxSizing: "border-box" }}></span>
                  <span style={{ position: "absolute", right: "14px", top: "30px", bottom: "-14px", width: "2px", background: "#E3DCCD" }}></span></div>
                <div style={{ flexGrow: "1", display: "flex", flexDirection: "column", gap: "8px", paddingTop: "6px", minHeight: "30px" }}>
                  <span style={{ display: "block", width: "48%", height: "10px", borderRadius: "5px", background: "#ECE6DA" }}></span></div>
                <span style={{ flex: "0 0 auto", display: "block", width: "40px", height: "7px", borderRadius: "4px", background: "#F1ECE2", marginTop: "6px" }}></span></li>
              <li style={{ display: "flex", gap: "18px", alignItems: "flex-start", paddingTop: "7px", paddingBottom: "7px" }}>
                <div style={{ position: "relative", flex: "0 0 30px", alignSelf: "stretch" }}>
                  <span style={{ display: "inline-flex", width: "30px", height: "30px", borderRadius: "50%", background: "#FFFFFF", border: "2px solid #E0D8C8", boxSizing: "border-box" }}></span>
                  <span style={{ position: "absolute", right: "14px", top: "30px", bottom: "-14px", width: "2px", background: "#E3DCCD" }}></span></div>
                <div style={{ flexGrow: "1", display: "flex", flexDirection: "column", gap: "8px", paddingTop: "6px", minHeight: "30px" }}>
                  <span style={{ display: "block", width: "42%", height: "10px", borderRadius: "5px", background: "#ECE6DA" }}></span></div>
                <span style={{ flex: "0 0 auto", display: "block", width: "40px", height: "7px", borderRadius: "4px", background: "#F1ECE2", marginTop: "6px" }}></span></li>
              <li style={{ display: "flex", gap: "18px", alignItems: "flex-start", paddingTop: "7px", paddingBottom: "7px" }}>
                <div style={{ position: "relative", flex: "0 0 30px", alignSelf: "stretch" }}>
                  <span style={{ display: "inline-flex", width: "30px", height: "30px", borderRadius: "50%", background: "#FFFFFF", border: "2px solid #E0D8C8", boxSizing: "border-box" }}></span></div>
                <div style={{ flexGrow: "1", display: "flex", flexDirection: "column", gap: "8px", paddingTop: "6px", minHeight: "30px" }}>
                  <span style={{ display: "block", width: "34%", height: "10px", borderRadius: "5px", background: "#ECE6DA" }}></span></div>
                <span style={{ flex: "0 0 auto", display: "block", width: "40px", height: "7px", borderRadius: "4px", background: "#F1ECE2", marginTop: "6px" }}></span></li></ol>{" "}</div>{" "}</div>{" "}</section>{" "}{" "}
      <section id="faq" style={{ padding: "48px 0", background: "#F2ECDF" }}>{" "}
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "56px" }}>{" "}
          <div style={{ flex: "1 1 320px", minWidth: "0" }}>{" "}
            <p style={{ margin: "0 0 14px", fontSize: "12px", fontWeight: "800", letterSpacing: "0", textTransform: "uppercase", color: "#7A5D00" }}>{"الأسئلة الشائعة"}</p>
            <h2 style={{ margin: "0", fontFamily: "'Noto Kufi Arabic', 'IBM Plex Sans Arabic', sans-serif", fontWeight: "600", fontSize: "44px", lineHeight: "1.45", letterSpacing: "0", color: "#141414", maxWidth: "380px" }}>{"الأسئلة الشائعة"}</h2>{" "}
            <p style={{ margin: "18px 0 0", fontSize: "16px", lineHeight: "1.65", color: "#3D3D3D", maxWidth: "360px" }}>{"إجابات سريعة على أكثر ما تسألنا عنه الأسر. لم تجد سؤالك؟ تحدّث مع فريقنا."}</p>{" "}
            <div style={{ marginTop: "28px", padding: "24px", borderRadius: "20px", background: "#141414", maxWidth: "360px" }}>{" "}
              <p style={{ margin: "0", fontSize: "17px", fontWeight: "800", color: "#FFFFFF" }}>{"لديك سؤال آخر؟"}</p>{" "}
              <p style={{ margin: "6px 0 0", fontSize: "14px", lineHeight: "1.55", color: "#CFCAC0" }}>{"نحن معك قبل الاستقدام وأثناءه وبعده."}</p>{" "}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "18px" }}>
                <a href="tel:0112662266" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", borderRadius: "10px", background: "#F5C518", color: "#141414", fontWeight: "700", textDecoration: "none", boxSizing: "border-box", minHeight: "46px", padding: "0 18px", fontSize: "14px" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 3.5h3.5l2 5-2.4 1.5a11 11 0 0 0 5.9 5.9l1.5-2.4 5 2v3.5a2 2 0 0 1-2 2A17 17 0 0 1 3 5.5a2 2 0 0 1 2-2z"></path></svg>{"اتصل بنا"}</a>
                <a href="mailto:info@araqah.com" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", borderRadius: "10px", background: "transparent", border: "1.5px solid #141414", fontWeight: "700", textDecoration: "none", boxSizing: "border-box", minHeight: "46px", padding: "0 18px", fontSize: "14px", color: "#FFFFFF", borderColor: "#5A5852" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                    <path d="M3.5 6.5l8.5 6 8.5-6"></path></svg>{"راسلنا"}</a></div>{" "}</div>{" "}</div>{" "}
          <div style={{ flex: "2 1 600px", minWidth: "0", borderTop: "1.5px solid #141414" }}>{" "}
            <div style={{ borderBottom: "1px solid #D6CCB8" }}>{" "}
              <button type="button" onClick={() => b.toggleFaq(0)} aria-expanded={b.faqOpen === 0} style={{ width: "100%", display: "flex", alignItems: "center", gap: "18px", minHeight: "60px", padding: "13px 0", border: "0", background: "transparent", textAlign: "right", fontFamily: "inherit", cursor: "pointer", color: "#141414" }}>
                <span style={{ flex: "0 0 auto", width: "30px", fontSize: "13px", fontWeight: "800", color: "#7A5D00" }}>{"01"}</span>
                <span style={{ flexGrow: "1", fontSize: "18px", fontWeight: "800", lineHeight: "1.35" }}>{"كم تستغرق مدة الاستقدام؟"}</span>{b.faqOpen === 0 && (<>
                  <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "50%", background: "#141414", color: "#F5C518" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14"></path></svg></span></>)}{b.faqOpen !== 0 && (<>
                  <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "50%", border: "1.5px solid #141414", boxSizing: "border-box", color: "#141414" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 5v14M5 12h14"></path></svg></span></>)}</button>{" "}{b.faqOpen === 0 && (<>
                <p style={{ margin: "0", padding: "0 56px 24px 48px", fontSize: "16px", lineHeight: "1.7", color: "#3D3D3D" }}>{"تختلف المدة حسب الجنسية والمهنة، وتتراوح عادةً بين "}
                  <span className="ph">{"[X]"}</span>{" و "}
                  <span className="ph">{"[Y]"}</span>{" يومًا، ويمكنك متابعة كل مرحلة عبر صفحة تتبّع الطلب."}</p></>)}{" "}</div>{" "}
            <div style={{ borderBottom: "1px solid #D6CCB8" }}>{" "}
              <button type="button" onClick={() => b.toggleFaq(1)} aria-expanded={b.faqOpen === 1} style={{ width: "100%", display: "flex", alignItems: "center", gap: "18px", minHeight: "60px", padding: "13px 0", border: "0", background: "transparent", textAlign: "right", fontFamily: "inherit", cursor: "pointer", color: "#141414" }}>
                <span style={{ flex: "0 0 auto", width: "30px", fontSize: "13px", fontWeight: "800", color: "#7A5D00" }}>{"02"}</span>
                <span style={{ flexGrow: "1", fontSize: "18px", fontWeight: "800", lineHeight: "1.35" }}>{"ما المستندات المطلوبة؟"}</span>{b.faqOpen === 1 && (<>
                  <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "50%", background: "#141414", color: "#F5C518" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14"></path></svg></span></>)}{b.faqOpen !== 1 && (<>
                  <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "50%", border: "1.5px solid #141414", boxSizing: "border-box", color: "#141414" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 5v14M5 12h14"></path></svg></span></>)}</button>{" "}{b.faqOpen === 1 && (<>
                <p style={{ margin: "0", padding: "0 56px 24px 48px", fontSize: "16px", lineHeight: "1.7", color: "#3D3D3D" }}>
                  <span className="ph">{"[صورة الهوية الوطنية أو الإقامة. يُؤكَّد مع العميل.]"}</span>{" وسيرشدك فريقنا خطوة بخطوة."}</p></>)}{" "}</div>{" "}
            <div style={{ borderBottom: "1px solid #D6CCB8" }}>{" "}
              <button type="button" onClick={() => b.toggleFaq(2)} aria-expanded={b.faqOpen === 2} style={{ width: "100%", display: "flex", alignItems: "center", gap: "18px", minHeight: "60px", padding: "13px 0", border: "0", background: "transparent", textAlign: "right", fontFamily: "inherit", cursor: "pointer", color: "#141414" }}>
                <span style={{ flex: "0 0 auto", width: "30px", fontSize: "13px", fontWeight: "800", color: "#7A5D00" }}>{"03"}</span>
                <span style={{ flexGrow: "1", fontSize: "18px", fontWeight: "800", lineHeight: "1.35" }}>{"هل يمكنني اختيار العامل بنفسي؟"}</span>{b.faqOpen === 2 && (<>
                  <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "50%", background: "#141414", color: "#F5C518" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14"></path></svg></span></>)}{b.faqOpen !== 2 && (<>
                  <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "50%", border: "1.5px solid #141414", boxSizing: "border-box", color: "#141414" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 5v14M5 12h14"></path></svg></span></>)}</button>{" "}{b.faqOpen === 2 && (<>
                <p style={{ margin: "0", padding: "0 56px 24px 48px", fontSize: "16px", lineHeight: "1.7", color: "#3D3D3D" }}>{"نعم، نرسل لك السير الذاتية للمرشحين المناسبين لتختار منها. وإذا كان لديك عامل محدّد تعرفه، يمكنك الاستفادة من خدمة «معروفة»."}</p></>)}{" "}</div>{" "}
            <div style={{ borderBottom: "1px solid #D6CCB8" }}>{" "}
              <button type="button" onClick={() => b.toggleFaq(3)} aria-expanded={b.faqOpen === 3} style={{ width: "100%", display: "flex", alignItems: "center", gap: "18px", minHeight: "60px", padding: "13px 0", border: "0", background: "transparent", textAlign: "right", fontFamily: "inherit", cursor: "pointer", color: "#141414" }}>
                <span style={{ flex: "0 0 auto", width: "30px", fontSize: "13px", fontWeight: "800", color: "#7A5D00" }}>{"04"}</span>
                <span style={{ flexGrow: "1", fontSize: "18px", fontWeight: "800", lineHeight: "1.35" }}>{"كيف أتابع طلبي؟"}</span>{b.faqOpen === 3 && (<>
                  <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "50%", background: "#141414", color: "#F5C518" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14"></path></svg></span></>)}{b.faqOpen !== 3 && (<>
                  <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "50%", border: "1.5px solid #141414", boxSizing: "border-box", color: "#141414" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 5v14M5 12h14"></path></svg></span></>)}</button>{" "}{b.faqOpen === 3 && (<>
                <p style={{ margin: "0", padding: "0 56px 24px 48px", fontSize: "16px", lineHeight: "1.7", color: "#3D3D3D" }}>{"استخدم رقم الطلب الذي وصلك بعد التقديم مع رقم جوالك في قسم «تتبّع طلبك»."}</p></>)}{" "}</div>{" "}
            <div style={{ borderBottom: "1px solid #D6CCB8" }}>{" "}
              <button type="button" onClick={() => b.toggleFaq(4)} aria-expanded={b.faqOpen === 4} style={{ width: "100%", display: "flex", alignItems: "center", gap: "18px", minHeight: "60px", padding: "13px 0", border: "0", background: "transparent", textAlign: "right", fontFamily: "inherit", cursor: "pointer", color: "#141414" }}>
                <span style={{ flex: "0 0 auto", width: "30px", fontSize: "13px", fontWeight: "800", color: "#7A5D00" }}>{"05"}</span>
                <span style={{ flexGrow: "1", fontSize: "18px", fontWeight: "800", lineHeight: "1.35" }}>{"ما طرق الدفع المتاحة؟"}</span>{b.faqOpen === 4 && (<>
                  <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "50%", background: "#141414", color: "#F5C518" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14"></path></svg></span></>)}{b.faqOpen !== 4 && (<>
                  <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "50%", border: "1.5px solid #141414", boxSizing: "border-box", color: "#141414" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 5v14M5 12h14"></path></svg></span></>)}</button>{" "}{b.faqOpen === 4 && (<>
                <p style={{ margin: "0", padding: "0 56px 24px 48px", fontSize: "16px", lineHeight: "1.7", color: "#3D3D3D" }}>{"مدى و Apple Pay وفيزا وماستركارد و STC Pay إلكترونيًا، إضافة إلى التحويل البنكي وسداد."}</p></>)}{" "}</div>{" "}
            <div style={{ borderBottom: "1px solid #D6CCB8" }}>{" "}
              <button type="button" onClick={() => b.toggleFaq(5)} aria-expanded={b.faqOpen === 5} style={{ width: "100%", display: "flex", alignItems: "center", gap: "18px", minHeight: "60px", padding: "13px 0", border: "0", background: "transparent", textAlign: "right", fontFamily: "inherit", cursor: "pointer", color: "#141414" }}>
                <span style={{ flex: "0 0 auto", width: "30px", fontSize: "13px", fontWeight: "800", color: "#7A5D00" }}>{"06"}</span>
                <span style={{ flexGrow: "1", fontSize: "18px", fontWeight: "800", lineHeight: "1.35" }}>{"هل يجب دفع المبلغ كاملًا مقدّمًا؟"}</span>{b.faqOpen === 5 && (<>
                  <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "50%", background: "#141414", color: "#F5C518" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14"></path></svg></span></>)}{b.faqOpen !== 5 && (<>
                  <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "50%", border: "1.5px solid #141414", boxSizing: "border-box", color: "#141414" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 5v14M5 12h14"></path></svg></span></>)}</button>{" "}{b.faqOpen === 5 && (<>
                <p style={{ margin: "0", padding: "0 56px 24px 48px", fontSize: "16px", lineHeight: "1.7", color: "#3D3D3D" }}>{"ليس دائمًا؛ بعض الباقات تتيح دفع عربون إلكترونيًا للبدء، والمتبقي لاحقًا، وتظهر شروط الدفع بوضوح في كل باقة."}</p></>)}{" "}</div>{" "}
            <div style={{ borderBottom: "1px solid #D6CCB8" }}>{" "}
              <button type="button" onClick={() => b.toggleFaq(6)} aria-expanded={b.faqOpen === 6} style={{ width: "100%", display: "flex", alignItems: "center", gap: "18px", minHeight: "60px", padding: "13px 0", border: "0", background: "transparent", textAlign: "right", fontFamily: "inherit", cursor: "pointer", color: "#141414" }}>
                <span style={{ flex: "0 0 auto", width: "30px", fontSize: "13px", fontWeight: "800", color: "#7A5D00" }}>{"07"}</span>
                <span style={{ flexGrow: "1", fontSize: "18px", fontWeight: "800", lineHeight: "1.35" }}>{"ماذا لو لم يناسبني العامل؟"}</span>{b.faqOpen === 6 && (<>
                  <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "50%", background: "#141414", color: "#F5C518" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14"></path></svg></span></>)}{b.faqOpen !== 6 && (<>
                  <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "50%", border: "1.5px solid #141414", boxSizing: "border-box", color: "#141414" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 5v14M5 12h14"></path></svg></span></>)}</button>{" "}{b.faqOpen === 6 && (<>
                <p style={{ margin: "0", padding: "0 56px 24px 48px", fontSize: "16px", lineHeight: "1.7", color: "#3D3D3D" }}>{"حقوقك محفوظة وفق شروط الضمان في العقد الرسمي الموحّد، بما في ذلك "}
                  <span className="ph">{"[الاستبدال أو الاسترداد خلال فترة التجربة. تُؤكَّد الشروط مع العميل.]"}</span></p></>)}{" "}</div>{" "}
            <div style={{ borderBottom: "1px solid #D6CCB8" }}>{" "}
              <button type="button" onClick={() => b.toggleFaq(7)} aria-expanded={b.faqOpen === 7} style={{ width: "100%", display: "flex", alignItems: "center", gap: "18px", minHeight: "60px", padding: "13px 0", border: "0", background: "transparent", textAlign: "right", fontFamily: "inherit", cursor: "pointer", color: "#141414" }}>
                <span style={{ flex: "0 0 auto", width: "30px", fontSize: "13px", fontWeight: "800", color: "#7A5D00" }}>{"08"}</span>
                <span style={{ flexGrow: "1", fontSize: "18px", fontWeight: "800", lineHeight: "1.35" }}>{"هل مكتب عراقة مرخّص؟"}</span>{b.faqOpen === 7 && (<>
                  <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "50%", background: "#141414", color: "#F5C518" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14"></path></svg></span></>)}{b.faqOpen !== 7 && (<>
                  <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "50%", border: "1.5px solid #141414", boxSizing: "border-box", color: "#141414" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 5v14M5 12h14"></path></svg></span></>)}</button>{" "}{b.faqOpen === 7 && (<>
                <p style={{ margin: "0", padding: "0 56px 24px 48px", fontSize: "16px", lineHeight: "1.7", color: "#3D3D3D" }}>{"نعم، عراقة مكتب استقدام مرخّص رسميًا (رقم الترخيص "}
                  <bdi dir="ltr">{"SAU100000011004"}</bdi>{"‏)، وجميع عقودنا نظامية وموثّقة."}</p></>)}{" "}</div>{" "}
            <div style={{ borderBottom: "1px solid #D6CCB8" }}>{" "}
              <button type="button" onClick={() => b.toggleFaq(8)} aria-expanded={b.faqOpen === 8} style={{ width: "100%", display: "flex", alignItems: "center", gap: "18px", minHeight: "60px", padding: "13px 0", border: "0", background: "transparent", textAlign: "right", fontFamily: "inherit", cursor: "pointer", color: "#141414" }}>
                <span style={{ flex: "0 0 auto", width: "30px", fontSize: "13px", fontWeight: "800", color: "#7A5D00" }}>{"09"}</span>
                <span style={{ flexGrow: "1", fontSize: "18px", fontWeight: "800", lineHeight: "1.35" }}>{"هل تقدّمون خدمة نقل الخدمات؟"}</span>{b.faqOpen === 8 && (<>
                  <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "50%", background: "#141414", color: "#F5C518" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14"></path></svg></span></>)}{b.faqOpen !== 8 && (<>
                  <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "50%", border: "1.5px solid #141414", boxSizing: "border-box", color: "#141414" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 5v14M5 12h14"></path></svg></span></>)}</button>{" "}{b.faqOpen === 8 && (<>
                <p style={{ margin: "0", padding: "0 56px 24px 48px", fontSize: "16px", lineHeight: "1.7", color: "#3D3D3D" }}>{"نعم، نتولّى إجراءات نقل خدمات العامل المنزلي إليك بشكل نظامي."}</p></>)}{" "}</div>{" "}</div></div></section>{" "}
      <section id="contact" style={{ padding: "48px 0" }}>{" "}
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px", boxSizing: "border-box" }}>{" "}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "28px", padding: "36px 44px", borderRadius: "24px", background: "#141414", position: "relative", overflow: "hidden" }}>{" "}
            <div style={{ position: "absolute", left: "-60px", top: "-130px", width: "200px", height: "200px", borderRadius: "50%", border: "36px solid #F5C518" }}></div>{" "}
            <div style={{ position: "relative", flex: "1 1 420px", minWidth: "0" }}>
              <h2 style={{ margin: "0", fontFamily: "'Noto Kufi Arabic', 'IBM Plex Sans Arabic', sans-serif", fontWeight: "600", fontSize: "40px", lineHeight: "1.45", color: "#FFFFFF" }}>{"جاهز تبدأ رحلة الراحة لأسرتك؟"}</h2>
              <p style={{ margin: "12px 0 0", fontSize: "17px", lineHeight: "1.6", color: "#CFCAC0" }}>{"أرسل طلبك في أقل من دقيقة، وسيتواصل معك فريقنا في أقرب وقت."}</p></div>{" "}
            <div style={{ position: "relative", display: "flex", flexWrap: "wrap", gap: "12px", paddingLeft: "130px" }}>
              <a href="#request" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", minHeight: "50px", padding: "0 24px", borderRadius: "10px", background: "#F5C518", color: "#141414", fontWeight: "700", fontSize: "15px", textDecoration: "none", boxSizing: "border-box" }}>{"قدّم طلب استقدام "}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M19 12H5M11 6l-6 6 6 6"></path></svg></a>
              <a href="tel:0112662266" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", minHeight: "50px", padding: "0 24px", borderRadius: "10px", background: "transparent", border: "1.5px solid #141414", fontWeight: "700", fontSize: "15px", textDecoration: "none", boxSizing: "border-box", color: "#FFFFFF", borderColor: "#FFFFFF" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 3.5h3.5l2 5-2.4 1.5a11 11 0 0 0 5.9 5.9l1.5-2.4 5 2v3.5a2 2 0 0 1-2 2A17 17 0 0 1 3 5.5a2 2 0 0 1 2-2z"></path></svg>{"اتصل بنا"}</a></div>{" "}</div>{" "}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "48px", marginTop: "44px" }}>{" "}
            <div style={{ flex: "1 1 400px", minWidth: "0" }}>{" "}
              <p style={{ margin: "0 0 14px", fontSize: "12px", fontWeight: "800", letterSpacing: "0", textTransform: "uppercase", color: "#7A5D00" }}>{"تواصل معنا"}</p>
              <h2 style={{ margin: "0", fontFamily: "'Noto Kufi Arabic', 'IBM Plex Sans Arabic', sans-serif", fontWeight: "600", fontSize: "44px", lineHeight: "1.45", letterSpacing: "0", color: "#141414", maxWidth: "720px" }}>{"يسعدنا خدمتك"}</h2>{" "}
              <p style={{ margin: "16px 0 0", fontSize: "16px", lineHeight: "1.65", color: "#3D3D3D", maxWidth: "460px" }}>{"زُرنا في مكتبنا أو اتصل بنا أو راسلنا عبر البريد الإلكتروني، ويسعدنا الرد على استفساراتك."}</p>{" "}
              <div style={{ display: "flex", flexDirection: "column", marginTop: "24px", borderTop: "1px solid #E4DCCB" }}>{" "}
                <div style={{ display: "flex", gap: "16px", padding: "14px 0", borderBottom: "1px solid #E4DCCB" }}>
                  <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "42px", height: "42px", borderRadius: "12px", background: "#141414", color: "#F5C518" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"></path>
                      <circle cx="12" cy="10" r="2.3"></circle></svg></span>
                  <div style={{ minWidth: "0" }}>
                    <p style={{ margin: "0", fontSize: "12px", fontWeight: "800", letterSpacing: "0", textTransform: "uppercase", color: "#5C5A55" }}>{"العنوان"}</p>
                    <p style={{ margin: "3px 0 0", fontSize: "15px", fontWeight: "600", lineHeight: "1.5", color: "#141414" }}>{"2533 طريق الإمام سعود بن فيصل، حي حطين، الرياض 13518، المملكة العربية السعودية"}</p></div></div>{" "}
                <div style={{ display: "flex", gap: "16px", padding: "14px 0", borderBottom: "1px solid #E4DCCB" }}>
                  <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "42px", height: "42px", borderRadius: "12px", background: "#141414", color: "#F5C518" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 3.5h3.5l2 5-2.4 1.5a11 11 0 0 0 5.9 5.9l1.5-2.4 5 2v3.5a2 2 0 0 1-2 2A17 17 0 0 1 3 5.5a2 2 0 0 1 2-2z"></path></svg></span>
                  <div style={{ minWidth: "0" }}>
                    <p style={{ margin: "0", fontSize: "12px", fontWeight: "800", letterSpacing: "0", textTransform: "uppercase", color: "#5C5A55" }}>{"الرقم الموحّد"}</p>
                    <p style={{ margin: "3px 0 0", fontSize: "15px", fontWeight: "600", lineHeight: "1.5", color: "#141414" }}>
                      <a href="tel:0112662266" style={{ color: "inherit", textDecoration: "none" }}>
                        <bdi dir="ltr">{"011 266 2266"}</bdi></a></p></div></div>{" "}
                <div style={{ display: "flex", gap: "16px", padding: "14px 0", borderBottom: "1px solid #E4DCCB" }}>
                  <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "42px", height: "42px", borderRadius: "12px", background: "#141414", color: "#F5C518" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 3.5h3.5l2 5-2.4 1.5a11 11 0 0 0 5.9 5.9l1.5-2.4 5 2v3.5a2 2 0 0 1-2 2A17 17 0 0 1 3 5.5a2 2 0 0 1 2-2z"></path></svg></span>
                  <div style={{ minWidth: "0" }}>
                    <p style={{ margin: "0", fontSize: "12px", fontWeight: "800", letterSpacing: "0", textTransform: "uppercase", color: "#5C5A55" }}>{"الجوال"}</p>
                    <p style={{ margin: "3px 0 0", fontSize: "15px", fontWeight: "600", lineHeight: "1.5", color: "#141414" }}>
                      <bdi dir="ltr">{"055 426 2255"}</bdi>{" · "}
                      <bdi dir="ltr">{"055 426 2277"}</bdi>{" · "}
                      <bdi dir="ltr">{"055 426 2288"}</bdi>{" · "}
                      <bdi dir="ltr">{"056 888 8044"}</bdi></p></div></div>{" "}
                <div style={{ display: "flex", gap: "16px", padding: "14px 0", borderBottom: "1px solid #E4DCCB" }}>
                  <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "42px", height: "42px", borderRadius: "12px", background: "#141414", color: "#F5C518" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                      <path d="M3.5 6.5l8.5 6 8.5-6"></path></svg></span>
                  <div style={{ minWidth: "0" }}>
                    <p style={{ margin: "0", fontSize: "12px", fontWeight: "800", letterSpacing: "0", textTransform: "uppercase", color: "#5C5A55" }}>{"البريد الإلكتروني"}</p>
                    <p style={{ margin: "3px 0 0", fontSize: "15px", fontWeight: "600", lineHeight: "1.5", color: "#141414" }}>
                      <a href="mailto:info@araqah.com" style={{ color: "inherit", textDecoration: "none" }}>{"info@araqah.com"}</a></p></div></div>{" "}
                <div style={{ display: "flex", gap: "16px", padding: "14px 0", borderBottom: "1px solid #E4DCCB" }}>
                  <span style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "42px", height: "42px", borderRadius: "12px", background: "#141414", color: "#F5C518" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="8.5"></circle>
                      <path d="M12 7.5V12l3 2"></path></svg></span>
                  <div style={{ minWidth: "0" }}>
                    <p style={{ margin: "0", fontSize: "12px", fontWeight: "800", letterSpacing: "0", textTransform: "uppercase", color: "#5C5A55" }}>{"ساعات العمل"}</p>
                    <p style={{ margin: "3px 0 0", fontSize: "15px", fontWeight: "600", lineHeight: "1.5", color: "#141414" }}>{"الأحد – الخميس، 9:00 ص – 9:00 م"}</p></div></div>{" "}</div>{" "}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "24px" }}>{" "}
                <a href="tel:0112662266" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", minHeight: "50px", padding: "0 24px", borderRadius: "10px", background: "#141414", color: "#FFFFFF", fontWeight: "700", fontSize: "15px", textDecoration: "none", boxSizing: "border-box" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 3.5h3.5l2 5-2.4 1.5a11 11 0 0 0 5.9 5.9l1.5-2.4 5 2v3.5a2 2 0 0 1-2 2A17 17 0 0 1 3 5.5a2 2 0 0 1 2-2z"></path></svg>{"اتصل بنا"}</a>{" "}
                <a href="mailto:info@araqah.com" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", minHeight: "50px", padding: "0 24px", borderRadius: "10px", background: "transparent", color: "#141414", border: "1.5px solid #141414", fontWeight: "700", fontSize: "15px", textDecoration: "none", boxSizing: "border-box" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                    <path d="M3.5 6.5l8.5 6 8.5-6"></path></svg>{"راسلنا"}</a>{" "}
                <a href="https://maps.google.com/?q=2533+Imam+Saud+bin+Faisal+Road+Hittin+Riyadh" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", minHeight: "50px", padding: "0 24px", borderRadius: "10px", background: "transparent", color: "#141414", border: "1.5px solid #141414", fontWeight: "700", fontSize: "15px", textDecoration: "none", boxSizing: "border-box" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"></path>
                    <circle cx="12" cy="10" r="2.3"></circle></svg>{"احصل على الاتجاهات"}</a>{" "}</div>{" "}
              <p style={{ margin: "22px 0 0", fontSize: "14px", color: "#3D3D3D" }}>{"تابعنا: إكس "}
                <bdi dir="ltr">{"@Araqah1"}</bdi>{" · إنستغرام "}
                <bdi dir="ltr">{"@araqah.1"}</bdi>{" · يوتيوب · فيسبوك"}</p>{" "}</div>{" "}
            <div id="request" style={{ flex: "1 1 500px", minWidth: "0" }}>{" "}
              <form style={{ padding: "32px", borderRadius: "24px", background: "#FFFFFF", border: "1px solid #E4DCCB", boxShadow: "0 24px 60px rgba(20,20,20,0.08)" }} ref={b.formRef} onSubmit={b.onSubmit} noValidate>{" "}
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                  <h3 style={{ margin: "0", fontFamily: "'Noto Kufi Arabic', 'IBM Plex Sans Arabic', sans-serif", fontSize: "30px", fontWeight: "600", color: "#141414" }}>{"طلب استقدام"}</h3>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "999px", background: "#F2ECDF", fontSize: "12px", fontWeight: "800", color: "#141414" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="8.5"></circle>
                      <path d="M12 7.5V12l3 2"></path></svg>{"أقل من دقيقة"}</span></div>{" "}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px", marginTop: "22px" }}>{" "}
                  <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", fontWeight: "700", color: "#141414" }}>{"الاسم الكامل"}
                    <input type="text" style={{ width: "100%", boxSizing: "border-box", height: "48px", padding: "0 14px", borderRadius: "10px", border: "1.5px solid #E4DCCB", background: "#FAF7F0", color: "#141414", fontSize: "15px", fontFamily: "inherit" }} name="fullName" autoComplete="name" /></label>{" "}
                  <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", fontWeight: "700", color: "#141414" }}>{"رقم الجوال"}
                    <input type="tel" placeholder="05XXXXXXXX" style={{ width: "100%", boxSizing: "border-box", height: "48px", padding: "0 14px", borderRadius: "10px", border: "1.5px solid #E4DCCB", background: "#FAF7F0", color: "#141414", fontSize: "15px", fontFamily: "inherit" }} name="phone" autoComplete="tel" inputMode="tel" /></label>{" "}
                  <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", fontWeight: "700", color: "#141414" }}>{"المدينة"}
                    <input type="text" placeholder="الرياض" style={{ width: "100%", boxSizing: "border-box", height: "48px", padding: "0 14px", borderRadius: "10px", border: "1.5px solid #E4DCCB", background: "#FAF7F0", color: "#141414", fontSize: "15px", fontFamily: "inherit" }} name="city" autoComplete="address-level2" /></label>{" "}
                  <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", fontWeight: "700", color: "#141414" }}>{"نوع الخدمة"}
                    <select style={{ width: "100%", boxSizing: "border-box", height: "48px", padding: "0 14px", borderRadius: "10px", border: "1.5px solid #E4DCCB", background: "#FAF7F0", color: "#141414", fontSize: "15px", fontFamily: "inherit" }} name="serviceType">{b.options.serviceType.map((o) => (<option key={o.code} value={o.code}>{o.label}</option>))}</select></label>{" "}
                  <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", fontWeight: "700", color: "#141414" }}>{"المهنة المطلوبة"}
                    <select style={{ width: "100%", boxSizing: "border-box", height: "48px", padding: "0 14px", borderRadius: "10px", border: "1.5px solid #E4DCCB", background: "#FAF7F0", color: "#141414", fontSize: "15px", fontFamily: "inherit" }} name="profession">{b.options.profession.map((o) => (<option key={o.code} value={o.code}>{o.label}</option>))}</select></label>{" "}
                  <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", fontWeight: "700", color: "#141414" }}>{"الجنسية المطلوبة"}
                    <select style={{ width: "100%", boxSizing: "border-box", height: "48px", padding: "0 14px", borderRadius: "10px", border: "1.5px solid #E4DCCB", background: "#FAF7F0", color: "#141414", fontSize: "15px", fontFamily: "inherit" }} name="nationality">{b.options.nationality.map((o) => (<option key={o.code} value={o.code}>{o.label}</option>))}</select></label>{" "}</div>{" "}
                <fieldset style={{ margin: "16px 0 0", padding: "0", border: "0" }}>
                  <legend style={{ padding: "0", marginBottom: "8px", fontSize: "13px", fontWeight: "700", color: "#141414" }}>{"طريقة التواصل المفضّلة"}</legend>
                  <div style={{ display: "flex", gap: "10px" }}>{" "}
                    <label style={{ display: "inline-flex", alignItems: "center", gap: "8px", minHeight: "44px", padding: "0 16px", borderRadius: "10px", border: "1.5px solid #141414", fontSize: "15px", fontWeight: "700", color: "#141414" }} className="radio-opt">
                      <input type="radio" name="contact" defaultChecked style={{ accentColor: "#141414" }} value="call" />{"اتصل"}</label>{" "}
                    <label style={{ display: "inline-flex", alignItems: "center", gap: "8px", minHeight: "44px", padding: "0 16px", borderRadius: "10px", border: "1.5px solid #E4DCCB", fontSize: "15px", fontWeight: "700", color: "#141414" }} className="radio-opt">
                      <input type="radio" name="contact" style={{ accentColor: "#141414" }} value="email" />{"البريد الإلكتروني"}</label>{" "}</div></fieldset>{" "}
                <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", fontWeight: "700", color: "#141414", marginTop: "16px" }}>{"ملاحظات أو طلبات خاصة"}
                  <textarea rows={3} style={{ width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: "10px", border: "1.5px solid #E4DCCB", background: "#FAF7F0", color: "#141414", fontSize: "15px", fontFamily: "inherit", resize: "vertical" }} name="notes"></textarea></label>{" "}
                <button type="submit" style={{ marginTop: "20px", width: "100%", height: "54px", border: "0", borderRadius: "12px", background: "#F5C518", color: "#141414", fontSize: "16px", fontWeight: "800", fontFamily: "inherit", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px" }} disabled={b.submitting}>{"إرسال الطلب "}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M19 12H5M11 6l-6 6 6 6"></path></svg></button>
                {b.formError && (<p role="alert" style={{ margin: "12px 0 0", fontSize: "14px", fontWeight: "700", color: "#B42318", textAlign: "center" }}>{b.formError}</p>)}{" "}
                <p style={{ margin: "12px 0 0", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "13px", color: "#5C5A55" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="5" y="10.5" width="14" height="10" rx="2"></rect>
                    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"></path></svg>{"ستحصل على رقم تتبّع فور إرسال الطلب."}</p>{" "}</form>{" "}</div>{" "}</div>{" "}</div>{" "}</section>{" "}
      <footer style={{ background: "#0E0E0D", padding: "44px 0 22px" }}>{" "}
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px", boxSizing: "border-box" }}>{" "}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "40px" }}>{" "}
            <div style={{ minWidth: "0" }}>{" "}
              <Image alt="عراقة للاستقدام" style={{ width: "230px", maxWidth: "100%", height: "auto", display: "block" }} src="/images/araqah-logo-footer.png" width={230} height={115} />{" "}
              <p style={{ margin: "20px 0 0", fontSize: "14px", lineHeight: "1.65", color: "#CFCAC0", maxWidth: "300px" }}>{"عراقة للاستقدام: مكتب مرخّص لاستقدام العمالة المنزلية المدرّبة في الرياض."}</p>{" "}</div>{" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
              <p style={{ margin: "0 0 6px", fontSize: "12px", fontWeight: "800", letterSpacing: "0", textTransform: "uppercase", color: "#F5C518" }}>{"روابط سريعة"}</p>
              <a href="#about" style={{ color: "#CFCAC0", textDecoration: "none", fontSize: "15px", padding: "3px 0" }}>{"من نحن"}</a>
              <a href="#services" style={{ color: "#CFCAC0", textDecoration: "none", fontSize: "15px", padding: "3px 0" }}>{"خدماتنا"}</a>
              <a href="#track" style={{ color: "#CFCAC0", textDecoration: "none", fontSize: "15px", padding: "3px 0" }}>{"تتبّع الطلب"}</a>
              <a href="#faq" style={{ color: "#CFCAC0", textDecoration: "none", fontSize: "15px", padding: "3px 0" }}>{"الأسئلة الشائعة"}</a>
              <a href="#contact" style={{ color: "#CFCAC0", textDecoration: "none", fontSize: "15px", padding: "3px 0" }}>{"تواصل معنا"}</a></div>{" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
              <p style={{ margin: "0 0 6px", fontSize: "12px", fontWeight: "800", letterSpacing: "0", textTransform: "uppercase", color: "#F5C518" }}>{"خدماتنا"}</p>
              <a href="#services" style={{ color: "#CFCAC0", textDecoration: "none", fontSize: "15px", padding: "3px 0" }}>{"عاملة منزلية"}</a>
              <a href="#services" style={{ color: "#CFCAC0", textDecoration: "none", fontSize: "15px", padding: "3px 0" }}>{"سائق خاص"}</a>
              <a href="#services" style={{ color: "#CFCAC0", textDecoration: "none", fontSize: "15px", padding: "3px 0" }}>{"مربية أطفال"}</a>
              <a href="#services" style={{ color: "#CFCAC0", textDecoration: "none", fontSize: "15px", padding: "3px 0" }}>{"طبّاخ / طبّاخة"}</a>
              <a href="#services" style={{ color: "#CFCAC0", textDecoration: "none", fontSize: "15px", padding: "3px 0" }}>{"مقدّمة رعاية"}</a>
              <a href="#services" style={{ color: "#CFCAC0", textDecoration: "none", fontSize: "15px", padding: "3px 0" }}>{"نقل الخدمات"}</a></div>{" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
              <p style={{ margin: "0 0 6px", fontSize: "12px", fontWeight: "800", letterSpacing: "0", textTransform: "uppercase", color: "#F5C518" }}>{"تواصل معنا"}</p>{" "}
              <a href="tel:0112662266" style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "18px", fontWeight: "800", padding: "3px 0" }}>
                <bdi dir="ltr">{"011 266 2266"}</bdi></a>{" "}
              <a href="mailto:info@araqah.com" style={{ color: "#CFCAC0", textDecoration: "none", fontSize: "15px", padding: "3px 0" }}>{"info@araqah.com"}</a>{" "}
              <p style={{ margin: "4px 0 0", fontSize: "14px", lineHeight: "1.55", color: "#CFCAC0" }}>{"2533 طريق الإمام سعود بن فيصل، حي حطين، الرياض 13518"}</p>{" "}
              <p style={{ margin: "8px 0 0", fontSize: "14px", color: "#CFCAC0" }}>{"إكس "}
                <bdi dir="ltr">{"@Araqah1"}</bdi>{" · إنستغرام "}
                <bdi dir="ltr">{"@araqah.1"}</bdi></p>{" "}</div>{" "}</div>{" "}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "16px", marginTop: "28px", paddingTop: "18px", borderTop: "1px solid #2B2A27", fontSize: "13px", color: "#A9A397" }}>{" "}
            <p style={{ margin: "0" }}>{"الترخيص: "}
              <bdi dir="ltr">{"SAU100000011004"}</bdi></p>{" "}{" "}</div>{" "}
          <p style={{ margin: "14px 0 0", fontSize: "13px", color: "#A9A397" }}>{"© 2026 عراقة للاستقدام. جميع الحقوق محفوظة."}</p>{" "}</div>{" "}</footer>{" "}</div>
  );
}
