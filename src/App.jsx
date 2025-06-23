import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Dashboard from './pages/Dashboard'
import FormPage from './pages/FormPage'
import Button from './components/Button'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Investment App</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant={currentPage === 'dashboard' ? 'primary' : 'ghost'} 
                size="sm"
                onClick={() => setCurrentPage('dashboard')}
              >
                Dashboard
              </Button>
              <Button 
                variant={currentPage === 'form' ? 'primary' : 'ghost'} 
                size="sm"
                onClick={() => setCurrentPage('form')}
              >
                Investment Form
              </Button>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentPage === 'dashboard' ? <Dashboard /> : <FormPage />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App;