import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { DollarSign, TrendingUp, Clock } from 'lucide-react';
import _ from 'lodash';
import { collection, onSnapshot } from 'firebase/firestore'; // Replace getDocs with onSnapshot
import { db, auth } from '../firebaseConfig'; // Import your Firestore instance and auth
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Ensure Link, useLocation, and useNavigate are imported
import { onAuthStateChanged } from 'firebase/auth'; // Import authentication listener

const InvoiceDashboard = () => {
  const location = useLocation();
  const invoiceData = location.state?.invoiceData || null;
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate(); // Add navigate hook

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, set up Firestore listener
        const unsubscribe = onSnapshot(collection(db, "invoices"), (querySnapshot) => {
          const invoicesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setInvoices(_.orderBy(invoicesData, ['date'], ['desc']));
        }, (error) => {
          console.error("Error fetching invoices:", error);
          // Optionally, handle the error in the UI
        });

        // Cleanup Firestore listener on unmount
        return () => unsubscribe();
      } else {
        // User is signed out, handle accordingly
        setInvoices([]);
      }
    });

    // Cleanup authentication listener on unmount
    return () => unsubscribeAuth();
  }, []);

  // Calculate summary metrics
  const totalAmount = _.sumBy(invoices, 'amount');
  const paidInvoices = _.filter(invoices, { status: 'Paid' }).length;
  const pendingAmount = _.sumBy(
    _.filter(invoices, inv => inv.status === 'Pending' || inv.status === 'Overdue'),
    'amount'
  );

  // Prepare monthly data for the graph
  const graphData = _(invoices)
    .groupBy(inv => inv.date.substring(0, 7))
    .map((group, month) => ({
      month: new Date(month).toLocaleString('default', { month: 'short' }),
      total: _.sumBy(group, 'amount'),
      paid: _.sumBy(_.filter(group, { status: 'Paid' }), 'amount'),
      pending: _.sumBy(_.filter(group, { status: 'Pending' }), 'amount'),
      overdue: _.sumBy(_.filter(group, { status: 'Overdue' }), 'amount')
    }))
    .value();

  const statusColorMap = {
    'Paid': 'bg-green-100 text-green-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Overdue': 'bg-red-100 text-red-800'
  };

  const handleViewMore = (invoice) => {
    navigate('/admin/invoice-dashboard', { state: { invoiceData: invoice } });
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold">${totalAmount.toLocaleString()}</h3>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Amount</p>
              <h3 className="text-2xl font-bold">${pendingAmount.toLocaleString()}</h3>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Paid Invoices</p>
              <h3 className="text-2xl font-bold">{paidInvoices} / {invoices.length}</h3>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Revenue Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Monthly Revenue Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#2563eb" 
                  strokeWidth={2} 
                  name="Total Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Revenue by Status</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="paid" stackId="a" fill="#16a34a" name="Paid" />
                <Bar dataKey="pending" stackId="a" fill="#eab308" name="Pending" />
                <Bar dataKey="overdue" stackId="a" fill="#dc2626" name="Overdue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Invoices</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoices.slice(0, 10).map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{invoice.id.toString().padStart(5, '0')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(invoice.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(invoice.paymentDue).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {invoice.client}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${invoice.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColorMap[invoice.status]}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleViewMore(invoice)}
                        className="text-blue-500 hover:underline"
                      >
                        View More
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add navigation to Admin Invoices */}
      <div className="mt-6">
        <Link
          to="/admin/invoices"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Manage Invoices
        </Link>
      </div>

      {invoiceData && (
        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <h2 className="text-lg font-semibold mb-4">Invoice Details</h2>
          <p><strong>Client:</strong> {invoiceData.client}</p>
          <p><strong>Invoice ID:</strong> {invoiceData.id}</p>
          <p><strong>Date:</strong> {new Date(invoiceData.date).toLocaleDateString()}</p>
          <p><strong>Due Date:</strong> {new Date(invoiceData.paymentDue).toLocaleDateString()}</p>
          <p><strong>Amount:</strong> ${invoiceData.amount.toLocaleString()}</p>
          <p><strong>Status:</strong> {invoiceData.status}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

export default InvoiceDashboard;