import React, { useState } from "react";

const PaymentForm = ({ onSubmit = () => {}, isProcessing = false, totalAmount = 25.0 }) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (formData.cardNumber.length < 16) newErrors.cardNumber = "Card number must be at least 16 digits";
    if (formData.cardholderName.length < 2) newErrors.cardholderName = "Cardholder name is required";
    if (formData.expiryDate.length < 5) newErrors.expiryDate = "Expiry date is required";
    if (formData.cvv.length < 3) newErrors.cvv = "CVV must be at least 3 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit(formData);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Payment Information</h2>
      <p className="text-gray-600 mb-4">Enter your card details to complete your booking</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            className="w-full border p-2 rounded mt-1"
          />
          {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Cardholder Name</label>
          <input
            type="text"
            name="cardholderName"
            value={formData.cardholderName}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full border p-2 rounded mt-1"
          />
          {errors.cardholderName && <p className="text-red-500 text-sm">{errors.cardholderName}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Expiry Date</label>
            <input
              type="text"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              className="w-full border p-2 rounded mt-1"
            />
            {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">CVV</label>
            <input
              type="password"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="123"
              className="w-full border p-2 rounded mt-1"
            />
            {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Subtotal</span>
            <span className="text-sm font-medium">${(totalAmount * 0.9).toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Tax</span>
            <span className="text-sm font-medium">${(totalAmount * 0.1).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700 disabled:bg-gray-400"
          disabled={isSubmitting || isProcessing}
        >
          {isSubmitting || isProcessing ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
