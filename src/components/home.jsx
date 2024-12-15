import React, { useState } from "react";

const PaymentModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  // Form States
  const [formData, setFormData] = useState({
    recipient: "",
    accountNumber: "",
    amount: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear errors on input
  };

  // Validate Form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.recipient.trim())
      newErrors.recipient = "Recipient name is required.";
    if (!formData.accountNumber.trim() || isNaN(formData.accountNumber))
      newErrors.accountNumber = "Valid account number is required.";
    if (!formData.amount || parseFloat(formData.amount) <= 0)
      newErrors.amount = "Amount must be greater than zero.";
    return newErrors;
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      alert("Payment submitted successfully!");
      setFormData({
        recipient: "",
        accountNumber: "",
        amount: "",
        description: "",
      });
      toggleModal();
    }
  };

  return (
    <>
      {/* Main Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 bg-gray-50 ">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
          Secure Payment Gateway
        </h1>
        <p className="text-gray-600 mb-8 max-w-md">
          Make secure and seamless payments directly to your recipient. Track
          and manage every transaction efficiently.
        </p>
        <button
          onClick={toggleModal}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-lg hover:scale-105 transform transition duration-300 hover:from-blue-600 hover:to-blue-700"
        >
          Make a Payment
        </button>
      </main>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8 animate-fade-in">
            {/* Close Button */}
            <button
              onClick={toggleModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Header */}
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
              Make a Payment
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Recipient */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Recipient Name*
                </label>
                <input
                  type="text"
                  name="recipient"
                  placeholder="John Doe"
                  value={formData.recipient}
                  onChange={handleChange}
                  className="w-full rounded-lg p-3 text-gray-900 shadow-sm border border-gray-300 focus:ring-4 focus:ring-blue-200 focus:border-blue-500 hover:shadow-lg transition duration-300"
                />
                {errors.recipient && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.recipient}
                  </p>
                )}
              </div>

              {/* Account Number */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Account Number*
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  placeholder="12345678"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  className="w-full rounded-lg p-3 text-gray-900 shadow-sm border border-gray-300 focus:ring-4 focus:ring-blue-200 focus:border-blue-500 hover:shadow-lg transition duration-300"
                />
                {errors.accountNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.accountNumber}
                  </p>
                )}
              </div>

              {/* Amount */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Amount (USD)*
                </label>
                <input
                  type="number"
                  name="amount"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full rounded-lg p-3 text-gray-900 shadow-sm border border-gray-300 focus:ring-4 focus:ring-blue-200 focus:border-blue-500 hover:shadow-lg transition duration-300"
                />
                {errors.amount && (
                  <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Add a note (optional)"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full rounded-lg p-3 text-gray-900 shadow-sm border border-gray-300 focus:ring-4 focus:ring-blue-200 focus:border-blue-500 hover:shadow-lg transition duration-300"
                  rows="3"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="text-gray-500 hover:text-gray-800 font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 hover:scale-105 transform transition duration-300 shadow-md"
                >
                  Pay Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentModal;
