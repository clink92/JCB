import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = ({ lang }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">
        {lang === "th" ? "ไม่พบหน้าที่คุณต้องการ" : "Page Not Found"}
      </p>
      <Link 
        to="/" 
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md"
      >
        {lang === "th" ? "กลับหน้าหลัก" : "Go to Home"}
      </Link>
    </div>
  );
};

export default NotFound;