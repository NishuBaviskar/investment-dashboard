import { motion } from 'framer-motion';
import { FiHome, FiDollarSign, FiFileText, FiPieChart } from 'react-icons/fi';

const Sidebar = ({ isOpen, activeTab, setActiveTab, hasReport }) => {
  const navItems = [
    { id: 'dashboard', icon: <FiHome />, label: 'Dashboard' },
    { id: 'investments', icon: <FiDollarSign />, label: 'Investments' },
    { id: 'form', icon: <FiFileText />, label: 'New Investment' },
    ...(hasReport ? [{ id: 'report', icon: <FiPieChart />, label: 'Report' }] : [])
  ];

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: isOpen ? 0 : -300 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed md:relative z-20 w-64 h-full bg-white shadow-lg border-r"
    >
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-blue-600">Investment Dashboard</h1>
      </div>
      <nav className="p-4">
        {navItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center p-3 rounded-lg mb-2 cursor-pointer ${
              activeTab === item.id ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.label}</span>
          </motion.div>
        ))}
      </nav>
    </motion.div>
  );
};

export default Sidebar;
