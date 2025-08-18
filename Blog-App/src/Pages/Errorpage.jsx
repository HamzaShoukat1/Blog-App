import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4">
      <div className="max-w-xl text-center">
        <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">
          404
        </h1>
        <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 font-semibold mb-6">
          Oops! Page not found.
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you are looking for might have been removed, renamed, or doesn't exist anymore.
        </p>
        <Link
          to="/"
          className="inline-block px-2 py-3 text-white bg-gray-600 hover:bg-gray-700 rounded-md text-lg font-medium transition"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
