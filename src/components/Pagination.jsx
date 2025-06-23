import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const Pagination = ({ currentPage, totalPages, onPageChange, className = '' }) => {
  const maxVisiblePages = 5
  
  const getPageNumbers = () => {
    const pages = []
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      const half = Math.floor(maxVisiblePages / 2)
      let start = currentPage - half
      let end = currentPage + half
      
      if (start < 1) {
        start = 1
        end = maxVisiblePages
      }
      
      if (end > totalPages) {
        end = totalPages
        start = totalPages - maxVisiblePages + 1
      }
      
      if (start > 1) {
        pages.push(1)
        if (start > 2) {
          pages.push('...')
        }
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push('...')
        }
        pages.push(totalPages)
      }
    }
    
    return pages
  }
  
  const pageNumbers = getPageNumbers()
  
  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </motion.button>
      
      {pageNumbers.map((page, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: page !== '...' ? 1.1 : 1 }}
          whileTap={{ scale: page !== '...' ? 0.9 : 1 }}
          onClick={() => page !== '...' && onPageChange(page)}
          className={`px-3 py-1 rounded-md ${
            page === currentPage
              ? 'bg-primary-light dark:bg-primary-dark text-white'
              : page === '...'
              ? 'cursor-default'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {page}
        </motion.button>
      ))}
      
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </motion.button>
    </div>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  className: PropTypes.string
}

export default Pagination;