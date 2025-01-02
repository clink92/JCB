import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import _ from 'lodash';

const AdminInvoices = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "invoices"), (querySnapshot) => {
      const invoicesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInvoices(_.orderBy(invoicesData, ['date'], ['desc']));
    }, (error) => {
      console.error("Error fetching invoices:", error);
      // Optionally, handle the error in the UI
    });

    // Cleanup Firestore listener on unmount
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this invoice?")) {
        await deleteDoc(doc(db, "invoices", id));
        setInvoices(invoices.filter(invoice => invoice.id !== id));
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred. Check your permissions or try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Admin Invoices</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Invoice ID</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Client</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(invoice => (
              <tr key={invoice.id}>
                <td className="py-2 px-4 border-b">#{invoice.id.substring(0, 6).toUpperCase()}</td>
                <td className="py-2 px-4 border-b">{new Date(invoice.date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{invoice.client}</td>
                <td className="py-2 px-4 border-b">${invoice.amount.toLocaleString()}</td>
                <td className="py-2 px-4 border-b">{invoice.status}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleDelete(invoice.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                  {/* Add Edit functionality as needed */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminInvoices;