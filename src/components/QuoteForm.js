import React from "react";
import Button from "./Button";
import Input from "./Input";
import Label from "./Label";
import emailjs from 'emailjs-com';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useNavigate } from 'react-router-dom'; // Add useNavigate import
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

function QuoteForm({ lang, ...props }) {
  const [errors, setErrors] = React.useState({});
  const [showSuccess, setShowSuccess] = React.useState(false);
  const navigate = useNavigate(); // Add navigate hook

  // Validation patterns with examples
  const validations = {
    name: {
      pattern: /^[a-zA-Z\u0E00-\u0E7F\s]{2,50}$/,
      message: {
        th: "ชื่อต้องมีความยาว 2-50 ตัวอักษร เช่น สมชาย ใจดี",
        en: "Name must be 2-50 characters, e.g. John Smith"
      }
    },
    phone: {
      pattern: /^[0-9]{10}$/,
      message: {
        th: "เบอร์โทรต้องมี 10 หลัก เช่น 0812345678",
        en: "Phone must be 10 digits, e.g. 0812345678"
      }
    },
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: {
        th: "อีเมลไม่��ูกต้อง เช่น example@email.com",
        en: "Invalid email, e.g. example@email.com"
      }
    }
  };

  const serviceOptions = {
    backhoeOnly: {
      th: "เช่ารถแบคโฮอย่างเดียว",
      en: "Backhoe Rental Only"
    },
    backhoeWithTeam: {
      th: "เช่ารถแบคโฮพร้อมทีมงาน",
      en: "Backhoe with Professional Team"
    }
  };

  const validateField = (name, value) => {
    if (!value.trim()) {
      return validations[name].message[lang];
    }
    if (!validations[name].pattern.test(value)) {
      return validations[name].message[lang];
    }
    return "";
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {
      name: validateField("name", props.quoteName),
      phone: validateField("phone", props.quotePhone),
      email: validateField("email", props.quoteEmail)
    };

    setErrors(newErrors);

    // If no errors, proceed with submission
    if (!Object.values(newErrors).some(error => error)) {
      try {
        // Send email using EmailJS
        await emailjs.send(
          'service_uau14xe', // Replace with your EmailJS service ID
          'template_ujbze1m', // Updated template ID
          {
            to_email: 'craig.link1@hotmail.com',
            from_name: props.quoteName,
            from_email: props.quoteEmail,
            phone: props.quotePhone,
            message: props.quoteMessage,
            service: props.quoteService,
            start_date: props.quoteStartDate,
            end_date: props.quoteEndDate,
            location: props.quoteLocationDetails?.label || ''
          },
          'JA5QT5X6YiYX-tt-Y' // Replace with your EmailJS user ID
        );

        // Continue with existing submission logic
        const submission = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          name: props.quoteName,
          phone: props.quotePhone,
          email: props.quoteEmail,
          service: props.quoteService,
          projectDate: props.quoteDate,
          location: props.quoteLocationDetails?.label || '',
          message: props.quoteMessage,
          status: 'new',
          startDate: props.quoteStartDate,
          endDate: props.quoteEndDate,
          locationDetails: {
            label: props.quoteLocationDetails?.label || '',
            lat: props.quoteLocationDetails?.lat || 0,
            lng: props.quoteLocationDetails?.lng || 0
          }
        };

        // Save to local storage
        const existingSubmissions = JSON.parse(localStorage.getItem('quoteSubmissions') || '[]');
        localStorage.setItem('quoteSubmissions', JSON.stringify([...existingSubmissions, submission]));

        await addDoc(collection(db, "invoices"), {
          date: new Date().toISOString(),
          client: props.quoteName,
          amount: 0,
          status: "New",
          // ...include other fields as needed...
        });

        setShowSuccess(true);
        setTimeout(() => {
          props.onSuccess && props.onSuccess();
          navigate('/admin/invoice-dashboard', { state: { invoiceData: submission } }); // Navigate to invoice dashboard
        }, 2000);
      } catch (error) {
        console.error('Failed to send email:', error);
        // Optionally show error message to user
      }
    }
  };

  const handleBlur = (field, value) => {
    setErrors(prev => ({
      ...prev,
      [field]: validateField(field, value)
    }));
  };

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center mt-8">
        <div className="text-6xl animate-bounce mb-4">🎉</div>
        <p className="text-green-600 font-bold">
          {lang === "th" ? "ส่งใบขอใบเสนอราคาเรียบร้อยแล้ว!" : "Quote submitted successfully!"}
        </p>
      </div>
    );
  }

  return (
    <section className="py-6 sm:py-12 bg-white min-h-screen">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 border border-gray-100">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            {lang === "th" ? "ขอใบเสนอราคา" : "Request a Quote"}
          </h2>

          {!props.quoteSubmitted ? (
            <form onSubmit={handleQuoteSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <Label htmlFor="name">
                  {lang === "th" ? "ชื่อ *" : "Name *"}
                </Label>
                <Input
                  id="name"
                  value={props.quoteName}
                  onChange={(e) => props.setQuoteName(e.target.value)}
                  onBlur={(e) => handleBlur("name", e.target.value)}
                  className={errors.name ? "border-red-500" : ""}
                  autocomplete="name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">
                  {lang === "th" ? "เบอร์โทรศัพท์ *" : "Phone *"}
                </Label>
                <Input
                  id="phone"
                  aria-label={lang === "th" ? "เบอร์โทรศัพท์" : "Phone"}
                  value={props.quotePhone}
                  onChange={(e) => props.setQuotePhone(e.target.value)}
                  onBlur={(e) => handleBlur("phone", e.target.value)}
                  className={errors.phone ? "border-red-500" : ""}
                  autocomplete="tel"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email">
                  {lang === "th" ? "อีเมล *" : "Email *"}
                </Label>
                <Input
                  id="email"
                  aria-label={lang === "th" ? "อีเมล" : "Email"}
                  type="email"
                  value={props.quoteEmail}
                  onChange={(e) => props.setQuoteEmail(e.target.value)}
                  onBlur={(e) => handleBlur("email", e.target.value)}
                  className={errors.email ? "border-red-500" : ""}
                  autocomplete="email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <Label htmlFor="service">
                  {lang === "th" ? "บริการที่ต้องการ *" : "Service Required *"}
                </Label>
                <select
                  id="service"
                  value={props.quoteService}
                  onChange={(e) => props.setQuoteService(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
                  autocomplete="off"
                >
                  <option value="">
                    {lang === "th" ? "เลือกบริการ" : "Select Service"}
                  </option>
                  {Object.entries(serviceOptions).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value[lang]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">
                    {lang === "th" ? "วันที่เริ่มต้น *" : "Start Date *"}
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={props.quoteStartDate}
                    onChange={(e) => props.setQuoteStartDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    autocomplete="off"
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">
                    {lang === "th" ? "วันที่สิ้นสุด *" : "End Date *"}
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={props.quoteEndDate}
                    onChange={(e) => props.setQuoteEndDate(e.target.value)}
                    min={props.quoteStartDate || new Date().toISOString().split('T')[0]}
                    autocomplete="off"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">
                  {lang === "th" ? "สถานที่โครงการ *" : "Project Location *"}
                </Label>
                <GooglePlacesAutocomplete
                  apiKey="AIzaSyDD_QvWv7lDHrcihY--Qn2vqMwYW7AIoOQ"
                  selectProps={{
                    value: props.quoteLocationDetails,
                    onChange: (val) => props.setQuoteLocationDetails(val)
                  }}
                  options={{
                    componentRestrictions: { country: 'th' }
                  }}
                  autocompletionRequest={{
                    componentRestrictions: { country: 'th' },
                  }}
                />
              </div>

              <div>
                <Label htmlFor="message">
                  {lang === "th" ? "ข้อความ (ถ้ามี)" : "Message (optional)"}
                </Label>
                <textarea
                  id="message"
                  aria-label={lang === "th" ? "ข้อความ" : "Message"}
                  value={props.quoteMessage}
                  onChange={(e) => props.setQuoteMessage(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 w-full h-24 focus:outline-none focus:border-blue-500"
                  autocomplete="off"
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={props.onCancel}
                  className="px-6"
                  aria-label={lang === "th" ? "ยกเลิก" : "Cancel"}
                >
                  {lang === "th" ? "ยกเลิก" : "Cancel"}
                </Button>
                <Button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-8"
                  aria-label={lang === "th" ? "ส่งข้อมูล" : "Submit"}
                >
                  {lang === "th" ? "ส่งข้อมูล" : "Submit"}
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
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
      </div>
    </section>
  );
}

export default QuoteForm;