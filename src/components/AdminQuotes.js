import React from 'react';
import { ToastContainer } from 'react-toastify'; // Removed 'toast'
import InvoiceGenerator from './InvoiceGenerator';
import 'react-toastify/dist/ReactToastify.css';
import './AdminQuotes.css'; // Import custom styles if needed
import Button from './Button'; // Import Button from its file
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

// Initialize toast notifications

function AdminQuotes({ lang }) {
  const [quotes, setQuotes] = React.useState([]);
  const [filterStatus, setFilterStatus] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('newest');
  const [expandedQuoteId, setExpandedQuoteId] = React.useState(null); // Add state for expanded quote
  // Remove Schedule-related state variables
  // const [selectedDate, setSelectedDate] = React.useState("");
  // const [scheduleType, setScheduleType] = React.useState("rental");
  // const [bookedDates, setBookedDates] = React.useState([]);

  React.useEffect(() => {
    loadQuotes();
    // loadBookedDates(); // Removed related function call
  }, []);

  const loadQuotes = () => {
    const savedQuotes = JSON.parse(localStorage.getItem('quoteSubmissions') || '[]');
    setQuotes(savedQuotes.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
  };

  // Remove loadBookedDates function
  // const loadBookedDates = () => {
  //   const savedQuotes = JSON.parse(localStorage.getItem('quoteSubmissions') || '[]');
  //   const dates = savedQuotes.map(quote => new Date(quote.selectedDate));
  //   setBookedDates(dates);
  // };

  const updateQuoteStatus = (id, newStatus) => {
    const updatedQuotes = quotes.map(quote => 
      quote.id === id ? { ...quote, status: newStatus } : quote
    );
    localStorage.setItem('quoteSubmissions', JSON.stringify(updatedQuotes));
    setQuotes(updatedQuotes);
  };

  const handleDeleteQuote = (quoteId) => {
    const updatedQuotes = quotes.filter(quote => quote.id !== quoteId);
    setQuotes(updatedQuotes);
    localStorage.setItem('quoteSubmissions', JSON.stringify(updatedQuotes));
  };

  const getSortedQuotes = () => {
    const filtered = quotes.filter(quote => 
      filterStatus === 'all' ? true : quote.status === filterStatus
    );
    return sortBy === 'newest' 
      ? filtered 
      : [...filtered].reverse();
  };

  const filteredQuotes = getSortedQuotes();

  const statusOptions = {
    new: { th: "ใหม่", en: "New" },
    contacted: { th: "ติดต่อแล้ว", en: "Contacted" },
    inProgress: { th: "กำลังดำเนินการ", en: "In Progress" },
    completed: { th: "เสร็จสิ้น", en: "Completed" },
    cancelled: { th: "ยกเลิก", en: "Cancelled" }
  };

  // Add new state for invoices
  const [invoices, setInvoices] = React.useState(() => 
    JSON.parse(localStorage.getItem('storedInvoices') || '{}')
  );

  const getInvoiceForQuote = (quoteId) => {
    return invoices[quoteId];
  };

  // Pass to InvoiceGenerator
  const handleInvoiceSaved = (quoteId, invoiceData) => {
    const newInvoices = {
      ...invoices,
      [quoteId]: invoiceData
    };
    setInvoices(newInvoices);
    localStorage.setItem('storedInvoices', JSON.stringify(newInvoices));
  };

  // Remove Schedule-related handler functions
  // const handleDateChange = (date) => {
  //   const dateStr = date.toISOString().split('T')[0];
  //   if (bookedDates.some(d => d.toDateString() === date.toDateString())) {
  //     toast.error(lang === "th" ? "วันนี้ถูกจองแล้ว" : "This date is already booked.");
  //   } else {
  //     setSelectedDate(dateStr);
  //   }
  // };

  // const handleScheduleSave = () => {
  //   if (!selectedDate) {
  //     toast.error(lang === "th" ? "กรุณาเลือกวันที่" : "Please select a date.");
  //     return;
  //   }

  //   if (bookedDates.some(d => d.toDateString() === new Date(selectedDate).toDateString())) {
  //     toast.error(lang === "th" ? "วันนี้ถูกจองแล้ว" : "This date is already booked.");
  //     return;
  //   }

  //   const newSchedule = {
  //     date: selectedDate,
  //     type: scheduleType,
  //     timestamp: new Date().toISOString()
  //   };

  //   const existingSchedules = JSON.parse(localStorage.getItem('storedSchedules') || '[]');
  //   existingSchedules.push(newSchedule);
  //   localStorage.setItem('storedSchedules', JSON.stringify(existingSchedules));

  //   toast.success(lang === "th" ? "บันทึกตารางเรียบร้อยแล้ว" : "Schedule saved successfully.");
  // };

  // Remove handlePushToCalendar function
  // const handlePushToCalendar = (quote) => {
  //   const bookings = JSON.parse(localStorage.getItem('calendarBookings') || '[]');
    
  //   // Check for duplicate quote
  //   const isDuplicate = bookings.some(
  //     (booking) => booking.id === quote.id
  //   );

  //   if (isDuplicate) {
  //     toast.warn(lang === "th" ? "ใบเสนอราคาถูกเพิ่มไปยังปฏิทินแล้ว" : "Quote already added to calendar.");
  //     return;
  //   }

  //   const newBooking = {
  //     id: quote.id,
  //     name: quote.name,
  //     startDate: quote.startDate,
  //     endDate: quote.endDate,
  //     type: scheduleType, // 'rental' or 'rental-service'
  //   };
  //   bookings.push(newBooking);
  //   localStorage.setItem('calendarBookings', JSON.stringify(bookings));
  //   // Remove the unused setBookings call
  //   // setBookings(bookings);
  //   toast.success(lang === "th" ? "เพิ่มไปยังปฏิทินเรียบร้อยแล้ว" : "Added to calendar successfully.");
  // };

  // Define the missing someFunction
  const someFunction = () => {
    // Implement the required functionality
  };

  const toggleDetails = (quoteId) => {
    setExpandedQuoteId(expandedQuoteId === quoteId ? null : quoteId);
  };

  const handleConvertToInvoice = async (quote) => {
    try {
      await addDoc(collection(db, "invoices"), {
        // minimally use quote fields
        client: quote.client,
        amount: quote.amount,
        status: "Pending",
        date: new Date().toISOString(),
        // ...other relevant data...
      });
      alert("Invoice created successfully!");
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };

  const handleAddInvoice = async (invoiceData) => {
    // Validate that 'client' field is defined
    if (!invoiceData.client) {
      console.error("Client field is missing");
      // Optionally, set a default value or return early
      invoiceData.client = "Default Client"; // Example default value
      // Or return to prevent adding the document
      // return;
    }
  
    try {
      await addDoc(collection(db, "invoices"), {
        ...invoiceData,
        client: invoiceData.client, // Ensure 'client' is not undefined
        // ...other fields...
      });
      // ...existing code...
    } catch (error) {
      console.error("Error adding document: ", error);
      // Handle the error as needed
    }
  };

  return (
    <div className="admin-quotes-container">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          {lang === 'th' ? 'จัดการคำขอใบเสนอราคา' : 'Manage Quote Requests'}
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            className="border rounded-md px-3 py-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">{lang === 'th' ? 'ทั้งหมด' : 'All'}</option>
            <option value="new">{lang === 'th' ? 'ใหม่' : 'New'}</option>
            <option value="contacted">{lang === 'th' ? 'ติดต่อแล้ว' : 'Contacted'}</option>
            <option value="completed">{lang === 'th' ? 'เสร็จสิ้น' : 'Completed'}</option>
          </select>
          <select
            className="border rounded-md px-3 py-2"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">{lang === 'th' ? 'ล่าสุด' : 'Newest'}</option>
            <option value="oldest">{lang === 'th' ? 'เก่าสุด' : 'Oldest'}</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredQuotes.length > 0 ? (
          filteredQuotes.map((quote, index) => (
            <div key={quote.id} className="quote-card bg-white rounded-lg shadow-md p-6">
              {/* Queue position & status */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-bold">{`#${index + 1}`}</span>
                <span
                  className={`status-label ${
                    quote.status === 'completed' ? 'completed-status' :
                    quote.status === 'inProgress' ? 'in-progress-status' :
                    quote.status === 'contacted' ? 'contacted-status' : 'new-status'
                  }`}
                  aria-label={`Status: ${quote.status}`}
                >
                  {statusOptions[quote.status][lang]}
                </span>
              </div>

              {/* Collapsible section */}
              <div className="collapsible-section">
                <div className="flex flex-col sm:flex-row justify-between items-start">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span role="img" aria-label="person" className="text-xl">👤</span>
                      <h3 className="font-semibold text-lg">{quote.name}</h3>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="section">
                        <div className="flex items-center gap-2">
                          <span role="img" aria-label="question" className="text-xl">❓</span>
                          <p className="label">
                            {lang === 'th' ? 'คำถาม/ความต้องการ:' : 'Question/Requirements:'}
                          </p>
                        </div>
                        <p className="value">{quote.message || (lang === 'th' ? 'ไม่มีคำถามเพิ่มเติม' : 'No additional questions')}</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                        <div className="section">
                          <p className="label">{lang === 'th' ? 'ข้อมูลการติดต่อ' : 'Contact Info'}</p>
                          <p className="value"><span role="img" aria-label="phone">📞</span> {quote.phone}</p>
                          <p className="value"><span role="img" aria-label="email">✉️</span> {quote.email}</p>
                        </div>
                        <div className="section">
                          <p className="label">{lang === 'th' ? 'รายละเอียดงาน' : 'Job Details'}</p>
                          <p className="value"><span role="img" aria-label="calendar">📅</span> {new Date(quote.startDate).toLocaleDateString()} - {new Date(quote.endDate).toLocaleDateString()}</p>
                          <p className="value"><span role="img" aria-label="location">📍</span> {quote.location}</p>
                        </div>
                      </div>
                    </div>
                    {getInvoiceForQuote(quote.id) && (
                      <div className="mt-3 p-3 bg-yellow-50 rounded-md">
                        <p className="font-medium text-yellow-700">
                          {lang === 'th' ? 'ใบแจ้งหนี้ที่สร้างแล้ว' : 'Generated Invoice'}
                        </p>
                        <p className="text-sm text-yellow-600">
                          #{getInvoiceForQuote(quote.id).invoiceNumber} - 
                          {new Date(getInvoiceForQuote(quote.id).generatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <select
                      className={`border rounded-md px-3 py-2 ${
                        quote.status === 'completed' ? 'bg-green-50 text-green-600' : ''
                      }`}
                      value={quote.status}
                      onChange={(e) => updateQuoteStatus(quote.id, e.target.value)}
                    >
                      {Object.entries(statusOptions).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value[lang]}
                        </option>
                      ))}
                    </select>
                    <div className="flex flex-col gap-2">
                      <Button
                        onClick={() => window.open(`mailto:${quote.email}`)}
                        className="bg-gray-600 hover:bg-gray-500 text-white px-3"
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
                        onClick={() => handleConvertToInvoice(quote)}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Convert to Invoice
                      </Button>
                    </div>
                  </div>
                </div>
                <Button onClick={() => toggleDetails(quote.id)}>
                  {expandedQuoteId === quote.id
                    ? (lang === 'th' ? 'ซ่อนข้อมูล' : 'Hide Details')
                    : (lang === 'th' ? 'แสดงเพิ่มเติม' : 'View More')}
                </Button>
                {expandedQuoteId === quote.id && (
                  <div className="extra-details">
                    {/* Additional or lengthy details can be placed here */}
                    {/* ...existing code... */}
                  </div>
                )}
              </div>
            </div>          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            {lang === 'th' 
              ? 'ไม่พบคำขอใบเสนอราคา'
              : 'No quote requests found'
            }
          </div>
        )}
      </div>

      <button
        className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-2 rounded-md"
        onClick={someFunction}
      >
        {lang === "th" ? "ดำเนินการ" : "Proceed"}
      </button>

      <ToastContainer />
    </div>
  );
}

export default AdminQuotes;