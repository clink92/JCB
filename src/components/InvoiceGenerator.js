import React from 'react';
import jsPDF from 'jspdf';
import Button from './Button';
import Input from './Input';
import Label from './Label';

const InvoiceGenerator = ({ quote, lang, onInvoiceSaved, existingInvoice }) => {
  const [showForm, setShowForm] = React.useState(false);
  const [invoiceData, setInvoiceData] = React.useState({
    cost: 2500,
    tax: 7,
    discount: 0,
    additionalCosts: 0,
    notes: '',
    invoiceNumber: `INV-${Date.now()}`,
    rentalType: 'rentalOnly',
    workDurationType: 'days',
    workDuration: 1
  });

  const generatePDF = () => {
    const doc = new jsPDF();

    // Professional header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('INVOICE', 105, 15, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    let yPos = 30;

    doc.text(`Invoice #: ${invoiceData.invoiceNumber}`, 10, yPos);
    yPos += 10;
    doc.text(`Customer: ${quote.name}`, 10, yPos);
    yPos += 10;
    doc.text(`Rental Type: ${invoiceData.rentalType}`, 10, yPos);
    yPos += 10;
    doc.text(
      `Duration: ${invoiceData.workDuration} ${invoiceData.workDurationType}`,
      10,
      yPos
    );
    yPos += 10;
    doc.text(`Service: ${quote.service}`, 10, yPos);
    yPos += 10;
    doc.text(`Location: ${quote.location}`, 10, yPos);
    yPos += 10;
    doc.text(`Dates: ${quote.startDate} - ${quote.endDate}`, 10, yPos);
    yPos += 15;

    // Add invoice content
    doc.text(`Base Cost: ${invoiceData.cost} THB`, 10, yPos);
    yPos += 10;
    doc.text(`Additional Costs: ${invoiceData.additionalCosts} THB`, 10, yPos);
    yPos += 10;
    doc.text(`Discount: ${invoiceData.discount} THB`, 10, yPos);
    yPos += 10;
    const total = invoiceData.cost + 
                 (invoiceData.additionalCosts || 0) - 
                 (invoiceData.discount || 0);
    const taxAmount = (total * (invoiceData.tax || 0)) / 100;
    const finalTotal = total + taxAmount;
    doc.text(`Tax (${invoiceData.tax}%): ${taxAmount} THB`, 10, yPos);
    yPos += 10;
    doc.setFont('helvetica', 'bold');
    doc.text(`Total: ${finalTotal} THB`, 10, yPos);
    doc.setFont('helvetica', 'normal');
    yPos += 10;
    
    if (invoiceData.notes) {
      doc.text(`Notes: ${invoiceData.notes}`, 10, yPos);
      yPos += 10;
    }

    // Create new invoice data object
    const newInvoiceData = {
      ...invoiceData,
      generatedAt: new Date().toISOString(),
      quoteId: quote.id,
      total: finalTotal
    };
    
    onInvoiceSaved(quote.id, newInvoiceData);
    doc.save(`invoice-${quote.id}.pdf`);
    setShowForm(false);
  };

  if (!showForm) {
    return (
      <div className="flex flex-col gap-2">
        <Button
          onClick={() => setShowForm(true)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded"
          title={lang === 'th' ? 'สร้างใบแจ้งหนี้' : 'Generate Invoice'}
        >
          {existingInvoice ? (
            <span role="img" aria-label="view">👁️</span>
          ) : (
            <span role="img" aria-label="generate">📝</span>
          )}
        </Button>
        {existingInvoice && (
          <Button
            onClick={() => generatePDF()}
            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded"
            title={lang === 'th' ? 'ดาวน์โหลดใบแจ้งหนี้' : 'Download Invoice'}
          >
            <span role="img" aria-label="download">⬇️</span>
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">
          {lang === 'th' ? 'สร้างใบแจ้งหนี้' : 'Generate Invoice'}
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="invoiceNumber">
              {lang === 'th' ? 'เลขที่ใบแจ้งหนี้' : 'Invoice Number'}
            </Label>
            <Input
              id="invoiceNumber"
              value={invoiceData.invoiceNumber}
              onChange={(e) => setInvoiceData({...invoiceData, invoiceNumber: e.target.value})}
            />
          </div>
          
          <div>
            <Label htmlFor="cost">
              {lang === 'th' ? 'ค่าบริการ (THB)' : 'Cost (THB)'}
            </Label>
            <Input
              id="cost"
              type="number"
              value={invoiceData.cost}
              onChange={(e) => setInvoiceData({...invoiceData, cost: Number(e.target.value)})}
            />
          </div>

          <div>
            <Label htmlFor="additionalCosts">
              {lang === 'th' ? 'ค่าใช้จ่ายเพิ่มเติม (THB)' : 'Additional Costs (THB)'}
            </Label>
            <Input
              id="additionalCosts"
              type="number"
              value={invoiceData.additionalCosts}
              onChange={(e) => setInvoiceData({...invoiceData, additionalCosts: Number(e.target.value)})}
            />
          </div>

          <div>
            <Label htmlFor="discount">
              {lang === 'th' ? 'ส่วนลด (THB)' : 'Discount (THB)'}
            </Label>
            <Input
              id="discount"
              type="number"
              value={invoiceData.discount}
              onChange={(e) => setInvoiceData({...invoiceData, discount: Number(e.target.value)})}
            />
          </div>

          <div>
            <Label htmlFor="tax">
              {lang === 'th' ? 'ภาษี (%)' : 'Tax (%)'}
            </Label>
            <Input
              id="tax"
              type="number"
              value={invoiceData.tax}
              onChange={(e) => setInvoiceData({...invoiceData, tax: Number(e.target.value)})}
            />
          </div>

          <div>
            <Label htmlFor="rentalType">
              {lang === 'th' ? 'ประเภทการเช่า' : 'Rental Type'}
            </Label>
            <select
              id="rentalType"
              className="border rounded-md px-2 py-1 w-full"
              value={invoiceData.rentalType}
              onChange={(e) => setInvoiceData({...invoiceData, rentalType: e.target.value})}
            >
              <option value="rentalOnly">
                {lang === 'th' ? 'เช่าอย่างเดียว' : 'Rental Only'}
              </option>
              <option value="rentalService">
                {lang === 'th' ? 'เช่าพร้อมบริการ' : 'Rental & Service'}
              </option>
            </select>
          </div>

          <div>
            <Label htmlFor="workDurationType">
              {lang === 'th' ? 'หน่วยเวลา' : 'Duration Type'}
            </Label>
            <select
              id="workDurationType"
              className="border rounded-md px-2 py-1 w-full"
              value={invoiceData.workDurationType}
              onChange={(e) =>
                setInvoiceData({...invoiceData, workDurationType: e.target.value})
              }
            >
              <option value="days">
                {lang === 'th' ? 'วัน' : 'Days'}
              </option>
              <option value="hours">
                {lang === 'th' ? 'ชั่วโมง' : 'Hours'}
              </option>
            </select>
          </div>

          <div>
            <Label htmlFor="workDuration">
              {lang === 'th' ? 'จำนวน' : 'Duration'}
            </Label>
            <Input
              id="workDuration"
              type="number"
              value={invoiceData.workDuration}
              onChange={(e) => setInvoiceData({...invoiceData, workDuration: Number(e.target.value)})}
            />
          </div>

          <div className="col-span-2">
            <Label htmlFor="notes">
              {lang === 'th' ? 'หมายเหตุ' : 'Notes'}
            </Label>
            <textarea
              id="notes"
              className="w-full border rounded-md p-2"
              value={invoiceData.notes}
              onChange={(e) => setInvoiceData({...invoiceData, notes: e.target.value})}
              rows="3"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button
            onClick={() => setShowForm(false)}
            className="bg-gray-500 hover:bg-gray-600 text-white"
          >
            {lang === 'th' ? 'ยกเลิก' : 'Cancel'}
          </Button>
          <Button
            onClick={generatePDF}
            className="bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            {lang === 'th' ? 'สร้างใบแจ้งหนี้' : 'Generate Invoice'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;
