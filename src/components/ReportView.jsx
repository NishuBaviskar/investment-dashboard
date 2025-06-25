import { motion } from 'framer-motion';

const ReportView = ({ data }) => {
  if (!data) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 text-center"
      >
        <p className="text-gray-600">No investment data available. Please submit the form first.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 print:shadow-none"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Investment Report</h2>
      <div className="space-y-4 mb-6">
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-600">Investment Name</h3>
          <p className="text-gray-800">{data.investmentName}</p>
        </div>
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-600">Amount</h3>
          <p className="text-gray-800">${parseFloat(data.amount).toLocaleString()}</p>
        </div>
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-600">Date</h3>
          <p className="text-gray-800">{new Date(data.date).toLocaleDateString()}</p>
        </div>
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-600">Type</h3>
          <p className="text-gray-800">{data.type}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-600">Notes</h3>
          <p className="text-gray-800 whitespace-pre-line">{data.notes || 'N/A'}</p>
        </div>
      </div>
      <div className="mt-6 print:hidden">
        <button
          onClick={() => window.print()}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          Print Report
        </button>
      </div>
    </motion.div>
  );
};

export default ReportView;
