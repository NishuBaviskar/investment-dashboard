import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Button from '../components/Button';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ReportPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reportRef = useRef(null);
  const formData = location.state?.formData || {};
  
  // If no form data, redirect back to form
  useEffect(() => {
    if (!location.state?.formData) {
      navigate('/form');
    }
  }, [location.state, navigate]);

  const handleDownloadPDF = () => {
    const input = reportRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`investment-report-${formData.name}.pdf`);
    });
  };

  const calculateProjectedValue = (amount) => {
    const rate = (Math.random() * 20 - 5) / 100; // Between -5% and +15%
    const years = 5;
    return (amount * Math.pow(1 + rate, years)).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Card title="Investment Report" hoverEffect={false}>
          <div className="p-6">
            {/* Report content - this will be converted to PDF */}
            <div ref={reportRef} className="bg-white dark:bg-gray-800 p-6 rounded-lg">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-primary-light dark:text-primary-dark mb-2">
                  Investment Portfolio Report
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Generated on {new Date().toLocaleDateString()}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                    Investor Information
                  </h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Name:</span> {formData.name}</p>
                    <p><span className="font-medium">Email:</span> {formData.email}</p>
                    <p><span className="font-medium">Investment Type:</span> {formData.investmentType}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                    Investment Details
                  </h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Amount Invested:</span> ${formData.investmentAmount}</p>
                    <p><span className="font-medium">Date of Investment:</span> {new Date().toLocaleDateString()}</p>
                    <p><span className="font-medium">Projected 5-Year Value:</span> ${calculateProjectedValue(parseFloat(formData.investmentAmount))}</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  Risk Analysis
                </h3>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="mb-2">
                    <span className="font-medium">Risk Level:</span> 
                    <span className={`ml-2 px-2 py-1 rounded text-sm ${
                      formData.investmentType === 'stocks' || formData.investmentType === 'crypto' 
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}>
                      {formData.investmentType === 'stocks' || formData.investmentType === 'crypto' 
                        ? 'Moderate to High' 
                        : 'Low to Moderate'}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {formData.investmentType === 'stocks' 
                      ? 'Stock investments typically offer higher returns but come with greater volatility.'
                      : formData.investmentType === 'bonds' 
                      ? 'Bonds provide stable returns with lower risk compared to stocks.'
                      : formData.investmentType === 'real-estate'
                      ? 'Real estate investments offer stable growth with moderate risk.'
                      : 'Cryptocurrency investments are highly volatile with potential for high returns.'}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  This report is generated for informational purposes only and does not constitute financial advice.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button 
                variant="primary" 
                className="w-full sm:w-auto"
                onClick={handleDownloadPDF}
              >
                Download PDF Report
              </Button>
              <Button 
                variant="secondary" 
                className="w-full sm:w-auto"
                onClick={() => navigate('/dashboard')}
              >
                Back to Dashboard
              </Button>
              <Button 
                variant="outline" 
                className="w-full sm:w-auto"
                onClick={() => navigate('/form')}
              >
                Create New Investment
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ReportPage;