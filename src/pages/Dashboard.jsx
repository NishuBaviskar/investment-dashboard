import { motion } from 'framer-motion';
import { useState } from 'react';
import { useInvestments } from '../context/InvestmentContext';
import Button from '../components/Button';
import Card from '../components/Card';
import Chart from '../components/Chart';
import Pagination from '../components/Pagination';
import ThemeToggle from '../components/ThemeToggle';

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { investments: submittedInvestments } = useInvestments();
  const itemsPerPage = 5;

  // Original mock data - unchanged
  const mockInvestments = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1000, // Starting from 1000 to avoid conflicts with submitted investments
    name: `Sample Investment ${i + 1}`,
    type: ['Stocks', 'Bonds', 'Real Estate', 'Crypto'][Math.floor(Math.random() * 4)],
    amount: Math.floor(Math.random() * 10000) + 1000,
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
    return: (Math.random() * 20 - 5).toFixed(2) + '%'
  }));

  // Combine and sort by date (newest first)
  const allInvestments = [...submittedInvestments, ...mockInvestments]
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const paginatedInvestments = allInvestments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Original chart data - unchanged
  const portfolioData = {
    labels: ['Stocks', 'Bonds', 'Real Estate', 'Crypto', 'Cash'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          '#4f46e5',
          '#10b981',
          '#f59e0b',
          '#ef4444',
          '#64748b'
        ],
        borderWidth: 0,
      },
    ],
  };

  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Portfolio Value',
        data: [5000, 6500, 7200, 6800, 8500, 9200],
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const investmentTypesData = {
    labels: ['Tech', 'Healthcare', 'Energy', 'Finance', 'Consumer'],
    datasets: [
      {
        label: 'Investment by Sector',
        data: [45, 20, 15, 12, 8],
        backgroundColor: [
          'rgba(79, 70, 229, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(100, 116, 139, 0.7)'
        ],
        borderColor: [
          'rgba(79, 70, 229, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(100, 116, 139, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-gray-900 dark:text-white"
          >
            Investment Dashboard
          </motion.h1>
          <ThemeToggle />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card title="Total Portfolio Value" className="h-full">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-primary-light dark:text-primary-dark">$24,500</p>
                  <p className="text-green-600 dark:text-green-400">+12.5% from last month</p>
                </div>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card title="Best Performing Asset" className="h-full">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xl font-semibold">Tech Stocks</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">+18.3%</p>
                </div>
                <Button variant="outline" size="sm">Analyze</Button>
              </div>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card title="Recent Activity" className="h-full">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-gray-600 dark:text-gray-300">Added funds</p>
                  <p className="font-medium">+$2,000</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600 dark:text-gray-300">Purchased AAPL</p>
                  <p className="font-medium">-$1,500</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600 dark:text-gray-300">Dividend received</p>
                  <p className="font-medium text-green-600 dark:text-green-400">+$120</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Chart 
              type="line" 
              data={performanceData} 
              title="Portfolio Performance" 
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: '6-Month Performance',
                    color: '#6B7280'
                  }
                }
              }}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Chart 
              type="bar" 
              data={investmentTypesData} 
              title="Investments by Sector" 
            />
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <Chart 
            type="doughnut" 
            data={portfolioData} 
            title="Portfolio Allocation" 
            className="max-w-lg mx-auto"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Card title="Recent Investments">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Return</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"> 
                  {paginatedInvestments.map((investment, index) => (
                    <tr key={`${investment.id}-${index}`} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{investment.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">{investment.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{investment.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">${investment.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{investment.date}</td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        investment.return.startsWith('-') 
                          ? 'text-red-600 dark:text-red-400' 
                          : 'text-green-600 dark:text-green-400'
                      }`}>
                        {investment.return}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6">
              <Pagination 
                currentPage={currentPage} 
                totalPages={Math.ceil(allInvestments.length / itemsPerPage)} 
                onPageChange={setCurrentPage} 
              />
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;