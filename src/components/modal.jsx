import React from "react";
import Loader from "./loader";

const Modal = ({
  id,
  isOpen,
  onClose,
  title,
  children,
  btn_text,
  loading,
  btn_onClick,
}) => {
  return (
    <div
      id={id}
      data-modal-backdrop="static"
      className={`${
        isOpen ? "block " : "hidden"
      } fixed inset-0 z-50  overflow-hidden bg-gray-800 bg-opacity-50 flex backdrop-blur-lg items-center justify-center `}>
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-auto p-3 transition-all transform ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} animate-fade-left">
        <div className="flex justify-between items-center pb-3">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          {btn_text && (
            <button
              onClick={onClose}
              className="text-gray-800 hover:bg-gray-100 rounded-full p-1">
              <span className="sr-only">Close</span>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          )}
        </div>
        <div className="py-4 overflow-y-auto ">{children}</div>
        <div className="flex justify-between items-center  p-3">
          <div className="flex ">
            {loading && <Loader className="w-5 h-5 border-primaryGreen" />}
          </div>

          {btn_text && (
            <button
              disabled={loading}
              type="submit"
              onClick={btn_onClick}
              className="btn">
              {btn_text}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
