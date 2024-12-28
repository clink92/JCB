import React, { useState } from "react";
import CalendarPage from "./components/CalendarPage"; // Ensure CalendarPage is imported

/* -----------------------------------------
  1) Minimal reusable UI components
  Button, Input, Label, Alert, etc.
-------------------------------------------- */

// A simple button with optional Tailwind props
function Button({ children, className = "", variant, ...props }) {
  let baseStyles =
    "inline-flex items-center px-4 py-2 rounded-md font-semibold transition-colors";
  let variantStyles = "";

  if (variant === "outline") {
    variantStyles =
      "border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-700";
  } else if (variant === "ghost") {
    variantStyles = "text-gray-700 hover:bg-gray-100";
  } else {
    // default or custom color, e.g. bg-yellow-500
    variantStyles = "bg-blue-600 text-white hover:bg-blue-700";
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// A simple input with Tailwind styling
function Input({ className = "", ...props }) {
  const baseStyles =
    "border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500";
  return <input className={`${baseStyles} ${className}`} {...props} />;
}

// A label component
function Label({ children, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block mb-1 font-medium text-gray-700"
    >
      {children}
    </label>
  );
}

// A very minimal alert/description box
function Alert({ className = "", children }) {
  return (
    <div
      className={`border border-gray-300 bg-white rounded-md p-4 shadow-md ${className}`}
    >
      {children}
    </div>
  );
}

function AlertDescription({ children }) {
  return <p className="text-gray-600">{children}</p>;
}

/* -----------------------------------------
  2) FeatureCard - for highlighting services
-------------------------------------------- */
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="transform hover:scale-105 transition duration-300 bg-white shadow rounded-md p-6">
      <div className="text-5xl text-yellow-500 mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

/* -----------------------------------------
  3) QuoteForm - your "Request a Quote" form
-------------------------------------------- */
function QuoteForm({
  lang,
  quoteName,
  setQuoteName,
  quotePhone,
  setQuotePhone,
  quoteEmail,
  setQuoteEmail,
  quoteMessage,
  setQuoteMessage,
  quoteSubmitted,
  setQuoteSubmitted,
  onCancel,
  onSuccess,
}) {
  const [errorMessage, setErrorMessage] = React.useState("");

  // Basic validation
  const phonePattern = /^[+\d]?\d{7,15}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Simulate form submission
  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    // Validate
    if (
      !quoteName.trim() ||
      !quotePhone.trim() ||
      !quoteEmail.trim() ||
      !phonePattern.test(quotePhone) ||
      !emailPattern.test(quoteEmail)
    ) {
      setErrorMessage(
        lang === "th"
          ? "กรุณากรอกข้อมูลให้ถูกต้อง"
          : "Please fill out all required fields correctly."
      );
      return;
    }

    // "Submit" the form
    setQuoteSubmitted(true);
    setTimeout(() => {
      // Clear form and switch route
      onSuccess();
    }, 2000);
  };

  return (
    <section className="py-12 bg-white min-h-screen">
      <div className="max-w-md mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">
          {lang === "th" ? "ขอใบเสนอราคา" : "Request a Quote"}
        </h2>

        {!quoteSubmitted ? (
          <form onSubmit={handleQuoteSubmit} className="space-y-4">
            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}
            <div>
              <Label htmlFor="name">
                {lang === "th" ? "ชื่อ *" : "Name *"}
              </Label>
              <Input
                id="name"
                aria-label={lang === "th" ? "ชื่อ" : "Name"}
                value={quoteName}
                onChange={(e) => setQuoteName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phone">
                {lang === "th" ? "เบอร์โทรศัพท์ *" : "Phone *"}
              </Label>
              <Input
                id="phone"
                aria-label={lang === "th" ? "เบอร์โทรศัพท์" : "Phone"}
                value={quotePhone}
                onChange={(e) => setQuotePhone(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">
                {lang === "th" ? "อีเมล *" : "Email *"}
              </Label>
              <Input
                id="email"
                aria-label={lang === "th" ? "อีเมล" : "Email"}
                type="email"
                value={quoteEmail}
                onChange={(e) => setQuoteEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="message">
                {lang === "th" ? "ข้อความ (ถ้ามี)" : "Message (optional)"}
              </Label>
              <textarea
                id="message"
                aria-label={lang === "th" ? "ข้อความ" : "Message"}
                value={quoteMessage}
                onChange={(e) => setQuoteMessage(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full h-24 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                aria-label={lang === "th" ? "ยกเลิก" : "Cancel"}
              >
                {lang === "th" ? "ยกเลิก" : "Cancel"}
              </Button>
              <Button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white"
                aria-label={lang === "th" ? "ส่งข้อมูล" : "Submit"}
              >
                {lang === "th" ? "ส่งข้อมูล" : "Submit"}
              </Button>
            </div>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-xl font-bold text-gray-900">
              {lang === "th"
                ? "เราได้รับคำขอใบเสนอราคาของคุณแล้ว"
                : "Your inquiry has been received."}
            </p>
            <p className="text-gray-600">
              {lang === "th"
                ? "เราจะติดต่อกลับภายใน 24 ชั่วโมง"
                : "We will get back to you within 24 hours."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* -----------------------------------------
  4) Main App - includes nav, phone link,
     messenger link, features, quote form
-------------------------------------------- */
export default function App() {
  const [lang, setLang] = React.useState("th");
  const [currentRoute, setCurrentRoute] = React.useState("home");
  const [showAlert, setShowAlert] = React.useState(false);

  const [quoteName, setQuoteName] = React.useState("");
  const [quotePhone, setQuotePhone] = React.useState("");
  const [quoteEmail, setQuoteEmail] = React.useState("");
  const [quoteMessage, setQuoteMessage] = React.useState("");
  const [quoteSubmitted, setQuoteSubmitted] = React.useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Replace with your real phone number
  const phoneNumber = "0860092550";

  // Replace with your Facebook Messenger link
  // e.g., https://m.me/<pageIDOrUsername>
  const messengerLink = "https://m.me/<yourPageUsername>";

  // Called after successful quote submission
  const onFormSuccess = () => {
    setCurrentRoute("home");
    setQuoteSubmitted(false);
    setQuoteName("");
    setQuotePhone("");
    setQuoteEmail("");
    setQuoteMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-gradient-to-r from-yellow-700 to-yellow-600 border-b">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo/title */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setCurrentRoute("home")}
            aria-label="Go to Home"
          >
            <span className="text-2xl font-bold text-white">JCB</span>
            <span className="ml-2 text-xl font-bold text-white">
              {lang === "th" ? "โกโก้ JCB" : "Koko JCB"}
            </span>
          </div>

          {/* Hamburger Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
              aria-label="Toggle navigation menu"
            >
              {/* Hamburger Icon */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Nav actions */}
          <div className={`flex items-center gap-4 ${isMobileMenuOpen ? "block" : "hidden"} md:flex`}>
            <Link to="/about" className="text-white hover:bg-yellow-600 px-4 py-2 rounded-md">
              {lang === "th" ? "เกี่ยวกับเรา" : "About Us"}
            </Link>
            <Link to="/gallery" className="text-white hover:bg-yellow-600 px-4 py-2 rounded-md">
              {lang === "th" ? "แกลอรี่" : "Gallery"}
            </Link>
            
            {isAdmin && (
              // Admin-only navigation links
              <>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-yellow-600"
                  onClick={() => navigate('/admin')}
                >
                  {lang === "th" ? "จัดการคำขอ" : "Manage Quotes"}
                </Button>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-yellow-600"
                  onClick={handleLogout}
                >
                  {lang === "th" ? "ออกจากระบบ" : "Logout"}
                </Button>
              </>
            )}

            <Button
              variant="ghost"
              className="text-white hover:bg-yellow-600"
              onClick={() => setLang(lang === "th" ? "en" : "th")}
            >
              {lang === "th" ? "English" : "ภาษาไทย"}
            </Button>

            <a
              href={`tel:${phoneNumber}`}
              onClick={handlePhoneClick}
              className="text-yellow-600 bg-white hover:bg-gray-100 px-4 py-2 rounded-md inline-flex items-center font-semibold transition-colors"
              aria-label={`Call ${phoneNumber}`}
            >
              <span className="text-yellow-300 text-xl" role="img" aria-label="phone">📞</span> {phoneNumber}
            </a>

            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center"
              onClick={() => window.open(messengerLink, "_blank")}
              aria-label="Open Messenger"
            >
              <img
                src="/121580929_1042359612888812_1633869688219687211_n-1 (2).png" // Updated image source
                alt="Messenger Icon"
                className="w-6 h-6 mr-2"
              />
              <span role="img" aria-label="messenger">Messenger</span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-yellow-600">
            <Link to="/about" className="block text-white px-4 py-2">
              {lang === "th" ? "เกี่ยวกับเรา" : "About Us"}
            </Link>
            <Link to="/gallery" className="block text-white px-4 py-2">
              {lang === "th" ? "แกลอรี่" : "Gallery"}
            </Link>
            {isAdmin && (
              <>
                <Button
                  variant="ghost"
                  className="w-full text-left text-white hover:bg-yellow-700 px-4 py-2"
                  onClick={() => navigate('/admin')}
                >
                  {lang === "th" ? "จัดการคำขอ" : "Manage Quotes"}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-left text-white hover:bg-yellow-700 px-4 py-2"
                  onClick={handleLogout}
                >
                  {lang === "th" ? "ออกจากระบบ" : "Logout"}
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              className="w-full text-left text-white hover:bg-yellow-700 px-4 py-2"
              onClick={() => setLang(lang === "th" ? "en" : "th")}
            >
              {lang === "th" ? "English" : "ภาษาไทย"}
            </Button>
            <a
              href={`tel:${phoneNumber}`}
              onClick={handlePhoneClick}
              className="block text-yellow-300 bg-white hover:bg-gray-100 px-4 py-2 rounded-md inline-flex items-center font-semibold transition-colors"
              aria-label={`Call ${phoneNumber}`}
            >
              <span className="text-yellow-300 text-xl" role="img" aria-label="phone">📞</span> {phoneNumber}
            </a>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center px-4 py-2"
              onClick={() => window.open(messengerLink, "_blank")}
              aria-label="Open Messenger"
            >
              <img
                src="/121580929_1042359612888812_1633869688219687211_n-1 (2).png" // Updated image source
                alt="Messenger Icon"
                className="w-6 h-6 mr-2"
              />
              <span role="img" aria-label="messenger">Messenger</span>
            </Button>
          </div>
        )}
      </nav>

      {/* Conditional routing (home or quote form) */}
      {currentRoute === "quote" ? (
        <QuoteForm
          lang={lang}
          quoteName={quoteName}
          setQuoteName={setQuoteName}
          quotePhone={quotePhone}
          setQuotePhone={setQuotePhone}
          quoteEmail={quoteEmail}
          setQuoteEmail={setQuoteEmail}
          quoteMessage={quoteMessage}
          setQuoteMessage={setQuoteMessage}
          quoteSubmitted={quoteSubmitted}
          setQuoteSubmitted={setQuoteSubmitted}
          onCancel={() => setCurrentRoute("home")}
          onSuccess={onFormSuccess}
        />
      ) : (
        <>
          {/* HOME content */}
          <section className="bg-white py-12">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900">
                  <span className="block">
                    {lang === "th"
                      ? "บริการเช่ารถแบคโฮ JCB"
                      : "JCB Backhoe Rental Service"}
                  </span>
                  <span className="block text-yellow-500 mt-2">
                    {lang === "th"
                      ? "สำหรับงานก่อสร้างมืออาชีพ"
                      : "For Construction Companies"}
                  </span>
                </h1>
                <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                  {lang === "th"
                    ? "บริการให้เช่ารถแบคโฮ JCB พร้อมคนขับมืออาชีพ ประสบการณ์กว่า 35 ปี"
                    : "JCB backhoe rental service with professional operators. Over 35 years of experience."}
                </p>
                <div className="mt-8 flex justify-center gap-4">
                  <Button
                    onClick={() => setCurrentRoute("quote")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white"
                    aria-label={
                      lang === "th" ? "ขอใบเสนอราคา" : "Request Quote"
                    }
                  >
                    {lang === "th" ? "ขอใบเสนอราคา" : "Request Quote"}
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Services / Features */}
          <section className="py-12 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: "🚜",
                    title: lang === "th" ? "เช่ารถแบคโฮ" : "Backhoe Rental",
                    desc:
                      lang === "th"
                        ? "บริการให้เช่ารถแบคโฮพร้อมคนขับ"
                        : "Backhoe rental with operator",
                  },
                  {
                    icon: "👷",
                    title: lang === "th" ? "ทีมงานมืออาชีพ" : "Professional Team",
                    desc:
                      lang === "th"
                        ? "ทีมงานที่มีประสบการณ์และความเชี่ยวชาญ"
                        : "Experienced and skilled operators",
                  },
                  {
                    icon: "🏗️",
                    title: lang === "th" ? "งานก่อสร้าง" : "Construction",
                    desc:
                      lang === "th"
                        ? "รับงานก่อสร้างครบวงจร"
                        : "Complete construction services",
                  },
                ].map((feature, idx) => (
                  <FeatureCard key={idx} {...feature} />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>© 2024 {lang === "th" ? "โกโก้ JCB ให้เช่า" : "Koko JCB Rental"}</p>
          <p className="mt-2">
            {lang === "th"
              ? "เปิดทำการ: 6:00 - 18:00 น. ทุกวัน"
              : "Open: 6:00 AM - 6:00 PM Daily"}
          </p>
          <p className="mt-2">24/19 วัชรพล คลองถนน กรุงเทพฯ 10220</p>
        </div>
      </footer>

      {/* Optional Alert (if you still want "Calling..." feedback) */}
      {showAlert && (
        <Alert className="fixed top-4 right-4 w-72">
          <AlertDescription>
            {lang === "th" ? "กำลังโทร..." : "Calling..."}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}