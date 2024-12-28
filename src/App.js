import React, { useState } from "react";
import { Route, Routes, useNavigate, Link, useLocation } from "react-router-dom";
import ReactGA from 'react-ga';
import Slider from "react-slick";
import Button from "./components/Button";
import FeatureCard from "./components/FeatureCard";
import QuoteForm from "./components/QuoteForm";
import Login from "./components/Login";
import AdminQuotes from "./components/AdminQuotes";
import About from "./components/About";
import Gallery from "./components/Gallery";
import ManageQuotes from './pages/ManageQuotes';
import './App.css'; // Import custom styles if needed
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Initialize Google Analytics
ReactGA.initialize('UA-XXXXXXXXX-X'); // Replace with your Google Analytics tracking ID
ReactGA.pageview(window.location.pathname + window.location.search);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

function TestimonialCarousel({ lang }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const testimonials = [
    {
      quote: {
        en: "Great service, helped us finish a major construction job on time!",
        th: "บริการดีเยี่ยม ช่วยให้เราทำงานก่อสร้างขนาดใหญ่เสร็จตรงเวลา!"
      },
      author: "John, ACME Constructions"
    },
    {
      quote: {
        en: "Reliable equipment and professional operators. Highly recommend.",
        th: "อุปกรณ์เชื่อถือได้และผู้ปฏิบัติงานมืออาชีพ แนะนำอย่างยิ่ง"
      },
      author: "Sarah, BuildRight Corp"
    },
    {
      quote: {
        en: "Quick response and excellent support throughout our project.",
        th: "ตอบสนองรวดเร็วและสนับสนุนดีเยี่ยมตลอดโครงการของเรา"
      },
      author: "Mike, XYZ Contractors"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">
          {lang === "th" ? "คำรับรอง" : "Testimonials"}
        </h2>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="text-center">
              <blockquote className="italic text-gray-600">
                "{testimonial.quote[lang]}"
              </blockquote>
              <p className="text-gray-900 font-bold mt-2">- {testimonial.author}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default function App() {
  const [lang, setLang] = React.useState("th");
  const [isAdmin, setIsAdmin] = React.useState(() => localStorage.getItem('isAdmin') === 'true');
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [quoteName, setQuoteName] = React.useState("");
  const [quotePhone, setQuotePhone] = React.useState("");
  const [quoteEmail, setQuoteEmail] = React.useState("");
  const [quoteMessage, setQuoteMessage] = React.useState("");
  const [quoteSubmitted, setQuoteSubmitted] = React.useState(false);
  const [quoteService, setQuoteService] = React.useState("");
  const [quoteStartDate, setQuoteStartDate] = React.useState("");
  const [quoteEndDate, setQuoteEndDate] = React.useState("");
  const [quoteLocationDetails, setQuoteLocationDetails] = React.useState(null);

  // Replace with your real phone number
  const phoneNumber = "0860092550";

  // Replace with your Facebook Messenger link
  // e.g., https://m.me/<pageIDOrUsername>
  const messengerLink = "https://www.facebook.com/chumphl.chum.phung?mibextid=wwXIfr&rdid=8v0nj1uIDVvgoLBr&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FLUAGUiyrWscDyp1F%2F%3Fmibextid%3DwwXIfr";

  // Called after successful quote submission
  const onFormSuccess = () => {
    navigate("/");
    setQuoteSubmitted(false);
    setQuoteName("");
    setQuotePhone("");
    setQuoteEmail("");
    setQuoteMessage("");
    setQuoteStartDate("");
    setQuoteEndDate("");
    setQuoteLocationDetails(null);
  };

  const handlePhoneClick = () => {
    // Optional: Add tracking or analytics here
    console.log("Phone number clicked");
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
    navigate('/');
  };

  React.useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50">
        {/* Fixed Mobile Navigation */}
        <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-800 to-gray-700 shadow flex items-center justify-between px-4 py-2 text-white">
          {/* Logo - Always visible */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')} aria-label="Go to Home">
            <span className="text-2xl font-bold text-white">JCB</span>
            <span className="ml-2 text-xl font-bold text-white hidden sm:block">
              {lang === "th" ? "โกโก้ JCB" : "Koko JCB"}
            </span>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 sm:hidden text-gray-200 hover:text-gray-400 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link to="/about" className="text-gray-200 hover:bg-gray-600 px-3 py-2 rounded-md">
              {lang === "th" ? "เกี่ยวกับเรา" : "About Us"}
            </Link>
            <Link to="/gallery" className="text-gray-200 hover:bg-gray-600 px-3 py-2 rounded-md">
              {lang === "th" ? "แกลอรี่" : "Gallery"}
            </Link>
            
            {isAdmin && (
              <>
                <Button
                  variant="ghost"
                  className="text-gray-200 hover:bg-gray-600"
                  onClick={() => navigate('/admin')}
                >
                  {lang === "th" ? "จัดการคำขอ" : "Manage Quotes"}
                </Button>
                <Button
                  variant="ghost"
                  className="text-gray-200 hover:bg-gray-600"
                  onClick={handleLogout}
                >
                  {lang === "th" ? "ออกจากระบบ" : "Logout"}
                </Button>
              </>
            )}

            <Button
              variant="ghost"
              className="text-gray-200 hover:bg-gray-600"
              onClick={() => setLang(lang === "th" ? "en" : "th")}
            >
              {lang === "th" ? "English" : "ภาษาไทย"}
            </Button>

            {/* Messenger and Phone Number aligned to the right */}
            <div className="flex items-center space-x-2 ml-auto">
              <a
                href={`tel:${phoneNumber}`}
                onClick={handlePhoneClick}
                className="flex items-center bg-gray-600 hover:bg-gray-500 text-white px-3 py-2 rounded-md transition-colors"
                aria-label={`Call ${phoneNumber}`}
              >
                <span className="text-white text-xl mr-2" role="img" aria-label="phone">📞</span> {phoneNumber}
              </a>

              <button
                className="flex items-center bg-gray-600 hover:bg-gray-500 text-white px-3 py-2 rounded-md transition-colors"
                onClick={() => window.open(messengerLink, "_blank")}
                aria-label="Open Messenger"
              >
                <img
                  src="/121580929_1042359612888812_1633869688219687211_n-1 (2).png"
                  alt="Messenger Icon"
                  className="w-5 h-5 mr-2"
                />
                <span>Messenger</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Menu - Slides down when open */}
        <div 
          className={`${isMobileMenuOpen ? 'max-h-screen' : 'max-h-0'} sm:hidden overflow-hidden transition-all duration-300`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-yellow-600 rounded-b-lg shadow-lg">
            <Link
              to="/about"
              className="block px-3 py-2 text-white hover:bg-yellow-700 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
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
            
            {/* Move phone and messenger links here only */}
            <a
              href={`tel:${phoneNumber}`}
              onClick={handlePhoneClick}
              className="block text-yellow-300 bg-white hover:bg-gray-100 px-4 py-2 rounded-md inline-flex items-center font-semibold transition-colors"
              aria-label={`Call ${phoneNumber}`}
            >
              <span className="text-yellow-300 text-xl" role="img" aria-label="phone">📞</span> {phoneNumber}
            </a>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center px-4 py-2 messenger-link"
              onClick={() => window.open(messengerLink, "_blank")}
              aria-label="Open Messenger"
            >
              <img
                src="/121580929_1042359612888812_1633869688219687211_n-1 (2).png" // Updated image source
                alt="Messenger Icon"
                className="w-6 h-6 mr-2 flex-shrink-0"
              />
              <span role="img" aria-label="messenger">Messenger</span>
            </Button>
          </div>
        </div>

        {/* Main Content - Improved Mobile Padding */}
        <main className="flex-grow px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route
              path="/login"
              element={<Login lang={lang} onLogin={setIsAdmin} />}
            />
            <Route
              path="/admin"
              element={
                isAdmin ? (
                  <AdminQuotes lang={lang} />
                ) : (
                  <Login lang={lang} onLogin={setIsAdmin} />
                )
              }
            />
            <Route
              path="/quote"
              element={
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
                  quoteService={quoteService}
                  setQuoteService={setQuoteService}
                  quoteStartDate={quoteStartDate}
                  setQuoteStartDate={setQuoteStartDate}
                  quoteEndDate={quoteEndDate}
                  setQuoteEndDate={setQuoteEndDate}
                  quoteLocationDetails={quoteLocationDetails}
                  setQuoteLocationDetails={setQuoteLocationDetails}
                  onCancel={() => navigate("/")}
                  onSuccess={onFormSuccess}
                />
              }
            />
            <Route path="/about" element={<About lang={lang} />} />
            <Route path="/gallery" element={<Gallery lang={lang} />} />
            <Route path="/manage-quotes" element={<ManageQuotes lang={lang} />} />
            
            {isAdmin && (
              // Admin-only routes
              <>
                {/* <Route path="/additional-admin-route" element={<AdditionalAdminComponent />} /> */}
              </>
            )}

            <Route
              path="/"
              element={
                <>
                  {/* Old homepage sections */}
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
                            onClick={() => navigate("/quote")}
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
                  <section className="py-12 bg-gray-50">
                    <div className="max-w-6xl mx-auto px-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                          {
                            icon: "🚜",
                            title: lang === "th" ? "เช่ารถแบคโฮ" : "Backhoe Rental",
                            desc:
                              lang === "th"
                                ? "บริการให้เช่ารถแบคโฮพร้อมคนขับ" // Corrected string
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
                  <TestimonialCarousel lang={lang} />
                </>
              }
            />
          </Routes>
        </main>

        {/* Mobile-Optimized Footer */}
        <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-gray-400 py-8 px-4">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p>© 2024 {lang === "th" ? "โกโก้ JCB ให้เช่า" : "Koko JCB Rental"}</p>
            <p className="mt-2">
              {lang === "th"
                ? "เปิดทำการ: 6:00 - 18:00 น. ทุกวัน"
                : "Open: 6:00 AM - 6:00 PM Daily"}
            </p>
            <p className="mt-2">24/19 วัชรพล คลองถนน กรุงเทพฯ 10220</p>
            {!isAdmin && (
              <button
                onClick={() => navigate('/login')}
                className="mt-4 text-sm text-gray-500 hover:text-gray-400"
              >
                Admin
              </button>
            )}
            <a
              href={`tel:${phoneNumber}`}
              onClick={handlePhoneClick}
              className="text-blue-600 bg-white hover:bg-gray-100 px-4 py-2 rounded-md inline-flex items-center font-semibold transition-colors text-lg font-bold"
              aria-label={`Call ${phoneNumber}`}
            >
              <span className="text-blue-500 text-xl mr-2" role="img" aria-label="phone">📞</span> {phoneNumber}
            </a>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}
