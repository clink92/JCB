import React from 'react';
// import QRCode from 'react-qr-code';

function About({ lang }) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
          {lang === "th" ? "เกี่ยวกับเรา" : "About Us"}
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          {lang === "th"
            ? "โกโก้ JCB เป็นผู้นำด้านการให้เช่าเครื่องจักรก่อสร้างด้วยประสบการณ์กว่า 35 ปี เรามุ่งมั่นที่จะให้บริการที่ยอดเยี่ยมแก่ลูกค้าทุกท่าน"
            : "Koko JCB is a leading construction equipment rental company with over 35 years of experience. We are committed to providing excellent service to all our clients."}
        </p>
        <p className="text-lg text-gray-700 mb-8">
          {lang === "th"
            ? "ทีมงานมืออาชีพของเราพร้อมเสมอที่จะช่วยคุณในการเลือกเครื่องจักรที่เหมาะสมสำหรับโครงการของคุณ"
            : "Our team of professionals is always ready to help you choose the right machinery for your projects."}
        </p>

        {/* Business Information */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">
            {lang === "th" ? "ข้อมูลธุรกิจ" : "Business Information"}
          </h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              <strong>{lang === "th" ? "ชื่อธุรกิจ:" : "Business Name:"}</strong> โกโก้ JCB ให้เช่า
            </li>
            <li>
              <strong>{lang === "th" ? "ประเภทธุรกิจ:" : "Business Category:"}</strong> {lang === "th" ? "บริการเช่าเครื่องจักรก่อสร้าง" : "Construction machine rental service"}
            </li>
            <li>
              <strong>{lang === "th" ? "หลัก:" : "Primary:"}</strong>
              <ul className="list-disc list-inside ml-4">
                <li>{lang === "th" ? "ผู้จัดหาวัสดุอุปกรณ์" : "Equipment supplier"}</li>
                <li>{lang === "th" ? "ผู้รับเหมาก่อสร้างทางขุดเจาะ" : "Excavating contractor"}</li>
                <li>{lang === "th" ? "ผู้จัดหาวัสดุอุตสาหกรรม" : "Industrial equipment supplier"}</li>
                <li>{lang === "th" ? "ผู้จัดหาวัสดุอุปกรณ์ก่อสร้าง" : "Construction equipment supplier"}</li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">
            {lang === "th" ? "คำอธิบายธุรกิจ" : "Business Description"}
          </h3>
          <p className="text-gray-700">
            {lang === "th"
              ? "โกโก้JCB ผู้เชี่ยวชาญด้านรถ JCB ให้บริการขุดเจาะครบวงจร ด้วยประสบการณ์กว่า 35 ปี โกโก้JCB ให้บริการเช่ารถ JCB พร้อมชุดอุปกรณ์สำหรับงานก่อสร้างและอุตสาหกรรมต่าง ๆ ครอบคลุมงานขุดเจาะดิน ขุดฐานราก และปรับพื้นที่ พร้อมด้วยทีมงานมืออาชีพที่มีประสบการณ์ในสายงานมากกว่า 35 ปี เราให้บริการในเขตกรุงเทพฯ ปริมณฑล รวมถึงนิคมอุตสาหกรรมในชลบุรีและระยอง มุ่งเน้นการทำงานที่มีคุณภาพ รวดเร็ว และปลอดภัย พร้อมเครื่องจักรที่ทันสมัยและบำรุงรักษาอย่างต่อเนื่อง เพื่อตอบสนองทุกความต้องการด้านการก่อสร้างและงานขุดเจาะของลูกค้าอย่างเต็มที่ นอกจากนี้ โกโก้JCB ยังให้บริการซื้อขายรถ JCB และรับสั่งซื้อชิ้นส่วนสำหรับรถ JCB พร้อมการดูแลและซ่อมแซมเพื่อให้รถของคุณทำงานได้อย่างมีประสิทธิภาพสูงสุด."
              : "Koko JCB is a comprehensive JCB excavating service provider with over 35 years of experience. We offer JCB rentals equipped with machinery for various construction and industrial projects, including soil excavation, foundation digging, and land shaping. Our team of professionals, boasting over 35 years in the field, serves the Bangkok Metropolitan area as well as industrial estates in Chon Buri and Rayong. We prioritize quality, efficiency, and safety, maintaining modern and well-serviced equipment to fully meet our clients' construction and excavation needs. Additionally, Koko JCB provides JCB sales and parts ordering services, along with maintenance and repair to ensure your machinery operates at peak performance."}
          </p>
        </div>

        {/* Contact Information */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">
            {lang === "th" ? "ข้อมูลติดต่อ" : "Contact Information"}
          </h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              <strong>{lang === "th" ? "เบอร์โทรศัพท์:" : "Phone Number:"}</strong> 086 009 2550
            </li>
            <li>
              <strong>{lang === "th" ? "เว็บไซต์:" : "Website:"}</strong> <a href="https://www.kokojcb.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                www.kokojcb.com
              </a>
            </li>
            <li>
              <strong>{lang === "th" ? "โปรไฟล์โซเชียล:" : "Social Profiles:"}</strong> {/* Add social profiles links if available */}
              <ul className="list-disc list-inside ml-4">
                <li>
                  <a href="https://www.facebook.com/yourprofile" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/yourprofile" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/yourprofile" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Location */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">
            {lang === "th" ? "สถานที่ตั้ง" : "Location"}
          </h3>
          <p className="text-gray-700 mb-4">
            24/19 วัชรพลซอย4 ถนนวัชรพล, คลองถนน, สายไหม, กรุงเทพฯ 10220
          </p>
          {/* Google Maps Embed */}
          <div className="w-full h-64 sm:h-80 lg:h-96">
            <iframe
              title="Business Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.123456789!2d100.501765!3d13.756331!2m3!1f0!2f0!3f0!3m2!"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Hours */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">
            {lang === "th" ? "ชั่วโมงทำการ" : "Business Hours"}
          </h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>{lang === "th" ? "เปิดทำการ: 6:00 - 18:00 น. ทุกวัน" : "Open: 6:00 AM - 6:00 PM Daily"}</li>
          </ul>
        </div>

        {/* Service Areas */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">
            {lang === "th" ? "พื้นที่ให้บริการ" : "Service Areas"}
          </h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>Rayong, Thailand</li>
            <li>Bangkok, Thailand</li>
            <li>Chon Buri, Thailand</li>
            <li>Samut Prakan, Thailand</li>
            <li>Samut Sakhon, Thailand</li>
            <li>Nakhon Phanom, Thailand</li>
            <li>Phra Nakhon Si Ayutthaya, Thailand</li>
          </ul>
        </div>

        <a href="https://www.google.com/search?client=safari&rls=en&q=%E0%B9%82%E0%B8%81%E0%B9%82%E0%B8%81%E0%B9%89+JCB+%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B9%80%E0%B8%8A%E0%B9%88%E0%B8%B2&ie=UTF-8&oe=UTF-8" className="text-blue-600 hover:underline">
          {lang === "th" ? "เยี่ยมชมธุรกิจของเราบน Google" : "Visit Our Google Business"}
        </a>
        {/* <QRCode value="https://www.google.com/search?client=safari&rls=en&q=%E0%B9%82%E0%B8%81%E0%B9%82%E0%B8%81%E0%B9%89+JCB+%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B9%80%E0%B8%8A%E0%B9%88%E0%B8%B2&ie=UTF-8&oe=UTF-8" /> */}
      </div>
    </section>
  );
}

export default About;
