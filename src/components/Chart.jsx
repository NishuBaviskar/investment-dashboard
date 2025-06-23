import { Doughnut, Bar, Line } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title } from 'chart.js'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title
)

const Chart = ({ type = 'doughnut', data, options, title, className = '' }) => {
  const chartComponents = {
    doughnut: Doughnut,
    bar: Bar,
    line: Line
  }
  
  const ChartComponent = chartComponents[type]
  
  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#6B7280'
        }
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false
      }
    },
    scales: type !== 'doughnut' ? {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6B7280'
        }
      },
      y: {
        grid: {
          color: '#E5E7EB'
        },
        ticks: {
          color: '#6B7280'
        }
      }
    } : {},
    ...options
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow ${className}`}
    >
      {title && <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{title}</h3>}
      <div className="relative h-64 md:h-80">
        <ChartComponent data={data} options={defaultOptions} />
      </div>
    </motion.div>
  )
}

Chart.propTypes = {
  type: PropTypes.oneOf(['doughnut', 'bar', 'line']),
  data: PropTypes.object.isRequired,
  options: PropTypes.object,
  title: PropTypes.string,
  className: PropTypes.string
}

export default Chart;