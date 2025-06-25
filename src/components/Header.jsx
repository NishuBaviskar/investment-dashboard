import { FiMenu } from 'react-icons/fi';

const Header = ({ sidebarOpen, setSidebarOpen, activeTab }) => {
  const getTitle = () => {
    switch(activeTab) {
      case 'dashboard': return 'Portfolio Overview';
      case 'investments': return 'My Investments';
      case 'form': return 'New Investment';
      case 'report': return 'Investment Report';
      default: return '';
    }
  };

  return (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between">
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)} 
        className="text-gray-500 hover:text-gray-700"
      >
        <FiMenu size={24} />
      </button>
      <h2 className="text-xl font-semibold text-gray-800">{getTitle()}</h2>
      <div className="w-6"></div>
    </header>
  );
};

export default Header;
