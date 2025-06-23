import { useState } from 'react'
import PropTypes from 'prop-types'

const FormInput = ({
  type = 'text',
  label,
  name,
  value,
  onChange,
  placeholder = '',
  error = '',
  required = false,
  validationPattern,
  className = ''
}) => {
  const [touched, setTouched] = useState(false)
  
  const handleBlur = () => {
    setTouched(true)
  }
  
  const validateInput = () => {
    if (!touched) return true
    if (required && !value) return false
    if (validationPattern && value) {
      const regex = new RegExp(validationPattern)
      return regex.test(value)
    }
    return true
  }
  
  const isValid = validateInput()
  
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark ${
          !isValid && touched
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
        }`}
      />
      {!isValid && touched && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error || (required && !value ? 'This field is required' : 'Invalid input')}
        </p>
      )}
    </div>
  )
}

FormInput.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  validationPattern: PropTypes.string,
  className: PropTypes.string
}

export default FormInput;