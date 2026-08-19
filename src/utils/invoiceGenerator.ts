import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BUSINESS_INFO, PRICING } from '../constants';

export interface InvoiceData {
  invoiceNumber?: string;
  receiptNumber?: string;
  studentName: string;
  whatsapp: string;
  email?: string;
  city?: string;
  courseTitle: string;
  planTitle?: string;
  amount: string | number;
  paymentGateway: 'jazzcash' | 'zindigi' | 'bank' | string;
  paymentStatus: 'PAID' | 'PENDING CONFIRMATION' | 'ENROLLED' | 'OFFICIAL QUOTATION' | 'FREE APPOINTMENT' | 'CONFIRMED' | string;
  date?: string;
  timeSlot?: string;
  notes?: string;
}

export const generateInvoiceNumber = (prefix: string = 'MA-INV'): string => {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-${year}-${randomNum}`;
};

export const createInvoicePDF = (data: InvoiceData): jsPDF => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const invoiceNo = data.invoiceNumber || generateInvoiceNumber('MA-INV');
  const receiptNo = data.receiptNumber || generateInvoiceNumber('MA-REC');
  const issueDate = data.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const isPaid = data.paymentStatus === 'PAID' || data.paymentStatus === 'ENROLLED';

  // Primary Colors (Mentor Arena Brand)
  const brandNavy = [15, 34, 64];      // #0F2240
  const brandBlue = [30, 92, 179];     // #1E5CB3
  const brandGreen = [16, 185, 129];   // #10B981
  const darkGray = [33, 37, 41];       // #212529
  const lightGray = [245, 247, 250];   // #F5F7FA
  const borderGray = [226, 232, 240];  // #E2E8F0

  // 1. Header Banner
  doc.setFillColor(brandNavy[0], brandNavy[1], brandNavy[2]);
  doc.rect(0, 0, 210, 42, 'F');

  // Decorative accent line
  doc.setFillColor(brandGreen[0], brandGreen[1], brandGreen[2]);
  doc.rect(0, 42, 210, 2.5, 'F');

  // Brand Name
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('MENTOR ARENA', 16, 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(200, 220, 245);
  doc.text('Premier 1-to-1 Digital Skills Mentorship & Software Engineering Academy', 16, 25);
  doc.setFontSize(8);
  doc.text('26/792 Cantt Bazar, Drigh Road, Karachi, Sindh, Pakistan · Phone: +92 332 2137898', 16, 32);
  doc.text('Email: support@mentorarena.online · Web: https://mentorarena.online', 16, 37);

  // Document Type Header Box
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(140, 9, 56, 25, 2, 2, 'F');
  
  doc.setTextColor(brandNavy[0], brandNavy[1], brandNavy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(isPaid ? 'PAYMENT RECEIPT' : 'ENROLLMENT INVOICE', 168, 16, { align: 'center' });

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(`Ref: ${invoiceNo}`, 168, 22, { align: 'center' });
  doc.text(`Date: ${issueDate}`, 168, 28, { align: 'center' });

  // 2. Student & Institution Details Section
  let currentY = 54;

  // Student Details Box
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.roundedRect(14, currentY, 88, 38, 2, 2, 'F');
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.roundedRect(14, currentY, 88, 38, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(brandNavy[0], brandNavy[1], brandNavy[2]);
  doc.text('BILLED TO / STUDENT DETAILS:', 18, currentY + 7);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text(data.studentName || 'Valued Student', 18, currentY + 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(75, 85, 99);
  doc.text(`WhatsApp: ${data.whatsapp || 'Provided upon booking'}`, 18, currentY + 20);
  if (data.email) {
    doc.text(`Email: ${data.email}`, 18, currentY + 25);
  }
  doc.text(`Location / City: ${data.city || 'Pakistan / Global Remittance'}`, 18, currentY + (data.email ? 30 : 25));
  if (data.timeSlot) {
    doc.text(`Preferred Slot: ${data.timeSlot}`, 18, currentY + (data.email ? 35 : 30));
  }

  // Invoice / Payment Metadata Box
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.roundedRect(108, currentY, 88, 38, 2, 2, 'F');
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.roundedRect(108, currentY, 88, 38, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(brandNavy[0], brandNavy[1], brandNavy[2]);
  doc.text('PAYMENT & COHORT METRICS:', 112, currentY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(75, 85, 99);
  
  const gatewayName = data.paymentGateway === 'jazzcash' 
    ? 'JazzCash (03322137898)' 
    : data.paymentGateway === 'zindigi' 
      ? 'Zindigi by JS Bank / Raast (03322137898)'
      : 'Official Gateway';

  doc.text(`Gateway: ${gatewayName}`, 112, currentY + 14);
  doc.text(`Account Title: Fazal Shahid Latif`, 112, currentY + 19);
  doc.text(`Cohort Structure: Max 6 Students (1-to-1 Screentime)`, 112, currentY + 24);
  doc.text(`Total Duration: 14 Weeks (150 Live Hours)`, 112, currentY + 29);

  // Status Badge inside metadata
  doc.setFont('helvetica', 'bold');
  if (isPaid) {
    doc.setTextColor(16, 185, 129);
    doc.text(`Status: [ PAID / VERIFIED ]`, 112, currentY + 34);
  } else {
    doc.setTextColor(194, 65, 12);
    doc.text(`Status: [ PENDING WHATSAPP VERIFICATION ]`, 112, currentY + 34);
  }

  // 3. Itemized Course Breakdown Table
  const tableData = [
    [
      `14-Week Specialized 1-to-1 Track:\n${data.courseTitle || 'MERN Stack Web Development'}\n(Direct code review, live debugging, customized syllabus)`,
      '14 Weeks\n(150 Hours)',
      'PKR 6,000 / mo',
      'PKR 6,000'
    ],
    [
      'Direct 1-to-1 Screentime with Fazal Shahid Latif\n(30+ Years Industrial Engineering Heritage)',
      '1-on-1 Access',
      'INCLUDED',
      'PKR 0'
    ],
    [
      'Live Cloud Domain & Production Project Deployment\n(Git repo audit, working database backend, live portfolio)',
      'Shipped Project',
      'INCLUDED',
      'PKR 0'
    ],
    [
      '1st Class Refund Exemption Guarantee\n(100% money-back if dissatisfied after 1st session, no questions asked)',
      'Guaranteed',
      'PROTECTED',
      'PKR 0'
    ]
  ];

  autoTable(doc, {
    startY: 100,
    margin: { left: 14, right: 14 },
    head: [['COURSE DELIVERABLE / ITEM DESCRIPTION', 'DURATION / ACCESS', 'RATE', 'SUBTOTAL']],
    body: tableData,
    headStyles: {
      fillColor: [15, 34, 64],
      textColor: [255, 255, 255],
      fontSize: 8.5,
      fontStyle: 'bold',
      halign: 'left',
      cellPadding: 3.5,
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [33, 37, 41],
      cellPadding: 3.5,
      lineColor: [226, 232, 240],
      lineWidth: 0.2,
    },
    columnStyles: {
      0: { cellWidth: 95 },
      1: { cellWidth: 32, halign: 'center' },
      2: { cellWidth: 28, halign: 'center' },
      3: { cellWidth: 27, halign: 'right', fontStyle: 'bold' },
    },
    theme: 'grid',
  });

  // Calculate table ending Y position
  const finalY = (doc as any).lastAutoTable.finalY + 6;

  // 4. Totals Summary Box
  const summaryX = 118;
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.roundedRect(summaryX, finalY, 78, 30, 2, 2, 'F');
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.roundedRect(summaryX, finalY, 78, 30, 2, 2, 'S');

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(75, 85, 99);
  doc.text('Monthly Installment Base:', summaryX + 4, finalY + 7);
  doc.text('PKR 6,000', summaryX + 74, finalY + 7, { align: 'right' });

  doc.text('Direct Mentorship Screentime:', summaryX + 4, finalY + 13);
  doc.text('PKR 0 (Free)', summaryX + 74, finalY + 13, { align: 'right' });

  doc.text('GST / Registration Processing Fee:', summaryX + 4, finalY + 19);
  doc.text('PKR 0 (0%)', summaryX + 74, finalY + 19, { align: 'right' });

  // Total line
  doc.setFillColor(brandNavy[0], brandNavy[1], brandNavy[2]);
  doc.rect(summaryX, finalY + 21.5, 78, 8.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(255, 255, 255);
  doc.text('TOTAL PAYABLE / MONTH:', summaryX + 4, finalY + 27);
  doc.text('PKR 6,000', summaryX + 74, finalY + 27, { align: 'right' });

  // 5. Official Instructions & Payment Gateways (Left side)
  const leftX = 14;
  doc.setFillColor(254, 242, 242);
  doc.roundedRect(leftX, finalY, 98, 30, 2, 2, 'F');
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(leftX, finalY, 98, 30, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(153, 27, 27);
  doc.text('OFFICIAL PAYMENT GATEWAY DETAILS:', leftX + 4, finalY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(69, 10, 10);
  doc.text('• JazzCash: Account 03322137898 (Fazal Shahid Latif)', leftX + 4, finalY + 11);
  doc.text('• Zindigi / Raast: ID 03322137898 (JS Bank / Fazal Shahid Latif)', leftX + 4, finalY + 16);
  doc.text('• Overseas: Payoneer, Remitly, Wise to JazzCash 03322137898', leftX + 4, finalY + 21);
  doc.text('• Verification: Send screenshot to WhatsApp +92 332 2137898', leftX + 4, finalY + 26);

  // 6. Policy & Refund Statement Box
  const policyY = finalY + 34;
  doc.setFillColor(236, 253, 245);
  doc.roundedRect(14, policyY, 182, 18, 2, 2, 'F');
  doc.setDrawColor(167, 243, 208);
  doc.roundedRect(14, policyY, 182, 18, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(6, 95, 70);
  doc.text('1ST CLASS MONEY-BACK EXEMPTION POLICY & ENROLLMENT GUARANTEE:', 18, policyY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(4, 120, 87);
  doc.text('If after attending your first live session with Fazal Shahid Latif you feel our coaching standard, custom curriculum, or 1-to-1 support does not', 18, policyY + 10);
  doc.text('meet your highest expectations, notify us within 24 hours at support@mentorarena.online or WhatsApp (+92 332 2137898) for an immediate 100% refund.', 18, policyY + 14);

  // 7. Signature & Official Stamp Section
  const stampY = policyY + 22;

  // Stamp / QR Representation
  doc.setDrawColor(brandNavy[0], brandNavy[1], brandNavy[2]);
  doc.setLineWidth(0.5);
  doc.rect(14, stampY, 60, 16);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(brandNavy[0], brandNavy[1], brandNavy[2]);
  doc.text('MENTOR ARENA ACADEMIC DESK', 44, stampY + 5, { align: 'center' });
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Karachi, Sindh, Pakistan · Verified 2026', 44, stampY + 9, { align: 'center' });
  doc.setTextColor(brandGreen[0], brandGreen[1], brandGreen[2]);
  doc.text('✓ OFFICIAL ENROLLMENT RECEIPT', 44, stampY + 13, { align: 'center' });

  // Signature Block
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(brandNavy[0], brandNavy[1], brandNavy[2]);
  doc.text('Fazal Shahid Latif', 196, stampY + 7, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('Lead Instructor & Systems Architect (30+ Years Heritage)', 196, stampY + 11, { align: 'right' });
  doc.text('Authorized Signatory · Mentor Arena Pakistan', 196, stampY + 15, { align: 'right' });

  // 8. Footer Bar
  doc.setFillColor(brandNavy[0], brandNavy[1], brandNavy[2]);
  doc.rect(0, 287, 210, 10, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('Mentor Arena Pakistan · 1-to-1 Practical Software Mentorship · Cantt Bazar, Drigh Road, Karachi', 105, 293, { align: 'center' });

  return doc;
};

export const downloadInvoicePDF = (data: InvoiceData): void => {
  const doc = createInvoicePDF(data);
  const safeName = (data.studentName || 'Student').replace(/[^a-zA-Z0-9]/g, '_');
  const invoiceNo = data.invoiceNumber || generateInvoiceNumber('MA-INV');
  doc.save(`MentorArena_Invoice_${safeName}_${invoiceNo}.pdf`);
};

export const getInvoicePDFBlobUrl = (data: InvoiceData): string => {
  const doc = createInvoicePDF(data);
  return doc.output('bloburl').toString();
};
