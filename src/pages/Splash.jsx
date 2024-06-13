import React from "react";
import { useNavigate } from "react-router-dom";
const Splash = () => {
  let navigate = useNavigate();

  return (
    <div className="bg-library-pattern bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center">
      <div className="max-w-4xl p-8 bg-white rounded-lg shadow-lg animate-fade-right animate-twice">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Welcome to Our Library
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Embark on a journey of knowledge and discovery with our vast
          collection of books. Explore diverse genres, enrich your mind, and
          experience the joy of reading.
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/login")}
            className="bg-customGreen hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            Start Reading
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Not sure where to begin? Check out our recommended reads!
        </p>
      </div>
    </div>
  );
};

export default Splash;
