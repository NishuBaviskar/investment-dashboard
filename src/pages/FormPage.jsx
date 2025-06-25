import { motion } from 'framer-motion'
import { useState } from 'react'
import Button from '../components/Button'
import Card from '../components/Card'
import FormInput from '../components/FormInput'
import { useInvestments } from '../context/InvestmentContext'
import useForm from '../hooks/useForm'

const FormPage = () => {
  const [submittedData, setSubmittedData] = useState(null)
   const { addInvestment } = useInvestments();
  
  const validate = (values) => {
    const errors = {}
    
    if (!values.name) {
      errors.name = 'Name is required'
    }
    
    if (!values.email) {
      errors.email = 'Email is required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
    
    if (!values.password) {
      errors.password = 'Password is required'
    } else if (values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters'
    }
    
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }
    
    if (!values.investmentAmount) {
      errors.investmentAmount = 'Investment amount is required'
    } else if (isNaN(values.investmentAmount) || values.investmentAmount <= 0) {
      errors.investmentAmount = 'Please enter a valid amount'
    }
    
    return errors
  }
  
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useForm(
    {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      investmentAmount: '',
      investmentType: 'stocks',
      terms: false
    },
    validate
  )
  
  const onSubmit = (formValues) => {
    const newInvestment = {
      name: formValues.name,
      type: formValues.investmentType,
      amount: parseFloat(formValues.investmentAmount),
      date: new Date().toLocaleDateString(),
      return: calculateRandomReturn() // Helper function
    };
    
    addInvestment(newInvestment);
    setSubmittedData(formValues);
    navigate('/report', { state: { formData: formValues } });
  };

  const calculateRandomReturn = () => {
    const returnValue = (Math.random() * 20 - 5).toFixed(2);
    return `${returnValue}%`;
  };
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        <Card title="Investment Form" hoverEffect={false}>
          {submittedData ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center p-6"
            >
              <h3 className="text-2xl font-bold text-green-600 mb-4">Form Submitted Successfully!</h3>
              <div className="text-left space-y-2">
                <p><span className="font-semibold">Name:</span> {submittedData.name}</p>
                <p><span className="font-semibold">Email:</span> {submittedData.email}</p>
                <p><span className="font-semibold">Investment Amount:</span> ${submittedData.investmentAmount}</p>
                <p><span className="font-semibold">Investment Type:</span> {submittedData.investmentType}</p>
              </div>
              <Button 
                variant="primary" 
                className="mt-6 w-full" 
                onClick={() => setSubmittedData(null)}
              >
                Submit Another Form
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormInput
                type = 'text'
                label="Full Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
                touched={touched.name}
                required
              />
              
              <FormInput
                type="email"
                label="Email Address"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                touched={touched.email}
                required
              />
              
              <FormInput
                type="password"
                label="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                touched={touched.password}
                required
              />
              
              <FormInput
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
                required
              />
              
              <FormInput
                type="number"
                label="Investment Amount ($)"
                name="investmentAmount"
                value={values.investmentAmount}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.investmentAmount}
                touched={touched.investmentAmount}
                required
              />
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Investment Type
                </label>
                <select
                  name="investmentType"
                  value={values.investmentType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark dark:bg-gray-700 dark:text-white"
                >
                  <option value="stocks">Stocks</option>
                  <option value="bonds">Bonds</option>
                  <option value="mutual-funds">Mutual Funds</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="crypto">Cryptocurrency</option>
                </select>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={values.terms}
                    onChange={(e) => handleChange({ target: { name: 'terms', value: e.target.checked } })}
                    onBlur={handleBlur}
                    className="focus:ring-primary-light dark:focus:ring-primary-dark h-4 w-4 text-primary-light dark:text-primary-dark border-gray-300 dark:border-gray-600 rounded"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-medium text-gray-700 dark:text-gray-300">
                    I agree to the terms and conditions
                  </label>
                  {errors.terms && touched.terms && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.terms}</p>
                  )}
                </div>
              </div>
              
              <Button 
                type="submit" 
                variant="primary" 
                className="w-full mt-6"
                disabled={Object.keys(errors).length > 0}
              >
                Submit Investment
              </Button>
            </form>
          )}
        </Card>
      </motion.div>
    </div>
  )
}

export default FormPage;