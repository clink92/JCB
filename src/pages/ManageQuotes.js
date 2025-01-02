import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import InvoiceGenerator from '../components/InvoiceGenerator';
import Button from '../components/Button';
import GoogleMapReact from 'google-map-react'; // Ensure correct import
import { useNavigate } from 'react-router-dom';

const ManageQuotes = ({ lang }) => {
  const [quotes, setQuotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuotes = async () => {
      const querySnapshot = await getDocs(collection(db, "quotes"));
      const quotesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuotes(quotesData);
    };

    fetchQuotes();
  }, []);

  const statusOptions = {
    new: { th: "ใหม่", en: "New" },
    contacted: { th: "ติดต่อแล้ว", en: "Contacted" },
    inProgress: { th: "กำลังดำเนินการ", en: "In Progress" },
    completed: { th: "เสร็จสิ้น", en: "Completed" },
    cancelled: { th: "ยกเลิก", en: "Cancelled" },
  };

  const [invoices, setInvoices] = useState(() =>
    JSON.parse(localStorage.getItem('storedInvoices') || '{}')
  );

  const getInvoiceForQuote = (quoteId) => {
    return invoices[quoteId];
  };

  const handleInvoiceSaved = (quoteId, invoiceData) => {
    const newInvoices = {
      ...invoices,
      [quoteId]: invoiceData,
    };
    setInvoices(newInvoices);
    localStorage.setItem('storedInvoices', JSON.stringify(newInvoices));
  };

  const handleDeleteQuote = (quoteId) => {
    const updatedQuotes = quotes.filter((quote) => quote.id !== quoteId);
    setQuotes(updatedQuotes);
    localStorage.setItem('quoteSubmissions', JSON.stringify(updatedQuotes));
  };

  const [hoveredQuote, setHoveredQuote] = useState(null);

  const MapPreview = ({ lat, lng, label }) => {
    if (!lat || !lng) return null;

    return (
      <div className="p-2 bg-white border rounded shadow-lg z-10 w-full sm:w-64">
        <div className="h-40 w-full rounded overflow-hidden shadow">
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
            defaultCenter={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
            defaultZoom={11}
          >
            <div lat={lat} lng={lng} style={{ color: 'red', fontSize: '24px' }}>📍</div>
          </GoogleMapReact>
        </div>
        <p className="mt-2 text-sm text-gray-700">{label}</p>
      </div>
    );
  };

  const [isNavOpen, setIsNavOpen] = useState(false);

  const generateInvoice = async (quote) => {
    const invoice = {
      client: quote.name,
      date: new Date().toISOString(),
      paymentDue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      amount: quote.amount,
      status: 'Pending'
    };

    await addDoc(collection(db, "invoices"), invoice);
    alert('Invoice generated successfully!');
  };

  const handleGenerateInvoice = (quote) => {
    // Navigate to invoice dashboard with data
    navigate('/admin/invoice-dashboard', { state: { invoiceData: quote } });
  };

  const handleCreateInvoice = async (quote) => {
    await addDoc(collection(db, 'invoices'), {
      quoteId: quote.id,
      client: quote.client,
      amount: quote.amount,
      date: new Date().toISOString(),
      status: 'Pending',
      // ...add other fields as needed...
    });
    // ...existing code...
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-yellow-700 to-yellow-600 shadow flex items-center justify-between px-4 py-2 text-white">
        <div className="flex items-center space-x-4">
          <a href="tel:0860092550" className="phone-link">📞 0860092550</a>
          <a href="https://m.me/your-facebook-page" className="messenger-link">💬 Messenger</a>
        </div>
      </nav>
      <nav className="fixed top-0 left-0 right-0 bg-teal-500 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <span className="text-white font-bold text-xl">My App</span>
            </div>
            
            <div className="hidden lg:block">
              <div className="flex items-center space-x-4">
                <button className="text-teal-200 hover:text-white px-3 py-2 rounded-md cursor-pointer">Docs</button>
                <button className="text-teal-200 hover:text-white px-3 py-2 rounded-md cursor-pointer">Examples</button>
                <button className="text-teal-200 hover:text-white px-3 py-2 rounded-md cursor-pointer">Blog</button>
              </div>
            </div>

            <div className="lg:hidden">
              <button
                onClick={() => setIsNavOpen(!isNavOpen)}
                className="text-teal-200 hover:text-white focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isNavOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden ${isNavOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-teal-500 shadow-lg">
            <button className="block w-full text-left text-teal-200 hover:text-white px-3 py-2 rounded-md cursor-pointer">Docs</button>
            <button className="block w-full text-left text-teal-200 hover:text-white px-3 py-2 rounded-md cursor-pointer">Examples</button>
            <button className="block w-full text-left text-teal-200 hover:text-white px-3 py-2 rounded-md cursor-pointer">Blog</button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-16">
        {/* Rest of your content */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8 sm:text-4xl">
          {lang === 'th' ? 'จัดการคำขอใบเสนอราคา' : 'Manage Quote Requests'}
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {quotes.length > 0 ? (
                quotes.map((quote) => (
                  <div key={quote.id} className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span role="img" aria-label="person" className="text-xl">
                              👤
                            </span>
                            <h3 className="font-semibold text-lg">{quote.name}</h3>
                          </div>

                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <span role="img" aria-label="question" className="text-xl">
                                ❓
                              </span>
                              <p className="font-medium">
                                {lang === 'th' ? 'คำถาม/ความต้องการ:' : 'Question/Requirements:'}
                              </p>
                            </div>
                            <p className="ml-7">
                              {quote.message || (lang === 'th' ? 'ไม่มีคำถามเพิ่มเติม' : 'No additional questions')}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                              <div>
                                <p className="font-medium mb-1">{lang === 'th' ? 'ข้อมูลการติดต่อ' : 'Contact Info'}</p>
                                <p>
                                  <span role="img" aria-label="phone">📞</span> {quote.phone}
                                </p>
                                <p>
                                  <span role="img" aria-label="email">✉️</span> {quote.email}
                                </p>
                              </div>
                              <div>
                                <p className="font-medium mb-1">{lang === 'th' ? 'รายละเอียดงาน' : 'Job Details'}</p>
                                <p>
                                  <span role="img" aria-label="calendar">📅</span>{' '}
                                  {new Date(quote.startDate).toLocaleDateString()} -{' '}
                                  {new Date(quote.endDate).toLocaleDateString()}
                                </p>
                                <p
                                  className="relative cursor-pointer"
                                  onMouseEnter={() => setHoveredQuote(quote.id)}
                                  onMouseLeave={() => setHoveredQuote(null)}
                                >
                                  <span role="img" aria-label="location">📍</span>{' '}
                                  {quote.locationDetails?.label || quote.location}
                                  {hoveredQuote === quote.id && quote.locationDetails?.lat && (
                                    <div className="absolute top-0 left-0 mt-8">
                                      <MapPreview
                                        lat={parseFloat(quote.locationDetails.lat)}
                                        lng={parseFloat(quote.locationDetails.lng)}
                                        label={quote.locationDetails.label}
                                      />
                                    </div>
                                  )}
                                </p>
                              </div>
                            </div>
                            {getInvoiceForQuote(quote.id) && (
                              <div className="mt-3 p-3 bg-yellow-50 rounded-md">
                                <p className="font-medium text-yellow-700">
                                  {lang === 'th' ? 'ใบแจ้งหนี้ที่สร้างแล้ว' : 'Generated Invoice'}
                                </p>
                                <p className="text-sm text-yellow-600">
                                  #{getInvoiceForQuote(quote.id).invoiceNumber} -{' '}
                                  {new Date(getInvoiceForQuote(quote.id).generatedAt).toLocaleDateString()}
                                </p>
                              </div>
                            )}
                            <>
                              <select
                                className={`border rounded-md px-3 py-2 ${
                                  quote.status === 'completed' ? 'bg-green-50 text-green-600' : ''
                                }`}
                                value={quote.status}
                                onChange={(e) => {
                                  const updatedQuotes = quotes.map((q) =>
                                    q.id === quote.id ? { ...q, status: e.target.value } : q
                                  );
                                  setQuotes(updatedQuotes);
                                  localStorage.setItem('quoteSubmissions', JSON.stringify(updatedQuotes));
                                }}
                              >
                                {Object.entries(statusOptions).map(([key, value]) => (
                                  <option key={key} value={key}>
                                    {value[lang]}
                                  </option>
                                ))}
                              </select>
                              <div className="flex flex-col gap-2">
                                <Button
                                  onClick={() => window.open(`tel:${quote.phone}`)}
                                  className="bg-green-500 hover:bg-green-600 text-white px-3"
                                  title={lang === 'th' ? 'โทรหาลูกค้า' : 'Call Customer'}
                                >
                                  <span role="img" aria-label="phone">📞</span>
                                </Button>
                                <Button
                                  onClick={() => window.open(`mailto:${quote.email}`)}
                                  className="bg-blue-500 hover:bg-blue-600 text-white px-3"
                                  title={lang === 'th' ? 'ส่งอีเมล' : 'Send Email'}
                                >
                                  <span role="img" aria-label="email">✉️</span>
                                </Button>
                                <InvoiceGenerator
                                  quote={quote}
                                  lang={lang}
                                  onInvoiceSaved={handleInvoiceSaved}
                                  existingInvoice={getInvoiceForQuote(quote.id)}
                                />
                                <Button
                                  onClick={() => handleDeleteQuote(quote.id)}
                                  className="bg-red-500 hover:bg-red-600 text-white px-3"
                                  title={lang === 'th' ? 'ลบ' : 'Delete'}
                                >
                                  <span role="img" aria-label="delete">🗑️</span>
                                </Button>
                                <Button
                                  onClick={() => generateInvoice(quote)}
                                  className="bg-blue-500 text-white px-3 py-1 rounded"
                                >
                                  Generate Invoice
                                </Button>
                                <button onClick={() => handleCreateInvoice(quote)}>
                                  Create Invoice
                                </button>
                              </div>
                            </>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  {lang === 'th' ? 'ไม่พบคำขอใบเสนอราคา' : 'No quote requests found'}
                </div>
              )}
            </div>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageQuotes;