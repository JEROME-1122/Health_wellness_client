const Footer = () => {
  return (
    <div className="font-sans">
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          <p>&copy; 2025 Health & Wellness. All rights reserved.</p>
          <div className="space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-green-400">
              Facebook
            </a>
            <a href="#" className="hover:text-green-400">
              Twitter
            </a>
            <a href="#" className="hover:text-green-400">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
