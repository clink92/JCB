import React, { useState } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';
import Slider from "react-slick"; // Ensure react-slick is imported
import Button from "./components/Button";
import FeatureCard from "./components/FeatureCard";
import QuoteForm from "./components/QuoteForm";
import Login from "./components/Login";
import AdminQuotes from "./components/AdminQuotes";
import About from "./components/About";
import Gallery from "./components/Gallery";
import ManageQuotes from './pages/ManageQuotes';
import Blog from "./pages/Blog";
import InvoiceDashboard from './components/InvoiceDashboard'; // Import the new component
import AdminInvoices from "./components/AdminInvoices"; // Import the AdminInvoices component
import NotFound from './components/NotFound';
import './App.css'; // Import custom styles if needed
import "slick-carousel/slick/slick.css"; // Ensure slick-carousel CSS is imported
import "slick-carousel/slick/slick-theme.css"; // Ensure slick-carousel theme CSS is imported

// Move the auth import to the top with other imports
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

// Optionally import the initialized app if needed:
// import { app, analytics } from "./firebaseConfig";

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
        en: "Great service, quick response, and excellent work. Highly recommended!",
        th: "บริการดีมากค่ะ ติดต่องานรวดเร็ว ทำงานดีทำงานไว จึ้งมากค่ะคุณน้า"
      },
      author: "Toon Chaiklang"
    },
    {
      quote: {
        en: "Leveled the land quickly and efficiently. Great advice from Koko.",
        th: "ปรับหน้าดินที่เปล่าทำงานเรียบร้อย รวดเร็วมากค่ะ คุณก้ก็ให้คำแนะนำดีมากค่ะ"
      },
      author: "Nipatri Pistell"
    },
    {
      quote: {
        en: "Fast delivery, professional service. Will definitely use again.",
        th: "ส่งงานเร็ว ไม่ยืดเยื้อ มีความเป็นมืออาชีพมาก คราวหน้าต้องเรียกใช้บริการอีกแน่นอน"
      },
      author: "Craig Link"
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

  // Replace with your new phone number
  const phoneNumber = "060092550";

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

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Check if user has admin claim
        user.getIdTokenResult().then((idTokenResult) => {
          if (idTokenResult.claims.admin) {
            setIsAdmin(true);
            localStorage.setItem('isAdmin', 'true');
          }
        });
      } else {
        setIsAdmin(false);
        localStorage.removeItem('isAdmin');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50">
        {/* Fixed Mobile Navigation */}
        <nav className="sticky top-0 z-50 bg-gradient-to-r from-yellow-700 to-yellow-600 shadow flex items-center justify-between px-4 py-2 text-white">
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
            <Link to="/about" className="text-white hover:bg-yellow-600 px-3 py-2 rounded-md">
              {lang === "th" ? "เกี่ยวกับเรา" : "About Us"}
            </Link>
            <Link to="/gallery" className="text-white hover:bg-yellow-600 px-3 py-2 rounded-md">
              {lang === "th" ? "แกลอรี่" : "Gallery"}
            </Link>
            <Link to="/blog" className="text-white hover:bg-yellow-600 px-3 py-2 rounded-md">
              {lang === "th" ? "บล็อก" : "Blog"}
            </Link>
            
            {isAdmin && (
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
                  onClick={() => navigate('/admin/invoice-dashboard')}
                >
                  {lang === "th" ? "แดชบอร์ดใบแจ้งหนี้" : "Invoice Dashboard"}
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

            {/* Hide phone and messenger links on mobile */}
            <div className="hidden sm:flex items-center space-x-2">
              <a
                href={`tel:${phoneNumber}`}
                onClick={handlePhoneClick}
                className="contact-button"
                aria-label={`Call ${phoneNumber}`}
              >
                <span className="mr-2" role="img" aria-label="phone">📞</span> {phoneNumber}
              </a>

              <button
                className="contact-button"
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
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gradient-to-r from-yellow-700 to-yellow-600 rounded-b-lg shadow-lg">
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
            <Link to="/blog" className="block text-white px-4 py-2">
              {lang === "th" ? "บล็อก" : "Blog"}
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
                  onClick={() => navigate('/admin/invoice-dashboard')}
                >
                  {lang === "th" ? "แดชบอร์ดใบแจ้งหนี้" : "Invoice Dashboard"}
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
              className="contact-button w-full"
              aria-label={`Call ${phoneNumber}`}
            >
              <span className="mr-2" role="img" aria-label="phone">📞</span>
            </a>
            <Button
              className="contact-button w-full messenger-link"
              onClick={() => window.open(messengerLink, "_blank")}
              aria-label="Open Messenger"
            >
              <img
                src="/121580929_1042359612888812_1633869688219687211_n-1 (2).png" // Updated image source
                alt="Messenger Icon"
                className="w-5 h-5" // Removed "mr-2"
              />
              <span>Messenger</span>
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
            <Route path="/blog" element={<Blog lang={lang} />} />
            
            {isAdmin && (
              // Admin-only routes
              <>
                <Route path="/admin" element={<AdminQuotes lang={lang} />} />
                <Route path="/admin/invoice-dashboard" element={<InvoiceDashboard />} />
                <Route path="/admin/invoices" element={<AdminInvoices />} />
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
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                          {
                            icon: "⚙️",
                            title: lang === "th" ? "การบำรุงรักษาและการซ่อมแซม" : "Parts Maintenance & Repair",
                            desc:
                              lang === "th"
                                ? "การบำรุงรักษาและการซ่อมแซมยานพาหนะก่อสร้าง"
                                : "Maintenance and repair for construction vehicles",
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
            <Route path="*" element={<NotFound lang={lang} />} />
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
                className="mt-4 bg-gray-600 hover:bg-gray-500 text-white px-3 py-2 rounded-md text-sm"
              >
                Admin
              </button>
            )}
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}
