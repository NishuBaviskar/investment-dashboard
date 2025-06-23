import { createContext, useState, useEffect, useContext } from 'react';

const InvestmentContext = createContext();

export function InvestmentProvider({ children }) {
  // Initialize state with localStorage data or empty array
  const [investments, setInvestments] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedInvestments = localStorage.getItem('investments');
      return savedInvestments ? JSON.parse(savedInvestments) : [];
    }
    return [];
  });

  // Save to localStorage whenever investments change
  useEffect(() => {
    localStorage.setItem('investments', JSON.stringify(investments));
  }, [investments]);

  // Add new investment with auto-generated fields
  const addInvestment = (newInvestment) => {
    setInvestments(prev => [
      {
        id: Date.now(), // Unique ID
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        return: calculateRandomReturn(), // Random return between -5% and 20%
        ...newInvestment
      },
      ...prev // Newest first
    ]);
  };

  // Delete an investment by ID
  const deleteInvestment = (id) => {
    setInvestments(prev => prev.filter(investment => investment.id !== id));
  };

  // Helper function to generate random returns
  const calculateRandomReturn = () => {
    const returnValue = (Math.random() * 25 - 5).toFixed(2);
    return `${returnValue}%`;
  };

  return (
    <InvestmentContext.Provider 
      value={{ 
        investments, 
        addInvestment,
        deleteInvestment
      }}
    >
      {children}
    </InvestmentContext.Provider>
  );
}

// Custom hook for easy access to context
export function useInvestments() {
  const context = useContext(InvestmentContext);
  if (!context) {
    throw new Error('useInvestments must be used within an InvestmentProvider');
  }
  return context;
}