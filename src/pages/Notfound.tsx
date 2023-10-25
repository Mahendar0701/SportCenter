const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">404 Not Found</h2>
      <p className="text-lg text-gray-600 mb-6">
        The page you're looking for doesn't exist.
      </p>
      <a href="/" className="text-white text-lg no-underline">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue">
          Return to homepage
        </button>
      </a>
    </div>
  );
};

export default NotFound;
