import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import Button from './components/Button';
import Dashboard from './pages/Dashboard';
import FormPage from './pages/FormPage';
import ReportPage from './pages/ReportPage';  // Make sure this import exists
import { FiMenu, FiHome, FiDollarSign, FiFileText, FiPieChart } from 'react-icons/fi';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    // Add any additional report data processing here
    const reportData = {
      ...data,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      return: `${(Math.random() * 15 + 5).toFixed(2)}%` // Sample ROI calculation
    };
    setFormData(reportData);
    setCurrentPage('report');
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar - unchanged from your original */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed md:relative z-20 w-64 h-full bg-white dark:bg-gray-800 shadow-lg"
          >
            <div className="p-4 flex items-center justify-between border-b dark:border-gray-700">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Investment App</h1>
              <button 
                onClick={() => setSidebarOpen(false)} 
                className="md:hidden text-gray-500 dark:text-gray-400"
              >
                <FiMenu size={24} />
              </button>
            </div>
            <nav className="p-4">
              <NavItem 
                icon={<FiHome />} 
                active={currentPage === 'dashboard'}
                onClick={() => setCurrentPage('dashboard')}
              >
                Dashboard
              </NavItem>
              <NavItem 
                icon={<FiDollarSign />} 
                active={currentPage === 'form'}
                onClick={() => setCurrentPage('form')}
              >
                Investment Form
              </NavItem>
              {formData && (
                <NavItem 
                  icon={<FiPieChart />} 
                  active={currentPage === 'report'}
                  onClick={() => setCurrentPage('report')}
                >
                  Report
                </NavItem>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content - unchanged except report rendering */}
      <div className={`flex-1 flex flex-col ${sidebarOpen ? 'md:ml-64' : ''}`}>
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <button 
                  onClick={() => setSidebarOpen(!sidebarOpen)} 
                  className="text-gray-500 dark:text-gray-400 mr-4"
                >
                  <FiMenu size={24} />
                </button>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  {currentPage === 'dashboard' && 'Dashboard'}
                  {currentPage === 'form' && 'Investment Form'}
                  {currentPage === 'report' && 'Investment Report'}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <Button 
                  variant={currentPage === 'dashboard' ? 'primary' : 'ghost'} 
                  size="sm"
                  onClick={() => setCurrentPage('dashboard')}
                  className="hidden md:block"
                >
                  Dashboard
                </Button>
                <Button 
                  variant={currentPage === 'form' ? 'primary' : 'ghost'} 
                  size="sm"
                  onClick={() => setCurrentPage('form')}
                  className="hidden md:block"
                >
                  Investment Form
                </Button>
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentPage === 'dashboard' && <Dashboard />}
              {currentPage === 'form' && <FormPage onSubmit={handleFormSubmit} />}
              {currentPage === 'report' && <ReportPage data={formData} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// NavItem component remains exactly the same
const NavItem = ({ icon, children, active, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`flex items-center p-3 rounded-lg mb-2 cursor-pointer ${
      active ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200' 
             : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`}
    onClick={onClick}
  >
    <span className="mr-3">{icon}</span>
    <span>{children}</span>
  </motion.div>
);

export default App;