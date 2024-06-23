import { useState } from "react";

const AddressModal = ({ onClose, onPlaceOrder }) => {
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onPlaceOrder(address);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Enter Delivery Address</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your delivery address"
            required
            className="w-full h-32 p-2 border border-gray-300 rounded mb-4"
          />
          <div className="flex justify-end space-x-4">
            <button type="submit" className="btn_secondary_rounded">
              Place Order
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn_secondary_rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;
